<template>
  <li
      v-for="(adoptable, index) in adoptables.map(
        (match) => match.adoptable,
      )"
      :key="`adoptable:${index}-${adoptable.id}`"
  >
    {{adoptable}}
    <Adoptable v-if="adoptable.id === id"
        :id="adoptable.id"
        :repository="adoptable.repository"
        :description="adoptable.description"
        :readme="adoptable.readme"
        :show-button="false"
    />
  </li>

</template>

<script>

import {mapGetters} from "vuex";
import Adoptable from "@/components/Adoptable";

export default {
  name: "CurrentAdoptableChat",
  components: { Adoptable },
  data() {
    return {
      adoptables: [],
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapGetters("mymatches", ["matches"]),
  },
  watch: {
    matches: function(match) {
      this.adoptables = match;
    },
  },
  created() {
    this.adoptables = this.matches;
  },
}
</script>

<style scoped>

</style>