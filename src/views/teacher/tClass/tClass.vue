<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/teacher/tClass/nav-bar.vue'
export default {
  name: "tClass",
  components: { NavBar }
}
</script>

<style>

</style>