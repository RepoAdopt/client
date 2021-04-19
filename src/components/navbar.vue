<template>
  <el-header class="no-pad">
    <el-menu mode="horizontal" router>
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-row>
            <el-menu-item :route="{ name: 'Dashboard' }" index="0">
              RepoAdopt
            </el-menu-item>
            <el-menu-item :route="{ name: 'MyMatches' }" index="1">
              My matches
            </el-menu-item>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row justify="center">
            <el-button
              type="primary"
              class="margin-top-bottom"
              @click="dialogFormVisible = true"
              v-if="githubToken"
            >
              Add Adoptable
            </el-button>
          </el-row>
        </el-col>

        <el-row :span="8" justify="end">
          <SignIn v-if="!githubToken || !user" />
          <el-dropdown trigger="click" v-else>
            <el-row align="middle" type="flex">
              {{ user.login }}
              <el-avatar class="avatar" :src="user.avatar_url" />
              <i class="el-icon-arrow-down el-icon--right icon" />
            </el-row>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout()">
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
      </el-row>
    </el-menu>
  </el-header>
  <el-dialog v-model="dialogFormVisible" title="Add Adoptable" center>
    <el-form :model="form">
      <el-form-item label="Repository" :label-width="formLabelWidth" required>
        <el-select
          v-model="form.repository"
          placeholder="Select repository"
          filterable
        >
          <el-option
            v-for="{ id, full_name } in removedAddedItems"
            :key="id"
            :value="full_name"
          >
            {{ full_name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input
          v-model="form.description"
          autocomplete="off"
          type="textarea"
          resize="none"
          :rows="10"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="createAdoptable">Confirm</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { mapActions, mapGetters } from "vuex";
  import apollo from "@/apollo";
  import gql from "graphql-tag";

  import SignIn from "@/components/SignIn.vue";

  import { showSuccess, showError } from "@/components/notifications";

  export default defineComponent({
    name: "navbar",
    components: { SignIn },
    data() {
      return {
        dialogFormVisible: false,
        form: {
          repository: null,
          description: "",
        },
        formLabelWidth: "120px",
      };
    },
    computed: {
      ...mapGetters("user", ["githubToken", "user"]),
      ...mapGetters("repository", ["repositories"]),
      ...mapGetters("ownAdoptables", ["adoptables"]),
      removedAddedItems: function() {
        //@ts-ignore
        return this.repositories.filter((repo) => {
          return !this.adoptables.find(
            (x: { repository: string }) => x.repository === repo.full_name,
          );
        });
      },
    },
    methods: {
      ...mapActions("user", ["init", "logout"]),
      ...mapActions("ownAdoptables", ["appendAdoptable"]),
      createAdoptable: function() {
        apollo
          .mutate({
            mutation: gql`
              mutation($repository: String!, $description: String!) {
                createAdoptable(
                  repository: $repository
                  description: $description
                ) {
                  adoptable {
                    repository
                    description
                  }
                }
              }
            `,
            variables: {
              repository: this.form.repository,
              description: this.form.description,
            },
          })
          .then((response) => {
            this.appendAdoptable({
              adoptable: response.data.createAdoptable.adoptable,
            });
            this.dialogFormVisible = false;
            this.form.repository = null;
            this.form.description = "";
            showSuccess(
              "Succefully added repository",
              "Your repository has been added to RepoAdopt",
            );
          })
          .catch(() => {
            showError("Could not add", "Select a repository from the dropdown");
          });
      },
    },
    created() {
      this.init();
    },
  });
</script>

<style scoped>
  .no-pad {
    padding: 0;
  }

  .margin-top-bottom {
    margin: 10px 0;
  }

  .icon {
    margin: 0 10px 0 0;
  }

  .avatar {
    margin: 10px;
  }

  .el-menu-item {
    color: black;
  }
</style>
