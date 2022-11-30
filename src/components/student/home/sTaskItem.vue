<template>
  <div class="task">
    <div class="left">作业</div>
    <div class="right">
      <div class="task-name">第一次作业</div>
      <div class="task-info">未交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
}
</script>

<style lang="less" scoped>
.task {
  margin-top: 20px;
  display: flex;

  .left {
    padding: 16px 10px;
    background-color: var(--primary-color);
    border-radius: 5px;
    color: #fff;
    margin-right: 20px;
  }

  .right {
    .task-name {
      margin-bottom: 8px;
    }

    .task-info {
      color: #999;
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>