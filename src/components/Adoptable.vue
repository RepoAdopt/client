<template>
  <el-card shadow="hover" class="card">
    <template #header>
      <el-row type="flex" justify="space-between">
        <el-col :span="18" v-on:click="OpenUrlInNewTab(html_url)" class="clickable">
          <h1 class="name">
            <b>{{ repository }}</b>
          </h1>
        </el-col>
        <el-col :span="6" v-if="showButton">
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
  import { mapGetters, mapActions } from "vuex";
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
      html_url: {
        type: String,
      },
      showButton: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters("mymatches", ["hasMatch"]),
      match() {
        // @ts-ignore this is defined
        return this.hasMatch(this.id);
      },
    },
    methods: {
      ...mapActions("mymatches", ["removeMatch", "addMatch"]),
      toggleMatch() {
        const { mutation, success, error, handler } = this.match
          ? {
              mutation: gql`
                mutation($adoptable: String!) {
                  deleteMatch(adoptable: $adoptable) {
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
              handler: (res: any) => {
                this.removeMatch({ id: res.deleteMatch.match.id });
              },
            }
          : {
              mutation: gql`
                mutation($adoptable: String!) {
                  createMatch(adoptable: $adoptable) {
                    match {
                      id
                      user
                      adoptable {
                        id
                        owner
                        repository
                        description
                      }
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
              handler: (res: any) => {
                this.addMatch({ match: res.createMatch.match });
              },
            };

        graphql
          .mutate({
            mutation,
            variables: {
              adoptable: this.id,
            },
          })
          .then((res) => {
            handler(res.data);
            showSuccess(success.title, success.description);
          })
          .catch(() => {
            showError(error.title, error.desciption);
          });
      },

      OpenUrlInNewTab(url: string) {
        if(url){
          window.open(url)
        }
      }
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

  .clickable {
    cursor: pointer;
  }
</style>
