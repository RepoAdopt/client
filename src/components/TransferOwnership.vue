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
            v-for="user in users.filter((user) => user.login !== user.login)"
            :key="'user-' + user.login"
          >
            {{ user.login }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="`Type ${repository} for confirmation`">
        <el-input v-model="request.confirmation" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogOpen = false">
        Cancel
      </el-button>
      <el-button type="primary">
        Save
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";

  export default defineComponent({
    name: "TransferOwnership",
    props: {
      users: {
        type: Array,
      },
			repository: {
				type: String
			}
    },
    computed: {
      ...mapGetters("user", ["githubToken", "user"]),
    },
    data() {
      return {
        request: { newOwner: null, confirmation: "" },
        dialogOpen: false,
      };
    },
  });
</script>
