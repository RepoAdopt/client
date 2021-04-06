<template>
  <el-col :span="6" class="padding max-height">
    <OwnRepositories v-if="githubToken && user" />
    <div v-else>Not logged in</div>
  </el-col>

  <el-col :span="12" class="max-height">
    <!--TODO make it so correct item is loaded depending on user navigation(example: chat)-->
    <InfiniteList></InfiniteList>
  </el-col>

  <el-col :span="6" class="padding max-height">
    <div v-if="githubToken && user">right</div>
    <div v-else>Not logged in</div>
  </el-col>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";

  import OwnRepositories from "@/components/OwnRepositories.vue";
  import InfiniteList from "@/components/InfiniteList.vue";

  export default defineComponent({
    name: "Dashboard",
    components: { OwnRepositories, InfiniteList },
    computed: {
      ...mapGetters("user", ["githubToken", "user"]),
    },
  });
</script>

<style lang="scss" scoped>
  .padding {
    padding: 10px 20px;
  }
  .max-height {
    overflow: auto;
    max-height: 90vh;
  }
</style>
