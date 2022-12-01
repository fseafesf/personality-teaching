<template>
  <div class="knowledge">
    <NavBar v-if="!$route.meta.hideTopBar" />
    <router-view></router-view>
  </div>
</template>

<script >
import NavBar from 'components/teacher/knowledge/nav-bar.vue';

export default {
  data() {
    return {
      name: 'knowledge'
    };
  },
  methods: {
  },
  components: { NavBar }
};
</script>

<style lang="less" scoped>

</style>