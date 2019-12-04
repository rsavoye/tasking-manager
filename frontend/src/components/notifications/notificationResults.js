import React from 'react';

import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
// import { nCardPlaceholders } from '../projectcard/nCardPlaceholder';

import { NotificationCard } from './notificationCard';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import messages from './messages';

export const NotificationResults = props => {
  const state = props.state;
  // const cardWidthClass = 'w-third-l';

  return (
    <div className={`${props.className}`}>
      <p className={`blue-grey ml2 f7`}>
        {state.isLoading ? (
          <span>&nbsp;</span>
        ) : (
          !state.isError && (
            <FormattedMessage
              {...messages.showingXProjectsOfTotal}
              values={{
                numProjects: state.notifications && state.notifications.length,
                numRange:
                  state.pagination &&
                  state.pagination.page > 1 &&
                  state.pagination.page * state.pagination.perPage <= state.pagination.total &&
                  [': ', state.pagination.page * state.pagination.perPage, ' '].join(''),
                numTotalProjects: (
                  <FormattedNumber value={state.pagination && state.pagination.total} />
                ),
              }}
            />
          )
        )}
      </p>
      {state.isError ? (
        <div className="bg-tan pa4">
          <FormattedMessage
            {...messages.errorLoadingTheXForY}
            values={{
              xWord: <FormattedMessage {...messages.projects} />,
              yWord: 'Notifications',
            }}
          />
          <div className="pa2">
            <button className="pa1" onClick={() => props.retryFn()}>
              Retry
            </button>
          </div>
        </div>
      ) : null}
      <div className="cf mh5 mh2-ns db">
        <ReactPlaceholder
          // customPlaceholder={nCardPlaceholders(5, cardWidthClass)}
          ready={!state.isLoading}
        >
          <NotificationCards pageOfCards={state.notifications} />
        </ReactPlaceholder>
      </div>
    </div>
  );
};

function NotificationCards({ pageOfCards }: Object) {
  if (pageOfCards && pageOfCards.length === 0) {
    return null;
  }
  return pageOfCards.map((card, n) => (
    <NotificationCard {...card} key={n} />
  ));
}
