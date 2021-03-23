interface State {
  githubToken: boolean | string;
}

const state = {
  githubToken: false,
};

const getters = {
  githubToken: (state: State) => {
    return state.githubToken;
  },
};

const actions = {
  setGithubToken(root: { commit: (mutation: string, params?: any) => void; state: State }, params: {token: string}) {
    root.commit('setToken', { token: params.token });
  },
};

const mutations = {
  setToken(state: State, params: { token: string }) {
    state.githubToken = params.token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
