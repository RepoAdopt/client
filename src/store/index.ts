import { createStore, createLogger } from 'vuex';

import adoptables from './modules/adoptables';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: { adoptables },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
