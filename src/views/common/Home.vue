<template>
  <div class="home">
    <h2>home</h2>
  </div>
</template>

<script>
import cookies from 'vue-cookies';
export default {
  name: "Home",
  beforeCreate(){
    if (!cookies.get("session_key")) {
      this.$router.replace({ path: '/login'})
    }
  },
}
</script>
