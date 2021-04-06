<template>
  <el-col>
    <h1 class="own-adoptables">My repositories</h1>
    <el-input
      placeholder="Search for your adoptables"
      v-model="search"
      clearable
    />
    <ul id="own-adoptable-list">
      <li
        class="own-adoptables"
        v-for="(adoptable, index) in filteredList"
        :key="`adoptable:${index}-${adoptable.repository}`"
      >
        <h2>{{ adoptable.repository }}</h2>
      </li>
    </ul>
  </el-col>
</template>

<script>
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";

  export default defineComponent({
    name: "OwnRepositories",
    data() {
      return {
        search: "",
      };
    },
    computed: {
      ...mapGetters("ownAdoptables", ["adoptables"]),
      filteredList: function() {
        return this.adoptables.filter((adoptable) => {
          return adoptable.repository
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      },
    },
  });
</script>

<style scoped>
  .own-adoptables {
    margin: 10px 0;
    white-space: nowrap;
  }
</style>
