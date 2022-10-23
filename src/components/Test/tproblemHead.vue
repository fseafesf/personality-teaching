<template>
  <div class="problem-head">
    <div class="head-content">123</div>
  </div>
</template>

<script>
export default {
  name: "problemHead",
};
</script>

<style lang="less" scoped>
.problem-head {
  height: 40px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 20px;
  display: flex;
  align-items: center;
  .head-content {
    font-size: 12px;
  }
}
</style>