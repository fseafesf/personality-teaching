<template>
  <div class="knowledge">
    <TopBar v-if="!$route.meta.hideTopBar" />
    <router-view></router-view>
  </div>
</template>

<script >
import TopBar from 'components/teacher/knowledge/top-bar.vue';

export default {
  data() {
    return {
      name: 'knowledge'
    };
  },
  methods: {
  },
  components: { TopBar }
};
</script>

<style lang="less" scoped>

</style>