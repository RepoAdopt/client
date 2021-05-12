<template>
  <el-container class="full-height-container">
    <el-main id="chat">
      <li
          v-for="(chatmessage, index) in chatMessages"
          :key="`message:${index}-${chatmessage.message}`"
      >
        <Message
          :id="index"
          :message="chatmessage.message"
          :user="chatmessage.user"
          :currentUser="user?.login"
        />
      </li>
    </el-main>
    <el-footer>
      <el-input @keydown.enter="sendMessage" v-model="chatMessage" placeholder="Type a message"/>
    </el-footer>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import Message from "@/components/Message.vue";
import {mapActions, mapGetters} from "vuex";
import apollo from "@/apollo";
import gql from "graphql-tag";
import {showError} from "@/components/notifications";

export default {
  name: "AdoptableChat",
  components: { Message },
  props: [
      "id"
  ],
  data() {
    return {
      adoptableMessages: {
        users: ["user1", "user2"]
      },
      chatMessage: ref(''),
    };
  },
  // mounted() {
  //   this.scrollToBottom()
  // },
  watch: {
    chatMessages: function(newMessages, oldMessages) {
      if(newMessages.length > oldMessages.length) {

        this.scrollToBottom()
      }
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("adoptableChat", ["chatMessages", "chatId"]),
  },
  methods: {
    ...mapActions("adoptableChat", ["init", "appendChatMessage"]),
    sendMessage: function() {
      if(this.chatMessage.length){
        apollo
            .mutate({
              mutation: gql`
              mutation($chatId: String! $message: String!) {
                postChatMessage(chatId: $chatId message: $message){
                  chatMessage {
                    message,
                    user
                  }
                }
              }
            `,
              variables: {
                chatId: this.chatId,
                message: this.chatMessage,
              },
            })
            .then((response) => {
              this.chatMessage = ""
              this.appendChatMessage({
                chatMessage: response.data.postChatMessage.chatMessage,
              });
              this.scrollToBottom();
            })
            .catch(() => {
              showError("Could not send", "Something went wrong while sending a message.");
            });

      }
    },
    scrollToBottom: function() {
      const chat = document.getElementById("chat")
      setTimeout(function() {
        chat.scrollTop = chat.scrollHeight
      }, 50)
    }
  },
  created() {
    this.init({ id: this.id });
  }
}
</script>

<style scoped>
.full-height-container {
  height: 100%;
}
</style>