import Octokit from '@/octokit';
import getters from './user'

interface Repository {
  name: string;
  url: string;
}
interface State {
  username: string;
  repositories: [Repository]
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}) => void;
  state: State;
}

const state = {
  username: '',
  repositories: null
};

const getters = {
  username: (state: State) => {
    return state
  },
  repositories: (state: State) => {
    return state.repositories;
  },
};

const actions = {
  init(root: Root) {
    const token = user.getters.user() ?? false;

    if (token) {
      root.dispatch('setGithubToken', { token });
    }
  },
  loadRepositories(root: Root) {
    Octokit.repos.listForUser({}).then((res) => {
      console.log(res);
      root.commit('setUser', { user: res.data });
    });
  },
};

const mutations = {
  setToken(state: State, params: { token: string }) {
    state.githubToken = params.token;
    localStorage.setItem('githubToken', params.token);
  },
  setUser(state: State, params: { user: User }) {
    state.user = params.user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
