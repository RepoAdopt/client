<template>
  <navbar/>
  <el-container class="container">
    <router-view />
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from "@/components/navbar.vue";

export default defineComponent({
  components: {Navbar}
});
</script>

<style lang="scss">
@import '@/style/default.scss';
</style>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 90vh;
}
</style>
