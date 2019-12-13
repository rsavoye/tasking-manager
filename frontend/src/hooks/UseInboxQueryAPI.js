import {
  useQueryParams,
  StringParam,
  stringify as stringifyUQP,
  NumberParam,
} from 'use-query-params';
import { CommaArrayParam } from '../utils/CommaArrayParam';
import { useSelector } from 'react-redux';
import { useThrottle } from '../hooks/UseThrottle';

/* See also moreFiltersForm, the useQueryParams are duplicated there for specific modular usage */
/* This one is e.g. used for updating the URL when returning to /contribute
 *  and directly submitting the query to the API */

import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { API_URL } from '../config';

const inboxQueryAllSpecification = {
  types: CommaArrayParam,
  fromUsername: StringParam,
  project: StringParam,
  taskId: NumberParam,
  page: NumberParam,
  pageSize: NumberParam,
  orderBy: StringParam,
  orderByType: StringParam,
};

/* This can be passed into project API or used independently */
export const useInboxQueryParams = () => {
  const uqp = useQueryParams(inboxQueryAllSpecification);

  /* TODO: refactor this larger fn to do useCallback or useMemo, below probably really expensive */
  const [qpValue, setQ] = uqp;
  if (qpValue && qpValue.page === undefined) {
    setQ({
      pageSize: 10,
      page: 1,
      orderBy: 'date',
      orderByType: 'desc'
    })
  }

  return uqp;
};

/* The API uses slightly different JSON keys than the queryParams,
   this fn takes an object with queryparam keys and outputs JSON keys 
   while maintaining the same values */
const remapParamsToAPI = param => {
  /* TODO support all  message types */
  const conversion = {
    types: 'messageType',
    fromUsername: 'from',
    project: 'project',
    taskId: 'taskId',
    orderByType: 'sortBy',
    orderBy: 'sortDirection',
    page: 'page',
    pageSize: 'pageSize'
  };
  function mapObject(obj, fn) {
    return Object.fromEntries(Object.entries(obj).map(fn));
  }
  const remapped = mapObject(param, n => {
    /* fn operates on a array with [key, value] format */

    /* mappingTypes's value needs to be converted to comma delimited again */
    const value = Array.isArray(n[1]) ? n[1].join(',') : n[1];

    return [conversion[n[0]] || n[0], value];
  });
  return remapped;
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        notifications: action.payload.userMessages,
        // mapResults: action.payload.mapResults,
        pagination: action.payload.pagination,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      console.log(action);
      throw new Error();
  }
};

const defaultInitialData = {
  mapResults: {
    features: [],
    type: 'FeatureCollection',
  },
  results: [],
  pagination: { hasNext: false, hasPrev: false, page: 1 },
};

export const useInboxQueryAPI = (
  initialData = defaultInitialData,
  ExternalQueryParamsState,
  forceUpdate = null,
) => {
  const throttledExternalQueryParamsState = useThrottle(ExternalQueryParamsState, 1500);

  /* Get the user bearer token from the Redux store */
  const token = useSelector(state => state.auth.get('token'));

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    projects: initialData.results,
    mapResults: initialData.mapResults,
    pagination: initialData.pagination,
    queryParamsState: ExternalQueryParamsState[0],
  });

  useEffect(() => {
    let didCancel = false;
    let cancel;
    const fetchData = async () => {
      const CancelToken = axios.CancelToken;

      dispatch({
        type: 'FETCH_INIT',
      });

      try {
        if (!token) {
          throw Error("No authentication token specified for inbox query")
        }
        const result = await axios({
          url: `${API_URL}notifications/`,
          method: 'get',
          params: remapParamsToAPI(throttledExternalQueryParamsState),
          headers: { Authorization: `Token ${token}` },
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = { end: c, params: throttledExternalQueryParamsState };
          }),
        });

        if (!didCancel) {
          if (result && result.headers && result.headers['content-type'].indexOf('json') !== -1) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } else {
            console.error('Invalid return type for project search');
            dispatch({ type: 'FETCH_FAILURE' });
          }
        } else {
          cancel.end();
        }
      } catch (error) {
        /* if cancelled, this setting state of unmounted
         * component with dispatch would be a memory leak */
        if (
          !didCancel &&
          error &&
          error.response &&
          error.response.data &&
          error.response.data.Error === 'No messages found'
        ) {
          const zeroPayload = Object.assign(defaultInitialData, { pagination: { total: 0 } });
          /* TODO(tdk): when 404 and page > 1, re-request page 1 */
          dispatch({ type: 'FETCH_SUCCESS', payload: zeroPayload });
        } else if (!didCancel && error.response) {
          const errorResPayload = Object.assign(defaultInitialData, { error: error.response });
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(
            'Res failure',
            error.response.data,
            error.response.status,
            error.response.headers,
            errorResPayload,
          );
          dispatch({ type: 'FETCH_FAILURE', payload: errorResPayload });
        } else if (!didCancel && error.request) {
          const errorReqPayload = Object.assign(defaultInitialData, { error: error.request });
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('req failure', error.request, errorReqPayload);
          dispatch({ type: 'FETCH_FAILURE', payload: errorReqPayload });
        } else if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        } else {
          // console.log("tried to cancel on failure",cancel.params);
          cancel && cancel.end();
        }
      }
    };

    fetchData();
    return () => {
      didCancel = true;
      // console.log("tried to cancel on effect cleanup ",cancel.params)
      cancel && cancel.end();
    };
  }, [throttledExternalQueryParamsState, forceUpdate, token]);

  return [state, dispatch];
};

export const stringify = stringifyUQP;
