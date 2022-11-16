<template>
  <div class="judge">
    <div class="judge-content">
      <div class="judge-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span>{{ typeProblem.context }}</span>
      </div>
      <div class="judge-option">判断题选项区</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "judge",
  data(){
    return{}
  },
  props: {
    index:{
        type:Number,
    },
    typeProblem:{
        type:Object,
        default:() => ({})
    }
  },
};
</script>

<style lang="less" scoped>
.judge {
    margin: 5px 25px 0 25px;
    min-height: 100px;
    .judge-content {
    .judge-title {
      height: 46px;
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>