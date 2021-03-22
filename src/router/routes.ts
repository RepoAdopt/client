import { RouteRecordRaw } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import LogIn from '../views/LogIn.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/:any*', redirect: { name: 'Dashboard' } },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  }
];

export default routes;
