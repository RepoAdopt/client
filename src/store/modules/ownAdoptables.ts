import gql from 'graphql-tag';

import Apollo from '@/apollo';
import Octokit from '@/octokit';

interface Adoptable {
  repository: string;
  description: string;
}

interface State {
  adoptables: Array<Adoptable>;
}

const state = () => ({
  adoptables: [],
});

const getters = {
  adoptables: (state: State) => {
    return state.adoptables;
  },
};

const actions = {
  load(root: { commit: (mutation: string, params?: any) => void; state: State }) {

    root.commit('startFetch');

    Apollo.query({
      query: gql`
        query {
          myAdoptables {
            repository
          }
        }
      `,
      variables: {  },
    })
      .then((result) => {
        result.data.adoptable.forEach((adoptable: Adoptable) => {
          const [owner, repo] = adoptable.repository.split('/', 2);
          root.commit('addAdoptable', { adoptables: adoptable });
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
