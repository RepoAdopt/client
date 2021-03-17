<template>
  <el-dialog title="Add Adoptable" center>
    {{dialogFormVisible}}
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
      <el-button @click="">Cancel</el-button>
      <el-button type="primary" @click="createAdoptable">Confirm</el-button>
    </span>
    </template>
  </el-dialog>
</template>


<script>
import {defineComponent} from "vue";
// import gql from 'graphql-tag';
// import apollo from '@/apollo';

export default defineComponent({
  name: "CreateAdoptable",
  props: {
    setDialogFormVisible: Boolean
  },
  data() {
    return {
      form: {
        repository: '',
        description: '',
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    createAdoptable: function () {
      console.log("test")
    }
  }
});
</script>

<style scoped>

</style>