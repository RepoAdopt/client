import { Octokit } from '@octokit/rest';

import gql from 'graphql-tag';
import apollo from '@/apollo';

interface Adoptable {
  repository: string;
  description: string;
  readme: string;
}

interface State {
  adoptables: Array<Adoptable>;
  page: number;
  fetching: boolean;
}

const octakit = new Octokit({ auth: 'token' });

const state = () => ({
  adoptables: [],
  page: 0,
  fetching: false,
});

const getters = {
  adoptables: (state: State) => {
    return state.adoptables;
  },
};

const actions = {
  load(root: { commit: (mutation: string, params?: any) => void; state: State }) {
    if (root.state.fetching) {
      return;
    }

    root.commit('startFetch');

    apollo
      .query({
        query: gql`
          query($page: Int!, $limit: Int!) {
            adoptable(page: $page, limit: $limit) {
              repository
            }
          }
        `,
        variables: { page: root.state.page, limit: process.env.VUE_APP_PAGINATION_LIMIT },
      })
      .then((result) => {
        root.commit('incrementPage');
        root.commit('finishFetch');

        result.data.adoptable.forEach((adoptable: Adoptable) => {
          const [owner, repo] = adoptable.repository.split('/', 2);

          octakit.repos
            .getContent({ owner, repo, path: 'README.md' })
            .then((res) => {
              // TODO When fixed remove ignore
              // @ts-ignore: Unreachable code error
              if (!res?.data?.content) {
                return;
              }

              // @ts-ignore: Unreachable code error
              const readme = atob(res.data.content);

              adoptable.readme = readme;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              root.commit('addAdoptable', { adoptables: adoptable });
            });
        });
      })
      .catch((err) => {
        setTimeout(function() {
          root.commit('finishFetch');
        }, 1000);
      });
  },
};

const mutations = {
  startFetch(state: State) {
    state.fetching = true;
  },
  finishFetch(state: State) {
    state.fetching = false;
  },
  incrementPage(state: State) {
    state.page++;
  },
  addAdoptable(state: State, params: { adoptables: Array<Adoptable> | Adoptable }) {
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
