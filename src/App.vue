<template>
  <div id="app">
    <Header
      :nav-bar-data="$store.state.headerData"
      v-if="$store.state.headerData.length && !$route.meta.hideNavBar"
    />
    <router-view class="wrap-v1" />
    <Loading />
  </div>
</template>

<script>
import Loading from './components/common/Loading.vue'
import Header from './components/common/Header.vue'

export default {
  name: 'App',
  components: { Header, Loading },
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
