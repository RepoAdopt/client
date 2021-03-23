import { createStore, createLogger } from 'vuex';

import adoptables from './modules/adoptables';
import user from './modules/user';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: { adoptables, user },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
