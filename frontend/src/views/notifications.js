import React from 'react';

import { useInboxQueryAPI, useInboxQueryParams } from '../hooks/UseInboxQueryAPI';

import useForceUpdate from '../hooks/UseForceUpdate';
import { useSelector } from 'react-redux';

import { InboxNav } from '../components/notifications/inboxNav';
import { NotificationResults } from '../components/notifications/notificationResults';
import { ProjectCardPaginator } from '../components/projects/projectCardPaginator';
import { CloseIcon } from '../components/svgIcons';
import { Link } from '@reach/router';

export const NotificationsPage = props => {
  const initialData = {
    mapResults: {
      features: [],
      type: 'FeatureCollection',
    },
    results: [],
    pagination: { hasNext: false, hasPrev: false, page: 1 },
  };

  const userToken = useSelector(state => state.auth.get('token'));
  const [inboxQuery, setInboxQuery] = useInboxQueryParams();
  const [forceUpdated, forceUpdate] = useForceUpdate();
  const [state] = useInboxQueryAPI(initialData, inboxQuery, forceUpdated);

  if (!userToken) {
    /* use replace to so the back button does not get interrupted */
    props.navigate('/login', { replace: true });
  }

  return (
    <div className="pt4-l pb5 ph5-l ph4 pt180 pull-center">
      {
        props.children
        /* This is where the full notification component is rendered
        using the router, as a child route.
        */
      }
      <section className="cf">
        <InboxNav />
        <NotificationResults retryFn={forceUpdate} state={state} />
        <ProjectCardPaginator projectAPIstate={state} setQueryParam={setInboxQuery} />
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
    </div>
  );
};

export const NotificationPageIndex = props => {
  return null;
};

export const NotificationDetail = props => {
  /* Should we load the message again or use a context to communicate it? */
  return (
    <>
      <div style={{left: '50%', '-webkit-transform': 'translateX(-50%)', 'transform': 'translateX(-50%)'}}
       className="absolute shadow-3 z-5 mt1 h-100 bg-white h4 ph2 mw5-l">
        <div className={`relative di`}>
          <div className={`di fl tl pa3 mb3 w-100 fw5 bb b--tan`}>
            Message
            <a className={`fr ml4`} href={`../`}>
              <CloseIcon className={`h1 w1`}/>
            </a>
          </div>
          <div>#{props.id}</div>
          {props.children}
        </div>
      </div>
      <div
        onClick={() => props.navigate('../')}
        className="absolute right-0 z-4 br w-100 h-100 bg-blue-dark o-60 h6"
      ></div>
    </>
  );
};
