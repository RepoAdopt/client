<template>
  <el-card shadow="hover" class="card">
    <template #header>
      <h1>
        <b>{{ repository }}</b>
      </h1>
    </template>
    <p v-if="description?.length">{{ description }}</p>
    <el-divider v-if="description?.length && readme?.length" />
    <vue3-markdown-it v-if="readme?.length" :source="readme" />
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

h1 {
  font-size: 2rem;
}
</style>
