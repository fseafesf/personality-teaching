<template>
  <div class="top-bar">
    <template v-for="(item, index) in $store.state.currentNavBarData.children">
      <div class="title" :class="{ active: currentIndex === index }" @click="itemClick(index)">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
    </template>
  </div>
</template>

<script >
import store from '../../../store';


export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        // 使用$nextTick为了防止DOM更新后才监听，因为vuex中currentNavBarData为{},当不为空会更新DOM，这时我们可以确保拿到数据
        this.$nextTick(() => {
          this.currentIndex = store.state.currentNavBarData.children.findIndex(item => item.path === to.path)
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  height: 46px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  .title {
    padding: 2px 0;

    a {
      color: #000 !important;
    }

    &.active,
    &:hover {
      border-bottom: 3px solid #4498EE;
    }
  }
}
</style>