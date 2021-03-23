import Octokit from '@/octokit';

interface User {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: Date;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: any;
  html_url: string;
  id: number;
  location: any;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: string;
  url: string;
}
interface State {
  githubToken: boolean | string;
  user: User;
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}) => void;
  state: State;
}

const state = {
  githubToken: localStorage.getItem('githubToken') ?? false,
  user: null,
};

const getters = {
  githubToken: (state: State) => {
    return state.githubToken;
  },
  user: (state: State) => {
    return state.user;
  },
};

const actions = {
  setGithubToken(root: Root, params: { token: string }) {
    root.commit('setToken', { token: params.token });
    root.dispatch('loadUserData');
  },
  loadUserData(root: Root) {
    Octokit.users.getAuthenticated().then((res) => {
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
