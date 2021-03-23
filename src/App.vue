<template>
  <el-container class="container">
    <el-header class="no-pad">
      <el-menu mode="horizontal">
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-row>
              <el-menu-item index="0">/RepoAdopt/</el-menu-item>
              <el-menu-item index="1">My matches</el-menu-item>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row justify="center">
              <el-button type="primary" class="margin-top-bottom" @click="dialogFormVisible = true">Add Adoptable</el-button>
            </el-row>
          </el-col>

          <el-row :span="8" justify="end">
            {{ githubToken }}
            {{ user }}
            <SignIn />
          </el-row>
        </el-row>
      </el-menu>
    </el-header>
    <!--TODO CHANGE THIS WHEN WHITE SPACE NOT BEING TYPED IN TEXTAREA IN MENU GETS FIXED, DEFINITELY NOT CORRECT!!!    -->
    <el-dialog v-model="dialogFormVisible" title="Add Adoptable" center>
      <el-form :model="form">
        <el-form-item label="Repository" :label-width="formLabelWidth" required>
          <el-select v-model="form.repository" placeholder="Select repository" filterable>
            <el-option label="BeauTaapken/DogAdoptionFrontEnd" value="BeauTaapken/DogAdoptionFrontEnd"></el-option>
            <el-option label="BeauTaapken/DogAdoptionAPI" value="BeauTaapken/DogAdoptionAPI"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" type="textarea" resize="none" :rows="10"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createAdoptable">Confirm</el-button>
      </template>
    </el-dialog>
    <router-view />
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import apollo from '@/apollo';
import gql from 'graphql-tag';

import SignIn from '@/components/SignIn.vue';

export default defineComponent({
  components: { SignIn },
  computed: { ...mapGetters('user', ['githubToken', 'user']) },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        repository: '',
        description: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    createAdoptable: function() {
      apollo
        .mutate({
          mutation: gql`
            mutation($repository: String!, $description: String!) {
              createAdoptable(repository: $repository, description: $description) {
                adoptable {
                  id
                }
              }
            }
          `,
          variables: { repository: this.form.repository, description: this.form.description },
        })
        .then(() => {
          this.dialogFormVisible = false;
          this.form.repository = '';
          this.form.description = '';
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
</script>

<style lang="scss">
@import '@/style/default.scss';
</style>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}

.no-pad {
  padding: 0;
}

.margin-top-bottom {
  margin: 10px 0;
}
</style>
