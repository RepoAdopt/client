import { RouteRecordRaw } from "vue-router";

import Dashboard from "@/views/Dashboard.vue";
import OwnRepositories from "@/components/OwnAdoptables.vue";
import MatchedAdoptables from "@/components/MatchedAdoptables.vue";
import InfiniteList from "@/components/InfiniteList.vue";
import AdoptableChat from "@/components/AdoptableChat.vue";
import MatchedUsers from "@/components/MatchedUsers.vue";
import Adoptable from "@/components/Adoptable.vue";

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
        components: {
          default: InfiniteList,
          leftView: OwnRepositories,
        },
      },
      {
        path: "/mymatches",
        name: "MyMatches",
        component: MatchedAdoptables,
      },
      {
        path: "/adoptablechat/",
        name: "AdoptableChat",
        components: {
          default: AdoptableChat,
          leftView: Adoptable,
          rightView: MatchedUsers,
        },
        props: true,
      },
    ],
  },
];

export default routes;
