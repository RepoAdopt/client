<template>
  <el-col :span="6" class="padding max-height">
    <router-view name="leftView" v-if="githubToken && user"/>
  </el-col>

  <el-col :span="12" class="max-height">
    <router-view />
  </el-col>

  <el-col :span="6" class="padding max-height">
    <router-view name="rightView"/>
  </el-col>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";

  export default defineComponent({
    name: "Dashboard",
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
