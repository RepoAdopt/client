import apollo from "@/apollo";
import gql from "graphql-tag";
import { Adoptable } from "./adoptables";

interface Match {
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
  get_match: (state: State, repository_id: string) => {
    return state.matches.filter(
      (match) => match.adoptable.id === repository_id,
    );
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
        root.commit("addMatches", { matches: res.data.myMatches });
      });
  },
};

const mutations = {
  addMatches(state: State, params: { matches: Array<Match> }) {
    state.matches = [...state.matches, ...params.matches];
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
