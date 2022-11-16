<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getCache, setCache, clearCache } from "@/utils/localstorage";
export default {
  name: "index",
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions("tTest", ["getProblems"]),
  },
  computed: {
    ...mapState("tTest", ["page"]),
  },
  
};
</script>

<style>
</style>