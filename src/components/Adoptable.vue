<template>
  <el-card shadow="hover" class="card">
    <template #header>
      <el-row type="flex" justify="space-between">
        <el-col :span="18">
          <h1 class="name">
            <b>{{ repository }}</b>
          </h1>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button type="primary" @click="toggleMatch">
              {{ this?.match ? "Unmatch" : "Match" }}
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
  import gql from "graphql-tag";

  import graphql from "@/apollo";

  import { showError, showSuccess } from "@/components/notifications";

  export default defineComponent({
    name: "adoptable",
    props: {
      id: {
        type: String,
      },
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
    methods: {
      toggleMatch() {
        graphql
          .mutate({
            mutation: gql`
              mutation($repository: String!) {
                createMatch(repository: $repository) {
                  match {
                    user
                    repository
                  }
                }
              }
            `,
            variables: {
              repository: this.id,
            },
          })
          .then(() => {
            showSuccess(
              "Created match",
              `You have been matched with ${this.repository}.`,
            );
          })
          .catch(() => {
            showError(
              "Could not match",
              `RepoAdopt could not create a match on ${this.repository} for you.`,
            );
          });
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

  .name {
    word-break: break-all;
  }
</style>
