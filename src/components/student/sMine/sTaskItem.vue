<template>
  <div class="task">
    <div class="left">作业</div>
    <div class="right">
      <div class="task-name">{{ this.eaxmInfo.exam_name || "无标题" }}</div>
      <div class="task-info">未交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    eaxmInfo: {
      type: Object,
      default: () => ({})
    }
  }
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
    background-color: #f7fafc;
    border-radius: 5px;
  }
}
</style>