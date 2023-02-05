<template>
  <div class="knowledge">
    <NavBar v-if="!$route.meta.hideTopBar" :navBarData="navBarData" />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar.vue'

export default {
  data() {
    return {
      name: 'knowledge',
      navBarData: [
        {
          name: '知识点树',
          path: '/teacher/knowledge/tree'
        },
        {
          name: '知识点联系',
          path: '/teacher/knowledge/contact'
        }
      ]
    }
  },
  methods: {},
  components: { NavBar }
}
</script>

<style lang="less" scoped></style>
