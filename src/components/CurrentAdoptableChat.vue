<template>
  <!-- Here
  {{ adoptable?.id }} -->
  <Adoptable
    v-if="adoptable?.id"
    :id="adoptable.id"
    :repository="adoptable.repository"
    :description="adoptable.description"
    :readme="adoptable.readme"
    :html_url="adoptable.html_url"
    :show_match_button="false"
  />
</template>

<script>
  import { mapGetters } from "vuex";
  import Adoptable from "@/components/Adoptable";

  export default {
    name: "CurrentAdoptableChat",
    components: { Adoptable },
    computed: {
      ...mapGetters("adoptableChat", ["adoptable"]),
    },
    props: {
      id: {
        type: String,
      },
    },
  };
</script>
