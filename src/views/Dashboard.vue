<template>
  <el-col :span="6" class="padding">
    <OwnRepositories v-if="githubToken && user"/>
    <div v-if="!githubToken || !user">Not logged in</div>
  </el-col>

  <el-col :span="12">
<!--TODO make it so correct items is loaded depending on what the user want to see-->
    <InfiniteList></InfiniteList>
  </el-col>

  <el-col :span="6" class="padding">
    <div v-if="githubToken && user">right</div>
    <div v-if="!githubToken || !user">Not logged in</div>
  </el-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';

import OwnRepositories from '@/components/OwnRepositories.vue'
import InfiniteList from '@/components/InfiniteList.vue'

export default defineComponent({
  name: 'Dashboard',
  components: { OwnRepositories, InfiniteList },
  computed: {
    ...mapGetters('user', ['githubToken', 'user']),
  },
});
</script>

<style lang="scss" scoped>
.padding {
  padding: 10px 20px;
}
</style>
