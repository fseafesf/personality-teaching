<template>
  <div>
    <NavBar :navBarData = "navBarData"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar.vue'
export default {
  name: "tClass",
  components: { NavBar },
  data() {
    return {
      navBarData: [
        {
          name: "班级管理",
          path: "/teacher/class/classListing"
        },
        {
          name: "学生管理",
          path: "/teacher/class/unJoinStuListing"
        }
      ]
    }
  }
}
</script>

<style>

</style>