<template>
  <el-container class="container">
    <el-header class="no-pad">
      <el-menu  mode="horizontal">
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-row>
              <el-menu-item index="1">/RepoAdopt/</el-menu-item>
              <el-menu-item index="2">My matches</el-menu-item>
            </el-row>
          </el-col>
          <el-row :span="8">
            <el-button type="primary" class="margin-top-bottom" @click="dialogFormVisible = true">Add Adoptable</el-button>
          </el-row>
          <el-col :span="8"/>
        </el-row>
      </el-menu>
    </el-header>
    <CreateAdoptable setDialogFormVisible="dialogFormVisible" v-model="dialogFormVisible"/>
    <router-view />
  </el-container>
</template>

<script>
  import CreateAdoptable from "@/components/CreateAdoptable.vue";
  import {defineComponent} from "vue";

  export default defineComponent({
    components: { CreateAdoptable },
    data() {
      return {
        dialogFormVisible: false
      };
    }
  });
</script>

<style lang="scss">
@import '@/style/default.scss';
</style>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}

.no-pad {
  padding: 0;
}

.margin-top-bottom {
  margin: 10px 0;
}
</style>
