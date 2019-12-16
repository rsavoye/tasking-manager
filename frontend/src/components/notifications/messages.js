import { defineMessages } from 'react-intl';

/**
 * Internationalized messages for use on homepage.
 */
export default defineMessages({
  notifications: {
    id: 'notifications.mainSection.title',
    defaultMessage: 'Notifications',
  },
  all: {
    id: 'notifications.filter.all',
    defaultMessage: 'All',
  },
  messages: {
    id: 'notifications.filter.messages',
    defaultMessage: 'Messages',
  },
  tasks: {
    id: 'notifications.filter.tasks',
    defaultMessage: 'Tasks',
  },
  projects: {
    id: 'notifications.filter.projects',
    defaultMessage: 'Projects',
  },
  clearFilters: {
    id: 'notifications.filter.clear',
    defaultMessage: 'Clear filters',
  },
  errorLoadingTheXForY: {
    id: 'notifications.navFilters.error',
    defaultMessage: 'Error loading the {xWord} for {yWord}',
  },
  showingXProjectsOfTotal: {
    id: 'notifications.nav.showing',
    defaultMessage: 'Showing {numProjects} notifications{numRange} of {numTotalProjects}',
  },
  xNew: {
    id: 'notifications.nav.xNew',
    defaultMessage: '{xNew} New',
  },
  viewAll: {
    id: 'notifications.nav.viewAll',
    defaultMessage: 'View All',
  },
  noUnreadMessages: {
    id: 'notifications.nav.noUnread',
    defaultMessage: 'No unread messages',
  },
});
