import Octokit from '@/octokit';
import Router from '@/router';

export interface User {
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
  orgs: Orgs;
}

export interface Orgs {
  avatar_url: string;
  description: string;
  events_url: string;
  hooks_url: string;
  id: number;
  issues_url: string;
  login: string;
  members_url: string;
  node_id: string;
  public_members_url: string;
  repos_url: string;
  url: string;
}

interface State {
  githubToken: boolean | string;
  repoAdoptToken: boolean | string;
  user: User;
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}, options?: {}) => void;
  state: State;
}

const state = {
  githubToken: false,
  repoAdoptToken: false,
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
  init(root: Root) {
    const githubToken = localStorage.getItem('githubToken') ?? false;
    const repoAdoptToken = localStorage.getItem('repoAdoptToken') ?? false;

    if (githubToken) {
      root.dispatch('setTokens', { githubToken: githubToken, repoAdoptToken: repoAdoptToken });
    }
    root.dispatch('adoptables/enableFetch', {}, { root: true });
  },
  logout(root: Root) {
    localStorage.removeItem('githubToken');
    localStorage.removeItem('repoAdoptToken');
    Router.go(0);
  },
  setTokens(root: Root, params: { githubToken: string; repoAdoptToken: string }) {
    root.commit('setToken', { githubToken: params.githubToken, repoAdoptToken: params.repoAdoptToken });
    root.dispatch('ownAdoptables/load', {}, { root: true })
    root.dispatch('loadUserData');
  },
  loadUserData(root: Root) {
    Octokit()
      .users.getAuthenticated()
      .then((userRes) => {
        root.commit('setUser', { user: userRes.data });
        Octokit()
          .orgs.listForUser({ username: userRes.data.login })
          .then((orgsRes) => {
            root.commit('setOrgs', { orgs: orgsRes.data });
            root.dispatch('repository/init', {}, { root: true });
          });
      });
  },
};

const mutations = {
  setToken(state: State, params: { githubToken: string; repoAdoptToken: string }) {
    state.githubToken = params.githubToken;
    state.repoAdoptToken = params.repoAdoptToken;
    localStorage.setItem('githubToken', params.githubToken);
    localStorage.setItem('repoAdoptToken', params.repoAdoptToken);
  },
  setUser(state: State, params: { user: User }) {
    state.user = params.user;
  },
  setOrgs(state: State, params: { orgs: Orgs }) {
    state.user.orgs = params.orgs;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
