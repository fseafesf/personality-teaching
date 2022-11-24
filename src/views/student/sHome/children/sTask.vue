<template>
  <div class="task">
    <TopBar>
      作业
    </TopBar>
    <h2>task</h2>
  </div>
</template>

<script >
import TopBar from '@/components/common/TopBar.vue';

export default {
  name: "sTask",
  components: { TopBar },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.task {
  display: flex;
}
</style>