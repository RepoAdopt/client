<template>
  <el-col :span="6"><OwnRepositories/></el-col>

  <el-col :span="12">
    <ul class="infinite-list" v-infinite-scroll="load" v-if="adoptables">
      <li v-for="(adoptable, index) in adoptables" :key="`adoptable:${index}-${adoptable.repository}`">
        <Adoptable :repository="adoptable.repository" :description="adoptable.description" :readme="adoptable.readme" />
      </li>
    </ul>
  </el-col>

  <el-col :span="6">right</el-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Adoptable from '@/components/Adoptable.vue';
import OwnRepositories from '@/components/OwnRepositories.vue'

export default defineComponent({
  name: 'Dashboard',
  components: { Adoptable, OwnRepositories },
  computed: { ...mapGetters('adoptables', ['adoptables']) },
  methods: {
    ...mapActions('adoptables', ['load']),
  },
  created() {
    this.load();
  },
});
</script>

<style lang="scss" scoped>
.infinite-list {
  margin: 0 10px;
  overflow: auto;
  max-height: 90vh;
}
</style>
