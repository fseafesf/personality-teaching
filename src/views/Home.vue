<template>
  <div class="home">
    <h2>home</h2>
  </div>
</template>

<script>
import { test } from '../services';

export default {
  name: "Home",
  mounted() {
    test().then(res => {
      console.log(res);
    })
  }
}
</script>
