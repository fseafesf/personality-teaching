<template>
  <div id="app">
    <NavBar :nav-bar-data="$store.state.navBarData" v-if="$store.state.navBarData.length && !$route.meta.hideNavBar" />
    <router-view class="wrap-v1" />
    <Loading />
  </div>
</template>

<script>
import Loading from './components/common/Loading.vue'
import NavBar from './components/common/nav-bar.vue'

export default {
  name: "App",
  components: { NavBar, Loading },
  mounted() {
    // console.log(this.$route.meta);
  }
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
