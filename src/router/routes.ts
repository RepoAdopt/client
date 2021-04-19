import { RouteRecordRaw } from "vue-router";

import Dashboard from "@/views/Dashboard.vue";
import MatchedAdoptables from "@/components/MatchedAdoptables.vue";
import InfiniteList from "@/components/InfiniteList.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/:any*", redirect: { name: "Dashboard" } },
  {
    path: "/",
    redirect: { name: "Dashboard" },
    component: Dashboard,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: InfiniteList,
      },
      {
        path: "/mymatches",
        name: "MyMatches",
        component: MatchedAdoptables,
      },
    ],
  },
];

export default routes;
