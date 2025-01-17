import { RouteRecordRaw } from "vue-router";

import Dashboard from "@/views/Dashboard.vue";
import OwnRepositories from "@/components/OwnAdoptables.vue";
import MatchedAdoptables from "@/components/MatchedAdoptables.vue";
import InfiniteList from "@/components/InfiniteList.vue";
import AdoptableChat from "@/components/AdoptableChat.vue";
import MatchedUsers from "@/components/MatchedUsers.vue";
import CurrentAdoptableChat from "@/components/CurrentAdoptableChat.vue";

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
        components: {
          default: MatchedAdoptables,
          leftView: OwnRepositories,
        }
      },
      {
        path: "/adoptablechat/:id",
        name: "AdoptableChat",
        components: {
          default: AdoptableChat,
          leftView: CurrentAdoptableChat,
          rightView: MatchedUsers,
        },
        props: true,
      },
    ],
  },
];

export default routes;
