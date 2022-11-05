<template>
  <div class="multi">
    <div class="multi-content">
      <div class="multi-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span>{{ typeProblem.content }}</span>
      </div>
      <div class="multi-option">多选题选项区</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "multi",
  data() {
    return {};
  },
  props: {
    index: {
      type: Number,
    },
    typeProblem: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.multi {
  margin: 5px 25px 0 25px;
  min-height: 100px;
  .multi-content {
    .multi-title {
      height: 46px;
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>