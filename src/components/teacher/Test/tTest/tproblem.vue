<template>
  <div class="problem">
    <slot class="box"></slot>
   
  </div>
</template>

<script>
export default {
  name:'problem'
};
</script>

<style lang="less" scoped>
.problem{
  background: white;
  padding: 20px 0 0 20px;
  min-height: 150px;
 
}
</style>