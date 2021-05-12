import gql from "graphql-tag";

import Apollo from "@/apollo";
import Octokit from "@/octokit";

export interface Adoptable {
  id: string;
  repository: string;
  description: string;
  readme: string;
  html_url: string;
}

interface State {
  adoptables: Array<Adoptable>;
  page: number;
  fetching: boolean;
  canFetch: boolean;
}

export function getReadme(
  adoptable: Adoptable,
  cb: (adoptable: Adoptable) => void,
) {
  const [owner, repo] = adoptable.repository.split("/", 2);

  Octokit()
    .repos.getContent({ owner, repo, path: "README.md" })
    .then((res) => {
      // TODO When fixed remove ignore
      // @ts-ignore: Unreachable code error
      if (!res?.data?.content) {
        cb(adoptable);
        return;
      }

      // @ts-ignore: Unreachable code error
      const readme = atob(res.data.content);

      adoptable.readme = readme;

      cb(adoptable);
    })
    .catch((error) => {
      console.error(error);
      cb(adoptable);
    });
}

export function getUrl(
  adoptable: Adoptable,
  cb: (adoptable: Adoptable) => void,
) {
  const [owner, repo] = adoptable.repository.split("/", 2);
  Octokit()
    .repos.get({ owner, repo })
    .then((res) => {
      if (!res.data.html_url) {
        cb(adoptable);
        return;
      }
      adoptable.html_url = res.data.html_url;
      cb(adoptable);
    })
    .catch((error) => {
      console.error(error);
      cb(adoptable);
    });
}

const state = () => ({
  adoptables: [],
  page: 0,
  fetching: false,
  canFetch: false,
});

const getters = {
  adoptables: (state: State) => {
    return state.adoptables;
  },
};

const actions = {
  enableFetch(root: {
    commit: (mutation: string, params?: any) => void;
    state: State;
  }) {
    root.commit("enableFetch");
  },
  load(root: {
    commit: (mutation: string, params?: any) => void;
    state: State;
  }) {
    if (!root.state.canFetch) {
      setTimeout(function() {
        // @ts-ignore
        root.dispatch("load");
      }, 200);
      return;
    }

    if (root.state.fetching) {
      return;
    }

    root.commit("startFetch");

    Apollo.query({
      query: gql`
        query($page: Int!, $limit: Int!) {
          adoptable(page: $page, limit: $limit) {
            id
            repository
            description
          }
        }
      `,
      variables: {
        page: root.state.page,
        // @ts-ignore: Unreachable code error
        limit: window.config.VUE_APP_PAGINATION_LIMIT,
      },
    })
      .then((result) => {
        root.commit("incrementPage");
        root.commit("finishFetch");

        result.data.adoptable.forEach((adoptable: Adoptable) => {
          getUrl(adoptable, function(adoptableWithUrl) {
            getReadme(adoptableWithUrl, function(adoptableWithReadme) {
              root.commit("addAdoptable", { adoptables: adoptableWithReadme });
            });
          });
        });
      })
      .catch((err) => {
        setTimeout(function() {
          root.commit("finishFetch");
        }, 1000);
      });
  },
};

const mutations = {
  enableFetch(state: State) {
    state.canFetch = true;
  },
  startFetch(state: State) {
    state.fetching = true;
  },
  finishFetch(state: State) {
    state.fetching = false;
  },
  incrementPage(state: State) {
    state.page++;
  },
  addAdoptable(
    state: State,
    params: { adoptables: Array<Adoptable> | Adoptable },
  ) {
    const { adoptables } = params;

    if (Array.isArray(adoptables)) {
      state.adoptables.push(...adoptables);
    } else {
      state.adoptables.push(adoptables);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
