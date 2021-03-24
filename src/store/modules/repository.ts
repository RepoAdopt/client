import Octokit from '@/octokit';
import { User, Orgs } from './user'
import octokit from "@/octokit";

interface Repository {
  archive_url: string
  archived: boolean
  assignees_url: string
  blobs_url: string
  branches_url: string
  clone_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  created_at: string
  default_branch: string
  deployments_url: string
  description: string | null
  disabled: boolean
  downloads_url: string
  events_url: string
  fork: boolean
  forks: number
  forks_count: number
  forks_url: string
  full_name: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  has_downloads: boolean
  has_issues: boolean
  has_pages: boolean
  has_projects: boolean
  has_wiki: boolean
  homepage: string | null
  hooks_url: string
  html_url: string
  id: number
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  language: string
  languages_url: string
  license: string | null
  merges_url: string
  milestones_url: string
  mirror_url: string | null
  name: string
  node_id: string
  notifications_url: string
  open_issues: number
  open_issues_count: number
  owner: User | Orgs
  permissions: {admin: true, push: true, pull: true}
  private: false
  pulls_url: string
  pushed_at: Date
  releases_url: string
  size: number
  ssh_url: string
  stargazers_count: number
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  svn_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  updated_at: string
  url: string
  watchers: number
  watchers_count: number
}

interface State {
  username: string;
  repositories: [Repository]
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}) => void;
  state: State;
  rootGetters: { 'user/user': ['user/user'] };
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
  init(root: Root) {
    // @ts-ignore
    const username = root.rootGetters['user/user'].login ?? '';
    // @ts-ignore
    const orgs = root.rootGetters['user/user'].orgs ?? [];
    if (username && orgs) {
      root.dispatch('loadRepositories', { username, orgs });
    }
  },
  loadRepositories(root: Root, params: { username: string, orgs: [] }) {
    Octokit().repos.listForUser({'username': params.username}).then((userRes) => {
      // @ts-ignore
      let repositories:[Repository] = userRes.data

      if (params.orgs.length == 0){
        root.commit('setRepositories', { repositories: repositories });
      }
      else{
        for (let i = 0; i < params.orgs.length; i++) {
          // @ts-ignore
          octokit().repos.listForOrg({'org': params.orgs[i].login}).then((orgRes) => {
            // @ts-ignore
            repositories = repositories.concat(orgRes.data)
            if(i == params.orgs.length-1) {
              root.commit('setRepositories', { repositories: repositories });
            }
          })
        }
      }
    });
  },
};


const mutations = {
  setRepositories(state: State, params: { repositories: [Repository] } ) {
    console.log(params.repositories)
    state.repositories = params.repositories;
  },
};



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
