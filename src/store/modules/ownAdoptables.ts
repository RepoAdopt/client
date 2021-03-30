import gql from 'graphql-tag';

import Apollo from '@/apollo';

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
    console.log(state.adoptables)
    return state.adoptables;
  },
};

const actions = {
  load(root: { commit: (mutation: string, params?: any) => void; state: State }) {
    Apollo.query({
      query: gql`
        query {
          myAdoptables {
            repository
          }
        }
      `
    })
    .then((result) => {
      console.log(result)
      root.commit('addAdoptables', { adoptables: result.data.myAdoptables });
    })
  },
};

const mutations = {
  addAdoptables(state: State, params: { adoptables: Array<Adoptable> }) {
    state.adoptables = params.adoptables
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
