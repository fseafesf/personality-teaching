<template>
  <div>
    <!-- 学生列表 -->
    <div class="studentList" v-for="stu in studentList" :key="stu.id">
        <span class="stuName">{{stu.name}}</span>        
        <el-button v-if="stu.id % 2 === 0" type="danger" size="mini" class="correctBtn" @click="showExamPaperDialogFn">批阅</el-button>       
        <el-button v-else type="success" size="mini" class="correctBtn" @click="showExamPaperDialogFn">批阅</el-button>       
    </div>
    
    <!-- 显示试卷 -->
    <el-dialog :title="paperList"
      :visible.sync="examDialogVisible"
      fullscreen   
      :before-close="handleClose"
    >
      <h2>这是试卷内容</h2>
    </el-dialog>

    <!-- 底部 -->
    <div class="footer">
        <div class="count">
          <span style="margin-right: 16px">已批阅：<em class="finish">66</em></span>
          <span>未批阅：<em class="unfinish">10</em></span>
        </div>
        <el-button type="primary" size="mini" class="exitBtn" @click="exitFn">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'correctPaper',
  data() {
    return {
      // 学生
      studentList: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        },
        {
          id: 5,
          name: '唐三'
        }        
      ],
      paperList: "试卷一",
      examDialogVisible: false,  // 控制试卷是否显示     
    }
  },
  methods: {
    exitFn() {
      this.$router.go(-1)
    },
    showExamPaperDialogFn() {
      this.examDialogVisible = true
    },
    handleClose(done) {
      this.$confirm('是否退出批阅？')
        .then(() => {
          done()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
  // 学生列表
  .studentList {
    display: flex;
    position: relative;
    width: 800px;
    height: 40px;
    line-height: 40px;
    align-items: center;
    margin: 10px auto 0;
    background: #fff;
    box-shadow: 0px 3px 6px #ccc;
    border-radius: 4px;
    .stuName {
      margin-left: 20px;
    }
    .correctBtn {
      position: absolute;
      right: 20px;
    }
  }
  
  /* 底部 */
  .footer {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 50%;    
    bottom: 0;
    transform: translateX(-50%);
    width: 800px;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    // background-color: rgb(203, 241, 246);
    background-color: rgb(230, 230, 230);
    border-radius: 4px;
    .count {     
      margin-left: 20px;
      span {
        font-size: 14px;
        em {
          color: red;
          font-size: 18px;
        }
      }
    }
    .exitBtn {
      margin-right: 20px;
    }
  }
  
</style>