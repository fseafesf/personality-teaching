<template>
  <div class="correctStudent">
    <div class="back" @click="back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回班级列表</span>
    </div>
    <div class="studentList">
      <div class="stuHead">
        <span>试卷名字</span>
      </div>
      <div class="stuBody">
        <div class="search">
          <!-- <el-input placeholder="请输入内容" v-model="input" clearable>
          </el-input>
          <el-button @click="searchStudent" type="primary" size="small"
            >主要按钮</el-button
          > -->
        </div>
        <div class="list">
          <el-table :data="seStudents" border stripe style="width: 100%">
            <el-table-column
              label="序号"
              width="150"
              align="center"
              type="index"
            >
            </el-table-column>
            <el-table-column
              label="姓名"
              align="center"
              width="250"
              prop="name"
            >
            </el-table-column>
            <el-table-column label="更新时间" align="center" width="350">
              <template v-slot="scope">
                <span>{{ formDate(scope.row.update_time) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评阅情况" align="center" width="180">
              <template v-slot="scope">
                <div
                  :class="
                    `${transfromStatus().statusClass(scope.row.status)}` +
                    ' ' +
                    'tag'
                  "
                >
                  <span>{{
                    transfromStatus().statusText(scope.row.status)
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="分值" align="center" width="130">
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  @click="handleReview(scope.$index, scope.row)"
                  >评阅</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transfromStatus } from '@/utils/transfrom'
import { mapActions, mapState } from 'vuex'
import { formDate } from '@/utils/Date/formatDate'
export default {
  name: 'correctStudent',
  data() {
    return {
      examId: String,
      classId: String,
      input: '',
      students: [],
      seStudents: []
    }
  },
  created() {
    this.examId = this.$route.query.exam_id
    this.classId = this.$route.query.class_id
    this.getStudents()
  },
  methods: {
    ...mapActions('tReview', ['getInitStudents']),
    transfromStatus,
    formDate,
    back() {
      this.$router.go(-1)
    },
    getStudents() {
      this.getInitStudents({
        exam_id: this.examId,
        class_id: this.classId
      }).then((res) => {
        console.log(res)
        // console.log(typeof res.data[0].status)
        this.students = this.reviewStudents
        this.seStudents = JSON.parse(JSON.stringify(this.students))
        // console.log('this.students',this.students);
        console.log('this.seStudents',this.seStudents);
        
      })
    },
    handleReview(index, row) {
      // console.log(typeof row.status)
      if (row.status === -1) {
        this.$message({
          type: 'warn',
          message: '当前学生未提交'
        })
        return
      }
      this.$router.push({
        path: '/teacher/reviewHome/correctReview',
        query: {
          exam_id: this.examId,
          class_id: this.classId,
          student_id: row.student_id,
          status: row.status
        }
      })
    }
  },
  computed: {
    ...mapState('tReview', ['reviewStudents'])
  }
}
</script>

<style lang="less" scoped>
.correctStudent {
  .back {
    display: flex;
    align-items: center;
    width: 20%;
    height: 50px;
    margin: 10px 0 10px 0;
    cursor: pointer;
    .back-content {
      margin-left: 10px;
    }
  }
  .studentList {
    min-height: 600px;
    margin-bottom: 60px;
    .stuHead {
      height: 50px;
      // border-bottom: 1px solid rgb(60, 30, 40, 0.8);
      background-color: #fff;
      line-height: 50px;
      padding: 0 20px;
    }
    .stuBody {
      min-height: 600px;
      background-color: #fff;
      margin-top: 30px;
      padding: 20px;

      .search {
        width: 30%;
        display: flex;
        .el-button {
          margin-left: 20px;
        }
      }
      .list {
        margin-top: 20px;
        .tag {
          width: 100px;
          height: 40px;
          padding: 0 10px;
          margin: auto;
          line-height: 40px;
        }
        .uncommitted {
          background-color: #fef0f0;
          border-color: #fde2e2;
          color: #f56c6c;
        }
        .unfinished {
          background-color: #f4f4f5;
          border-color: #e9e9eb;
          color: #909399;
        }
        .finished {
          background-color: #f0f9eb;
          border-color: #e1f3d8;
          color: #67c23a;
        }
        .uncorrected {
          background-color: #fdf6ec;
          border-color: #faecd8;
          color: #e6a23c;
        }
      }
    }
  }
}
</style>