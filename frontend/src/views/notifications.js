import React from 'react';
import { useSelector } from 'react-redux';

import {
    useProjectsQueryAPI,
    useExploreProjectsQueryParams,
  } from '../hooks/UseProjectsQueryAPI';
import {
    useInboxQueryAPI,
    useInboxQueryParams,
    stringify,
  } from '../hooks/UseInboxQueryAPI';

import useForceUpdate from '../hooks/UseForceUpdate';

import { useFetch } from '../hooks/UseFetch';
import { InboxNav } from '../components/notifications/inboxNav';
import { NotificationResults } from '../components/notifications/notificationResults';
import {ProjectCardPaginator} from '../components/projects/projectCardPaginator'

export const NotificationsPage = props => {
    const initialData = {
        mapResults: {
          features: [],
          type: 'FeatureCollection',
        },
        results: [],
        pagination: { hasNext: false, hasPrev: false, page: 1 },
      };

      const [inboxQuery, setInboxQuery] = useInboxQueryParams();
      const [forceUpdated, forceUpdate] = useForceUpdate();
    const [state] = useInboxQueryAPI(initialData, inboxQuery, forceUpdated);
    //   const [state] = useProjectsQueryAPI(initialData, fullProjectsQuery, forceUpdated);
    return (
            <div className="pt4-l pb5 ph5-l ph4 pt180 pull-center">
              <section className="cf">
                <InboxNav />
                <NotificationResults state={state} />
                <ProjectCardPaginator  projectAPIstate={state} setQueryParam={setInboxQuery} />
                <code>{JSON.stringify(state)}</code>

                {/* <ProjectSearchResults
                  state={state}
                  retryFn={forceUpdate}
                  className={`${searchResultWidth} fl`}
                /> */}
                {/* {isMapShown && (
                  <ProjectsMap
                    state={state}
                    fullProjectsQuery={fullProjectsQuery}
                    setQuery={setProjectQuery}
                    className={`dib w-40-l w-100 fl`}
                  />
                )} */}
              </section>
              {/* <ProjectCardPaginator projectAPIstate={state} setQueryParam={setProjectQuery} /> */}
            </div>
    );
}