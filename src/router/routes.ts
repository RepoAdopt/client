import { RouteRecordRaw } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/:any*', redirect: { name: 'Dashboard' } },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

export default routes;
