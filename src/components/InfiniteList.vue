<template>
  <ul class="infinite-list" v-infinite-scroll="load" v-if="adoptables">
    <li
      v-for="(adoptable, index) in adoptables"
      :key="`adoptable:${index}-${adoptable.repository}`"
    >
      <Adoptable
        :id="adoptable.id"
        :repository="adoptable.repository"
        :description="adoptable.description"
        :readme="adoptable.readme"
        :html_url="adoptable.html_url"
      />
    </li>
  </ul>
</template>

<script>
  import { defineComponent } from "vue";
  import { mapActions, mapGetters } from "vuex";

  import Adoptable from "@/components/Adoptable.vue";

  export default defineComponent({
    name: "InfiniteList",
    components: { Adoptable },
    computed: {
      ...mapGetters("adoptables", ["adoptables"]),
    },
    methods: {
      ...mapActions("adoptables", ["load"]),
    },
    created() {
      this.load();
    },
  });
</script>

<style scoped>
  .infinite-list {
    margin: 0 10px;
  }
</style>
