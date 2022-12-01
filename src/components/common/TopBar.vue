<template>
  <div class="top-bar">
    <div class="left" @click="leftClickHandler">
      <slot name="left">
        <span class="back el-icon-back">返回</span>
      </slot>
    </div>

    <div class="title wrap-v1">
      <div class="center">
        <slot>
          默认标题
        </slot>
      </div>
    </div>

    <div class="right"></div>

  </div>
</template>

<script>

export default {
  emits: ['left-click'],
  methods: {
    leftClickHandler() {
      this.$emit('left-click')
    }
  }
}

</script>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 40px;
  background-color: #4498ee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
  padding: 20px;

  .left {
    color: #fff;

    &:hover {
      cursor: pointer;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
</style>