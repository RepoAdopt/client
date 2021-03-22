<template>
  <el-container class="container">
    <el-header class="no-pad">
      <el-menu  mode="horizontal">
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-row>
              <el-menu-item index="1">/RepoAdopt/</el-menu-item>
              <el-menu-item index="2">My matches</el-menu-item>
            </el-row>
          </el-col>
          <el-row :span="8">
            <el-button type="primary" class="margin-top-bottom" @click="dialogFormVisible = true">Add Adoptable</el-button>
          </el-row>
          <el-col :span="8"/>
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
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createAdoptable">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
    <router-view />
  </el-container>
</template>

<script>
import {defineComponent} from "vue";
import apollo from "@/apollo";
import gql from "graphql-tag";

export default defineComponent({
  name: "CreateAdoptable",
  props: {
    open: Boolean
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        repository: '',
        description: '',
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    createAdoptable: function () {
      apollo
          .mutate({
            mutation: gql`
          mutation($repository: String!, $description: String!)  {
            createAdoptable(repository: $repository description: $description) {
              adoptable {
                id
              }
            }
          }
        `,
            variables: { repository: this.form.repository, description: this.form.description },
          })
          .then((result) => {
            this.dialogFormVisible = false
            this.form.repository = ""
            this.form.description = ""
            console.log(result)
          })
          .catch((err) => {
            console.log(err)
          });
    }
  }
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
