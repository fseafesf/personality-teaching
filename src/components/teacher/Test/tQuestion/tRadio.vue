<template>
  <div class="radio">
    <div class="radio-content">
      <div class="radio-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span>{{ typeProblem.content }}</span>
      </div>
      <div class="radio-option">选择题选项内容区</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "radio",
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
.radio {
  margin: 5px 25px 0 25px;
  min-height: 100px;
  .radio-content {
    .radio-title {
      height: 46px;
      span{
        margin-right: 5px;
      }
    }
  }
}
</style>