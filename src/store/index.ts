import { createStore, createLogger } from 'vuex';

import adoptables from './modules/adoptables';
import user from './modules/user';
import repository from "@/store/modules/repository";

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: { adoptables, user, repository },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
