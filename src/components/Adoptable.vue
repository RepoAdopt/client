<template>
  <el-card :header="repository" shadow="hover" class="card">
    <p v-if="description.length">{{ description }}</p>
    <el-divider />
    <vue3-markdown-it v-if="readme.length" :source="readme" />
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'adoptable',
  props: {
    description: {
      type: String,
    },
    repository: {
      type: String,
    },
    readme: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  margin: 16px;
}
</style>
