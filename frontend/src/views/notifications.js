import React from 'react';

import { useInboxQueryAPI, useInboxQueryParams } from '../hooks/UseInboxQueryAPI';

import useForceUpdate from '../hooks/UseForceUpdate';
import { useSelector } from 'react-redux';

import { InboxNav } from '../components/notifications/inboxNav';
import { NotificationResults } from '../components/notifications/notificationResults';
import { NotificationBodyCard } from '../components/notifications/notificationBodyCard'
import { ProjectCardPaginator } from '../components/projects/projectCardPaginator';
import { CloseIcon } from '../components/svgIcons';
import { useFetch, useFetchIntervaled } from '../hooks/UseFetch';
import { Link } from '@reach/router'

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

        {/* delete me TDK */}
        <code className={`dn`}>{JSON.stringify(state)}</code>

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

  const [thisNotificationError, thisNotificationLoading, thisNotification] = useFetch(`notifications/${props.id}/`);

  /* Should we load the message again or use a context to communicate it? */
  /* {left: '50%', '-webkit-transform': 'translateX(-50%)', 'transform': 'translateX(-50%)' */
  /*  z-5 mt1 h-100 bg-white h4 ph2 mw5-l*/
  return (
    <>
      <div style={{
          'inset': '0px',
          'background': 'rgba(0, 0, 0, 0.5) none repeat scroll 0% 0%',
          'display': 'flex',
          'z-index': '999'}}
        onClick={() => props.navigate('../../')}
       className="fixed ">
        <div className={`relative shadow-3`} 
          style={{
            'background': 'rgb(255, 255, 255) none repeat scroll 0% 0%',
            'width': '55%',
            'margin': '5em auto auto',
            'border': '1px solid rgb(187, 187, 187)',
            'padding': '5px'}}>
          <div className={`di fl tl pa3 mb3 w-100 fw5 bb b--tan`}>
            Message
            <Link className={`fr ml4`} to={`../../`}>
              <CloseIcon className={`h1 w1`}/>
            </Link>
          </div>
          <NotificationBodyCard loading={thisNotificationLoading} card={thisNotification}/>
          {props.children}
        </div>
      </div>
      {/* <div
        onClick={() => props.navigate('../')}
        className="absolute right-0 z-4 br w-100 h-100  h6"
      ></div> */}
    </>
  );
};
