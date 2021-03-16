<template>
  <el-container class="container">
    <el-header class="no-pad">
      <el-menu mode="horizontal">
        <el-menu-item index="1">/RepoAdopt/</el-menu-item>
        <el-menu-item index="2">My matches</el-menu-item>
      </el-menu>
    </el-header>

    <router-view />
  </el-container>
</template>

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
</style>
