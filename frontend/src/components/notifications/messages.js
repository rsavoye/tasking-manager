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
  errorLoadingTheXForY: {
    id: 'notifications.navFilters.error',
    defaultMessage: 'Error loading the {xWord} for {yWord}',
  },
  showingXProjectsOfTotal: {
    id: 'notifications.nav.showing',
    defaultMessage: 'Showing {numProjects} notifications{numRange} of {numTotalProjects}',
  },
});