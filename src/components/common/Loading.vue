<template>
  <div class="loading" v-if="$store.state.isLoading" @click="loadingClick">
    <i class="el-icon-loading"></i>
    <span class="title">加载中</span>
  </div>
</template>

<script>
export default {
  methods: {
    loadingClick() {
      this.$store.commit('changeIsLoading', false)
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 999;
  // 全部为0为了让loading占满整个页面
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);

  .el-icon-loading,
  .title {
    color: #409eff;
  }
}
</style>
