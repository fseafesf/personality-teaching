<template>
  <div id="app">
    <NavBar />
    <router-view class="wrap-v1" />
    <Loading />
  </div>
</template>

<script>
import NavBar from './components/common/nav-bar.vue'
import Loading from './components/common/Loading.vue'

export default {
  data() {
    return {
      isLogin: Number(localStorage.getItem('isLogin')),
    }
  },
  name: "App",
  components: { NavBar, Loading, },
}
</script>

<style lang="less" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
