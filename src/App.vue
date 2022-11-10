<template>
  <div id="app">
    <NavBar />
    <Login  v-show="!isLogin"></Login>
    <router-view class="wrap-v1" />
    <Loading/>
  </div>
</template>

<script>
import NavBar from './components/common/nav-bar.vue'
import Loading from './components/common/Loading.vue'
import Login from './components/common/Login.vue'

export default {
  data() {
    return {
      isLogin:Number(localStorage.getItem('isLogin')),
    }
  },
  name: "App",
  components: { NavBar, Loading,Login },
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
