import Octokit from '@/octokit';
import user from './user'

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
  rootGetters: {};
}

const state = {
  username: '',
  repositories: null
};

const getters = {
  username: (state: State) => {
    return state.username;
  },
  repositories: (state: State) => {
    return state.repositories;
  },
};

const actions = {
  // @ts-ignore: Unreachable code error
  init(root: Root) {
    console.log(root.rootGetters)
    // console.log(rootGetter.user().name)
    const username = user.getters ?? '';
    console.log(username)
  },
  // loadRepositories(root: Root) {
  //   Octokit.repos.listForUser({}).then((res) => {
  //     console.log(res);
  //     root.commit('setUser', { user: res.data });
  //   });
  // },
};

const mutations = {
  // setRepositories(state: State, params: { repositories: [Repository] }) {
  //   state.user = params.user;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
