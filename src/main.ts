import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import router from './router'

import App from './App.vue';

const app = createApp(App).use(router)
  .use(ElementPlus)
  .mount('#app');

export default app;
