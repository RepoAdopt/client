<template>
  <el-card :header="name" shadow="hover" class="card">
    <p>{{ description }}</p>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'adoptable',
  props: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    repository: {
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
