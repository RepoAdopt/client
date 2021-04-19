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
              {{ match ? "Unmatch" : "Match" }}
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
    },
    data() {
      return {
        match: null,
      };
    },
    created() {
      // @ts-ignore
      this.match = true;
    },
    methods: {
      toggleMatch() {
        const { mutation, success, error } = this.match
          ? {
              mutation: gql`
                mutation($repositoryId: String!) {
                  deleteMatch(repositoryId: $repositoryId) {
                    match {
                      id
                    }
                  }
                }
              `,
              success: {
                title: "Deleted match",
                description: `You have unmatched ${this.repository}.`,
              },
              error: {
                title: "Could not unmatch",
                desciption: `RepoAdopt could not unmatch ${this.repository}.`,
              },
            }
          : {
              mutation: gql`
                mutation($repositoryId: String!) {
                  createMatch(repositoryId: $repositoryId) {
                    match {
                      id
                      user
                      repositoryId
                    }
                  }
                }
              `,
              success: {
                title: "Created match",
                description: `You have been matched with ${this.repository}.`,
              },
              error: {
                title: "Could not match",
                desciption: `RepoAdopt could not create a match on ${this.repository} for you.`,
              },
            };

        graphql
          .mutate({
            mutation,
            variables: {
              repositoryId: this.id,
            },
          })
          .then(() => {
            showSuccess(success.title, success.description);
          })
          .catch(() => {
            showError(error.title, error.desciption);
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
