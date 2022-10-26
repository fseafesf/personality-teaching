<template>
  <div class="examPaper">
    <div class="examHead">
        <el-button type="primary" @click="composePaper">主要按钮</el-button>
    </div>
    <div class="examList">
        
    </div>
  </div>
</template>

<script>
export default {
    name:'tExamPaper',
    data(){
        return {

        }
    },
    methods:{
        composePaper(){
            this.$router.push({
                path:'/teacher/examHome/test',
              
            })
        }
    }
}
</script>

<style lang="less" scoped>
.examPaper{
   
    min-height: 800px;
    display: flex;
    flex-direction: column;
    .examHead{
        width: 50%;
        padding: 20px;
        background: #ffffff;
        margin: 20px 0 20px 0;
    }
    .examList{
        min-height: 500px;
        background: #ffffff;
    }
}
</style>