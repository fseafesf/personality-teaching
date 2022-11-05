<template>
  <div class="answer">
    <div class="answer-content">
      <div class="answer-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span>{{ typeProblem.content }}</span>
      </div>
      <div class="answer-option">简答题回答区</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'answer',
    data(){
        return{

        }
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
}
</script>

<style lang="less" scoped>
.answer {
    margin: 5px 25px 0 25px;
    min-height: 100px;
    .answer-content {
    .answer-title {
      height: 46px;
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>