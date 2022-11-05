<template>
  <div class="fill">
    <div class="fill-content">
      <div class="fill-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span>{{ typeProblem.content }}(填空题的内容)</span>
      </div>
      <div class="fill-option"></div>
    </div>
  </div>
</template>

<script>
export default {
    name:'fill',
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
.fill {
    margin: 5px 25px 0 25px;
    min-height: 50px;
}
</style>