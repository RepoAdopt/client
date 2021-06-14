import apollo from "@/apollo";
import gql from "graphql-tag";

import { Adoptable, getReadme, getUrl } from "./adoptables";

interface Match {
  id: string;
  user: string;
  adoptable: Adoptable;
}

interface State {
  matches: Array<Match>;
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}) => void;
  state: State;
}

const state = {
  matches: [],
};

const getters = {
  matches: (state: State) => {
    return state.matches;
  },
  hasMatch: (state: State) => (repository_id: string) => {
    return state.matches.some((match) => match.adoptable.id === repository_id);
  },
};

const actions = {
  load(root: Root) {
    apollo
      .query({
        query: gql`
          query {
            myMatches {
              id
              user
              adoptable {
                id
                repository
                description
                owner
              }
            }
          }
        `,
      })
      .then((res) => {
        res.data.myMatches.forEach((match: Match) => {
          getUrl(match.adoptable, function(adoptableWithUrl) {
            getReadme(adoptableWithUrl, function(adoptableWithReadme) {
              match.adoptable = adoptableWithReadme;
              root.commit("addMatches", { matches: [match] });
            });
          });
        });
      });
  },
  addMatch(root: Root, params: { match: Match }) {
    getUrl(params.match.adoptable, function(adoptableWithUrl) {
      getReadme(adoptableWithUrl, function(adoptable) {
        params.match.adoptable = adoptable;
        root.commit("addMatches", { matches: [params.match] });
      });
    });
  },
  removeMatch(root: Root, params: { id: string }) {
    root.commit("removeMatch", { id: params.id });
  },
};

const mutations = {
  addMatches(state: State, params: { matches: Array<Match> }) {
    state.matches = [...state.matches, ...params.matches];
  },
  removeMatch(state: State, params: { id: string }) {
    state.matches = state.matches.filter((match) => match.id !== params.id);
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
