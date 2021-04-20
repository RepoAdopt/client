import { createStore, createLogger } from "vuex";

import adoptables from "@/store/modules/adoptables";
import mymatches from "@/store/modules/myMatches";
import user from "@/store/modules/user";
import repository from "@/store/modules/repository";
import ownAdoptables from "@/store/modules/ownAdoptables";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: { adoptables, user, repository, ownAdoptables, mymatches },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
