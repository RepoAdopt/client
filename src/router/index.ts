import { createRouter, createWebHistory } from 'vue-router';

import Api from '@/api';
import Store from '@/store';

import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.redirectedFrom?.path === '/auth/gh') {
    Api.post(
      '/signin',
      {},
      {
        params: {
          client_id: process.env.VUE_APP_CLIENT_ID,
          code: to.redirectedFrom.query.code,
        },
      }
    ).then((res) => {
      console.log(res);
      Store.dispatch('user/setGithubToken', { token: res?.data?.access_token?.[0] });
    });

    delete to.query.code;
    to.fullPath = to.fullPath.replace(/\?code(.*)/, '');
  }
  next();
});

export default router;
