<template>
  <div class="top-bar">
    <div class="title wrap-v1">
      <slot>
        默认标题
      </slot>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 40px;
  background-color: #4498ee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
</style>