import gql from 'graphql-tag';

import Apollo from '@/apollo';
import adoptables from "@/store/modules/adoptables";

interface Adoptable {
  repository: string;
  description: string;
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}) => void;
  state: State;
  rootGetters: { 'user/user': ['user/user'] };
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
    Apollo.query({
      query: gql`
        query {
          myAdoptables {
            repository,
            description
          }
        }
      `
    })
    .then((result) => {
      root.commit('addAdoptables', { adoptables: result.data.myAdoptables });
    })
  },
  appendAdoptable(root: Root, params: { adoptable: Adoptable }) {
    root.commit('addAdoptable', { adoptable: params.adoptable })
  }
};

const mutations = {
  addAdoptables(state: State, params: { adoptables: Array<Adoptable> }) {
    state.adoptables.push.apply(state.adoptables, params.adoptables)
  },
  addAdoptable(state: State, params: { adoptable: Adoptable }) {
    state.adoptables.push(params.adoptable)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
