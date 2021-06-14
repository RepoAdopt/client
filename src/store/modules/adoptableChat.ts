import gql from "graphql-tag";

import Apollo from "@/apollo";
import Octokit from "@/octokit";

import { Adoptable, getReadme, getUrl } from "./adoptables";

export interface ChatMessage {
  message: string;
  user: string;
}

export interface User {
  login: string;
  avatar_url: string;
}

interface State {
  chatMessages: Array<ChatMessage>;
  chatId: number;
  users: Array<User>;
  adoptable: Adoptable;
}

interface Root {
  commit: (mutation: string, params?: any) => void;
  dispatch: (action: string, params?: {}) => void;
  state: State;
}

const state = {
  chatMessages: [],
  chatId: 0,
  users: [],
  adoptable: {},
};

const getters = {
  chatMessages: (state: State) => {
    return state.chatMessages;
  },
  users: (state: State) => {
    return state.users;
  },
  chatId: (state: State) => {
    return state.chatId;
  },
  adoptable: (state: State) => {
    return state.adoptable;
  },
};

const actions = {
  init(root: Root, params: { id: string }) {
    root.commit("emptyUsers");
    root.commit("emptyChat");
    Apollo.query({
      query: gql`
        query($adoptableId: String!) {
          chat(adoptableId: $adoptableId) {
            id
            users
            chatMessages {
              user
              message
            }
            adoptable {
              id
              description
              repository
              owner
            }
          }
        }
      `,
      variables: {
        adoptableId: params.id,
      },
    })
      .then((result) => {
        const { id, chatMessages, users, adoptable } = result.data.chat;
        root.commit("setChatId", {
          chatId: id,
        });
        root.commit("setChatMessages", {
          chatMessages,
        });
        getUrl(adoptable, function(adoptableWithUrl) {
          getReadme(adoptableWithUrl, function(adoptableWithReadme) {
            root.commit("setAdoptable", {
              adoptable: adoptableWithReadme,
            });
          });
        });
        users.forEach(function(username: string) {
          Octokit()
            .users.getByUsername({ username })
            .then((response) => {
              root.commit("appendUser", {
                user: response.data,
              });
            });
        });
      })
      .catch((result) => {
        console.error(result);
      });
  },

  appendChatMessage(root: Root, params: { chatMessage: ChatMessage }) {
    root.commit("appendChatMessage", { chatMessage: params.chatMessage });
  },
};

const mutations = {
  setChatMessages(state: State, params: { chatMessages: ChatMessage[] }) {
    state.chatMessages = params.chatMessages;
  },
  setAdoptable(state: State, params: { adoptable: Adoptable }) {
    state.adoptable = params.adoptable;
  },
  setChatId(state: State, params: { chatId: number }) {
    state.chatId = params.chatId;
  },
  emptyUsers(state: State) {
    state.users = [];
  },
  emptyChat(state: State) {
    state.chatMessages = [];
  },
  appendUser(state: State, params: { user: User }) {
    state.users.push(params.user);
  },
  appendChatMessage(state: State, params: { chatMessage: ChatMessage }) {
    state.chatMessages.push(params.chatMessage);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
