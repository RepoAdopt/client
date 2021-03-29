<template>
  <el-col class="padding">
    <h1>My repositories</h1>
    <el-input
        placeholder="Please input"
        v-model="input"
        clearable>
    </el-input>
    <ul class="infinite-list" v-infinite-scroll="load" v-if="adoptables">
      <li v-for="(adoptable, index) in adoptables" :key="`adoptable:${index}-${adoptable.repository}`">
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
      search: null,
    };
  },
  computed: { ...mapGetters('adoptables', ['adoptables']) },
  methods: {
    ...mapActions('adoptables', ['load']),
  },
});
</script>

<style scoped>
.padding {
  padding: 10px 20px;
}
</style>