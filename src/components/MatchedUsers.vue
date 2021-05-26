<template>
  <el-card>
    <template #header>
      <el-row type="flex" justify="space-between">
        <h1>People</h1>
        <TransferOwnership :users="users"  />
      </el-row>
    </template>
    <li v-for="(user, index) in users" :key="`message:${index}-${user}`">
      <el-divider v-if="index !== 0" />
      <el-row
        align="middle"
        type="flex"
        v-on:click="OpenUrlInNewTab(user.html_url)"
        class="clickable"
      >
        <el-avatar class="avatar" :src="user.avatar_url" />
        {{ user.login }}
      </el-row>
    </li>
  </el-card>
</template>

<script>
  import { mapGetters } from "vuex";

  import TransferOwnership from "./TransferOwnership.vue";

  export default {
    name: "MatchedUsers",
    props: ["id"],
    components: { TransferOwnership },
    computed: {
      ...mapGetters("adoptableChat", ["users"]),
    },
    methods: {
      OpenUrlInNewTab(url) {
        window.open(url);
      },
    },
  };
</script>

<style scoped>
  .avatar {
    margin-right: 10px;
  }
</style>
