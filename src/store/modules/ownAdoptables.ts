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
    return state.adoptables;
  },
};

const actions = {
  load(root: { commit: (mutation: string, params?: any) => void; state: State }) {

    console.log("now getting myadoptables")

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
        root.commit('addAdoptable', { adoptables: result.data });
        console.log(result.data)
    })
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
