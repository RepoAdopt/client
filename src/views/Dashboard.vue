<template>
  <el-row>
    <el-col :span="6">left</el-col>

    <el-col :span="12">
      <ul class="infinite-list" v-infinite-scroll="load" v-if="adoptables">
        <li v-for="(adoptable, index) in adoptables" :key="adoptable.name + index">
          <Adoptable :name="adoptable.repository" :description="adoptable.description" />
        </li>
      </ul>
    </el-col>

    <el-col :span="6">right</el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Adoptable from '@/components/Adoptable.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { Adoptable },
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

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 16px;
  }
}
</style>
