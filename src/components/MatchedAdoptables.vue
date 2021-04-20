<template>
  <ul class="match-list">
    <li
      v-for="(adoptable, index) in staticMatches.map(
        (match) => match.adoptable,
      )"
      :key="`adoptable:${index}-${adoptable.id}`"
    >
      <Adoptable
        :id="adoptable.id"
        :repository="adoptable.repository"
        :description="adoptable.description"
        :readme="adoptable.readme"
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
    data() {
      return {
        staticMatches: [],
      };
    },
    watch: {
      matches: function(newMatches) {
        if (newMatches.length >= this.staticMatches.length) {
          this.staticMatches = newMatches;
        }
      },
    },
    created() {
      this.staticMatches = this.matches;
    },
  });
</script>

<style scoped>
  .match-list {
    margin: 0 10px;
  }
</style>
