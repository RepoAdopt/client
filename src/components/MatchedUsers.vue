<template>

  <el-card>
    <template #header>
    <h1>People</h1>
    </template>
    <li
        v-for="(user, index) in adoptableMessages.users"
        :key="`message:${index}-${user}`"
    >
      <el-divider v-if="index !== 0"/>
<!--      TODO get user images from github-->
      {{ user }}
    </li>
  </el-card>
</template>

<script>

export default {
  name: "MatchedUsers",
  data() {
    return {
      adoptableMessages: {
        chat: [{"message": "test", "user": "testuser"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "BeauTaapken"}, {"message": "testmessage uno", "user": "testuser"}, {"message": "testmessage uno", "user": "testuser"}],
        users: ["user1", "user2"]
      }
    };
  },
}
</script>

<style scoped>

</style>