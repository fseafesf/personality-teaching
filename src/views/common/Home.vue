<template>
  <div class="home">
    <h2>home</h2>
  </div>
</template>

<script>
import { login, test } from '@/services';

export default {
  name: "Home",
  mounted() {
    test('1589535594390761472').then(res => {
      console.log(res);
    })

  }
}
</script>
