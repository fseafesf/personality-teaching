<template>
  <div class="nav-bar">
    <div class="content wrap-v1">
      <div class="nav-wrapper">
        <div v-for="(item, index) in $store.state.headerData" :key="index">
          <div class="title">
            <router-link :to="item.path">{{ item.name }}</router-link>
          </div>
        </div>
      </div>

      <Acount id="acount" />
    </div>
  </div>
</template>

<script>
import Acount from './acount.vue'

export default {
  components: { Acount },
  // props: {
  //   navBarData: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
/*  给router-link添加active router-link-active  */
.router-link-active {
  background-color: #3982ce;
}
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
