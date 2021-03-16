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
}

const octakit = new Octokit({ auth: 'token' });

const state = () => ({
  adoptables: [],
});

const getters = {
  adoptables: (state: State) => {
    return state.adoptables;
  },
};

const actions = {
  load(root: { commit: (mutation: string, params: any) => void }) {
    apollo
      .query({
        query: gql`
          query {
            allAdoptables {
              repository
            }
          }
        `,
      })
      .then((result) => {
        result.data.allAdoptables.forEach((adoptable: Adoptable) => {
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
              console.error('myuerror', error);
            })
            .finally(() => {
              root.commit('addAdoptable', { adoptables: adoptable });
            });
        });
      });
  },
};

const mutations = {
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
