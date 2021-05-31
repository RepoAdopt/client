<template>
  <el-button type="primary" @click="dialogOpen = true">
    Transfer ownership
  </el-button>
  <el-dialog v-model="dialogOpen" title="Transfer an adoptable" center>
    <el-form v-model="request">
      <el-form-item label="Select the new owner">
        <el-select
          v-model="request.newOwner"
          autocomplete="on"
          no-data-text="No matched users"
          no-match-text="No user can be found"
        >
          <el-option
            v-for="user in users.filter((u) => u.login !== user.login)"
            :key="'user-' + user.login"
            :value="user.login"
          >
            {{ user.login }}
          </el-option>
        </el-select>
      </el-form-item>
      <p>Warning: Once a repository is transfered it can not be undone</p>
      <el-form-item :label="`Type ${repository} for confirmation`">
        <el-input v-model="request.confirmation" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogOpen = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="transfer">
        Transfer
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";

  import { showError, showSuccess } from "./notifications";

  import { changeOwner } from "@/nuclio";

  export default defineComponent({
    name: "TransferOwnership",
    props: {
      users: {
        type: Array,
      },
      repository: {
        type: String,
      },
    },
    computed: {
      ...mapGetters("user", ["githubToken", "user"]),
    },
    data() {
      return {
        request: { newOwner: "", confirmation: "" },
        dialogOpen: false,
      };
    },
    methods: {
      transfer() {
        if (this.request.newOwner === null) {
          showError("New owner", "Please select the new owner");
          return;
        }

        if (this.request.confirmation !== this.repository) {
          showError("Confirmation", "The confirmation is incorrect");
          return;
        }

        changeOwner(
          this.user.login,
          this.repository.split("/", 2)[1],
          this.request.newOwner,
        );
        this.dialogOpen = false;
        showSuccess("Transfer", "Transfer request has been made");
      },
    },
  });
</script>
