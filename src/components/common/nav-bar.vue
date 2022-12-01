<template>
  <div class="nav-bar">
    <div class="content wrap-v1">
      <div class="nav-wrapper">
        <div v-for="(item, index) in $store.state.navBarData" :key="index">
          <div class="title" :class="{ active: currentIndex === index }" @click="itemClick(index)">
            <router-link :to="item.path">{{ item.name }}</router-link>
          </div>
        </div>
      </div>

      <Acount id="acount" />
    </div>
  </div>
</template>

<script>

import store from '../../store'
import Acount from './acount.vue'

export default {
  components: { Acount },
  props: {
    navBarData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // navBarData: store.state.navBarData,
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
      // console.log(this.$props)
      const index = this.$store.state.navBarData.findIndex(item => {
        if (!item.children) return item.path === to.path
        console.log(item.path, to.path)
        if (item.path === to.path) return item.path === to.path

        for (const iten of item.children) {
          if (iten.path === to.path) {
            return iten.path === to.path
          }

          // console.log(iten.path, to.path)
          // console.log(to.path.indexOf(iten.path), 'ok')
          if (to.path.indexOf(iten.path) !== -1) {
            return iten.path.indexOf(to.path)
          }
        }
      })
      console.log('index', index)
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

  .content {
    display: flex;
    height: 100%;
    position: relative;
    justify-content: space-between;

    .nav-wrapper {
      display: flex;
    }

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

    #acount {
      margin-top: 5px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>