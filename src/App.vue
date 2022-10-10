<template>
  <div id="app">
    <NavBar />
    <router-view class="wrap-v1" />
  </div>
</template>

<script>
import NavBar from './components/nav-bar.vue'

export default {
  name: "App",
  components: { NavBar }
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
