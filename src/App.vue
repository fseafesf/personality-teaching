<template>
  <div id="app">
    <!-- 登录页不显示Header -->
    <template v-if="$route.path == '/' || $route.path == '/login'">
      <router-view class="wrap-v1" />
    </template>
    <template v-else>
      <!-- <Layout> -->
      <Header />
      <router-view class="wrap-v1" />
      <!-- </Layout> -->
    </template>

    <!-- 加载页面 -->
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
    console.log(this.$route)
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
