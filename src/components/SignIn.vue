<template>
  <a class="button" :href="link">
    <el-button>
      <el-row align="middle" type="flex">
        <el-image
          class="icon"
          src="https://github.githubassets.com/favicon.ico"
        />
        Sign in with GitHub
      </el-row>
    </el-button>
  </a>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import returnClientId from "@/components/getClientId";

  export default defineComponent({
    name: "SignIn",
    data() {
      return {
        link: `https://github.com/login/oauth/authorize?scope=user:email%20public_repo&client_id=${returnClientId()}`,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .button {
    margin: 4px 10px;
  }

  .text {
    padding: 0 0 0 10px;
  }

  .icon {
    max-width: 18px;
    max-height: 18px;
  }
</style>
