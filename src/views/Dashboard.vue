<template>
  <el-row>
    <el-col :span="6">left</el-col>

    <el-col :span="12">
      <ul class="infinite-list" v-infinite-scroll="load">
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

import { Octokit } from '@octokit/rest';

import Adoptable from '@/components/Adoptable.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { Adoptable },
  data() {
    return {
      adoptables: [
        {
          repository: 'RepoAdopt/client',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit condimentum est nec malesuada. Donec sollicitudin interdum turpis, vel mattis metus sodales sit amet.',
        },
      ],
    };
  },
  methods: {
    load() {
      const octakit = new Octokit({});

      octakit.repos.getContent({ owner: 'RepoAdopt', repo: 'client', path: 'README.md' }).then((res) => {
        console.log(res);
      });

      const repo = {
        repository: 'RepoAdopt/client',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit condimentum est nec malesuada. Donec sollicitudin interdum turpis, vel mattis metus sodales sit amet.',
      };

      this.adoptables.push(repo);
      this.adoptables.push(repo);
      this.adoptables.push(repo);
      this.adoptables.push(repo);
      console.log(this.adoptables.length);
    },
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
