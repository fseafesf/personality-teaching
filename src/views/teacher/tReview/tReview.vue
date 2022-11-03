<template>
  <div id="table">
    <!-- 试卷评阅界面 -->
    <template v-if="!$route.meta.isChildren">
      <el-table :data="paperList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="topicContent" label="题目内容"></el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="correctPaperFn">批阅</el-button>        
          </template>
        </el-table-column>
      </el-table>
    </template>
    
    <router-view></router-view>
  </div>
</template>

<script >
export default {
  data() {
    return {
      // 题目内容
      paperList: [
        {
          topicContent: '试卷一',
          topicType: "栈",
          complexity: "简单",
        },
        {
          topicContent: '试卷二',
          topicType: "链表",
          complexity: "简单",
        },
        {
          topicContent: '试卷三',
          topicType: "二叉树",
          complexity: "难",
        },
        {
          topicContent: '试卷四',
          topicType: "图",
          complexity: "简单",
        },
        {
          topicContent: '试卷五',
          topicType: "队列",
          complexity: "难",
        },
      ],      
    }
  },
  methods: {    
    correctPaperFn() {
      this.$router.push('/teacher/review/correctPaper')
    }
  }
}
</script>

<style lang="less" scoped>
  #table {
    margin-top: 10px;
  }
</style>
