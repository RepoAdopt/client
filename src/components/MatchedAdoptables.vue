<template>
  <ul class="match-list">
    <li
      v-for="(match, index) in matches"
      :key="`adoptable:${index}-${match.id}`"
    >
      <Adoptable
        :id="match.adoptable.id"
        :repository="match.adoptable.repository"
        :description="match.adoptable.description"
        :readme="match.adoptable.readme"
      />
    </li>
  </ul>
</template>

<script>
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";

  import Adoptable from "./Adoptable.vue";

  export default defineComponent({
    name: "MatchedAdoptables",
    components: { Adoptable },
    computed: {
      ...mapGetters("mymatches", ["matches"]),
    },
  });
</script>

<style scoped>
  .match-list {
    margin: 0 10px;
  }
</style>
