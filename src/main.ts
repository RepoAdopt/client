import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// @ts-ignore
import VueMarkdownIt from 'vue3-markdown-it';
import 'highlight.js/styles/atom-one-light.css';

import router from './router';
import store from './store';

import App from './App.vue';

const app = createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(VueMarkdownIt)
  .mount('#app');

export default app;
