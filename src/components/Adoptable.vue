<template>
  <el-card shadow="hover" class="card">
    <template #header>
      <el-row type="flex" justify="space-between">
        <el-col :span="18">
          <h1>
            <b>{{ repository }}</b>
          </h1>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button type="primary">
              {{ this?.match ? "Match" : "Unmatch" }}
            </el-button>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <p v-if="description?.length">{{ description }}</p>
    <el-divider v-if="description?.length && readme?.length" />
    <vue3-markdown-it v-if="readme?.length" :source="readme" />
  </el-card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "adoptable",
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
      match: {
        optional: true,
        type: Object,
      },
    },
    methods: {},
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
