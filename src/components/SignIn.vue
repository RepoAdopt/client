<template>
  <el-button class="button">
    <el-row align="middle" type="flex">
      <el-image class="icon" src="https://github.githubassets.com/pinned-octocat.svg" />
      <a class="text" :href="link">
        Sign in with GitHub
      </a>
    </el-row>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      link: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.VUE_APP_CLIENT_ID}`,
    };
  },
});
</script>

<style lang="scss" scoped>
.button {
  margin: 10px;
}

.text {
  padding: 0 0 0 10px;
}

.icon {
  max-width: 18px;
  max-height: 18px;
}
</style>
