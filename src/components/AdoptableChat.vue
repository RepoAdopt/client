<template>

<!--  TODO place for each chatmessage in array with el-devider in between when api call exists and is called-->
  <el-container class="full-height-container">
    <el-main id="chat">
      <li
          v-for="(chatmessage, index) in adoptableMessages.chat"
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
import Message from "@/components/Message";
import {mapGetters} from "vuex";

export default {
  name: "AdoptableChat",
  components: { Message },
  data() {
    return {
      adoptableMessages: {
        chat: [{"message": "test", "user": "testuser"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "testuser"}, {"message": "testmessage uno", "user": "testuser"}],
        users: ["user1", "user2"]
      },
      chatMessage: ref('')
    };
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    sendMessage: function() {
    //  TODO send chatmessage with username to graphql and show add the message to the array
      this.adoptableMessages.chat.push({"message": this.chatMessage, "user": this.user?.login})
      this.chatMessage = ""
      setTimeout(this.scrollToBottom, 50)
    },
    scrollToBottom: function() {
      const chat = document.getElementById("chat")
      chat.scrollTop = chat.scrollHeight
    }
  },
  computed: {
    ...mapGetters("user", ["githubToken", "user"]),
  },
}
</script>

<style scoped>
.full-height-container {
  height: 100%;
}
</style>