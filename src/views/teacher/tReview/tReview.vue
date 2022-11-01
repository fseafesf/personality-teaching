<template>
  <div>
    <el-table :data="paperList" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="topicContent" label="题目内容"></el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="showExamPaperDialogFn">批阅</el-button>        
        </template>
      </el-table-column>
    </el-table>

    <!-- 显示试卷 -->
    <el-dialog :title="paperList.topicContent"
      :visible.sync="examDialogVisible"
      fullscreen   
    >
      <h2>这是试卷内容</h2>
    </el-dialog>
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
      examDialogVisible: false,  // 控制试卷是否显示
    }
  },
  methods: {
    showExamPaperDialogFn() {
      this.examDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
