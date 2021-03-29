<template>
  <el-col class="padding">
    <h1>My repositories</h1>
    <el-input
        placeholder="Search for your adoptables"
        v-model="search"
        clearable
    />
    <ul id="own-adoptable-list" v-if="adoptables">
      <li class="own-adoptables" v-for="(adoptable, index) in filteredList" :key="`adoptable:${index}-${adoptable.repository}`">
        <h2>{{ adoptable.repository }}</h2>
      </li>
    </ul>
  </el-col>
</template>

<script>
import { defineComponent } from 'vue';
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  name: "OwnRepositories",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters('adoptables', ['adoptables']),

    filteredList: function() {
      return this.adoptables.filter(adoptable => {
        return adoptable.repository.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    ...mapActions('adoptables', ['load']),
  },
});
</script>

<style scoped>
.padding {
  padding: 10px 20px;
}
.own-adoptables {
  margin: 10px 0;
}
</style>