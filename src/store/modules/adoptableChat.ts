import gql from "graphql-tag";

import Apollo from "@/apollo";
import Octokit from "@/octokit";

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
};

const actions = {
  init(root: Root, params: { id: string }) {
    root.commit("emptyUsers");
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
          }
        }
      `,
      variables: {
        adoptableId: params.id,
      },
    })
      .then((result) => {
        root.commit("setChatId", {
          chatId: result.data.chat.id,
        });
        root.commit("setChatMessages", {
          chatMessages: result.data.chat.chatMessages,
        });
        result.data.chat.users.forEach(function(username: string) {
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
        console.log(result);
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
  setChatId(state: State, params: { chatId: number }) {
    state.chatId = params.chatId;
  },
  emptyUsers(state: State) {
    state.users = [];
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
