<template>
  <div>
    <el-menu :default-active="$router.path" 
      class="el-menu-demo navBar" 
      mode="horizontal" 
      unique-opened
      router>
      <el-menu-item index="/teacher/class/classListing">班级列表</el-menu-item>
      <el-menu-item index="/teacher/class/unJoinStuListing">未加入班级学生列表</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      activeIndex: "/teacher/class/classListing"
    }
  },
  created() {
    this.$router.path = "/teacher/class/classListing"
  },
  mounted() {
    this.$router.push("/teacher/class/classListing", ()=>{}, ()=>{})
  }
}
</script>

<style lang="less">
  .navBar {
    margin: 10px 0;
    border-radius: 4px;
  }
</style>