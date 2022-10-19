<template>
  <div class="top-bar">
    <template v-for="(item,index) in navBarData">
      <div class="title" :class="{ active: currentIndex === index}" @click="itemClick(index)">
        <router-link :to="item.path">{{item.name}}</router-link>
      </div>
    </template>
  </div>
</template>

<script >
export default {
  data() {
    return {
      navBarData: [
        {
          name: '知识点树',
          path: '/teacher/knowledge/tree'
        },
        {
          name: '知识点联系',
          path: '/teacher/knowledge/contact'
        },
      ],
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
        this.currentIndex = this.navBarData.findIndex(item => item.path === to.path)
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