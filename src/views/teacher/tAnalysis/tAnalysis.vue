<template>
  <div>
    <NavBar :navBarData = "navBars"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
export default {
  name: "tAnalysis",
  components: { NavBar },
  data() {
    return {
      navBars: [
        {
          name: "班级学情分析",
          path: "/teacher/analysis/classAnalysis"
        },
        {
          name: "个人学情分析",
          path: "/teacher/analysis/studentAnalysis"
        }
      ]
    }
  }
}
</script>

<style>

</style>