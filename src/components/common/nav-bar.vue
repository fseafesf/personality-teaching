<template>
  <div class="nav-bar">
    <div class="content wrap-v1">
      <div v-for="(item, index) in navBarData" :key="index">
        <div class="title" :class="{ active: currentIndex === index }" @click="itemClick(index)">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </div>
      </div>
    </div>
    <div id="login"><el-avatar icon="el-icon-user-solid"></el-avatar><p>点击登录</p></div>
  </div>
</template>

<script>

import store from '../../store'

export default {
  data() {
    return {
      navBarData: store.state.navBarData,
      currentIndex: store.state.currentIndex
    }
  },
  methods: {
    itemClick(index) {
      store.commit("changeCurrentIndex", index)
      this.currentIndex = index
    }
  },
  watch: {
    $route(to, from) {
      const index = this.navBarData.findIndex(item => {
        if (!item.children) return item.path === to.path
        if (item.path === to.path) return item.path === to.path


        for (const iten of item.children) {
          // let regexp = `/{#${iten.path}}/ig`
          // console.log(regexp.exec(`${to.path}`));

          if (iten.path === to.path) {
            return iten.path === to.path
          }
        }
      })
      store.commit("changeCurrentIndex", index)
      store.commit("changeCurrentNavBarData", index)
      this.currentIndex = index
    }
  }
}

</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 50px;
  background-color: #4498ee;
  display: flex;
  justify-content: center;
  align-items: center;
  #login{
    display: flex;
    align-items: center;
    p{
      cursor: pointer;
      margin-left: 10px;
      color: white;
    }
  }
  .content {
    display: flex;
    height: 100%;

    .title {
      width: 124px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
      }

      &.active,
      &:hover {
        background-color: #3982ce;
      }
    }
  }
}
</style>