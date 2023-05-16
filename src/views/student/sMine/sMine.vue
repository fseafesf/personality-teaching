<template>
  <div class="home">
    <!-- <div class="personal">
      <div class="info">
        <div>姓名：xxx</div>
        <div>学号：xxx</div>
      </div>
      <div class="avatar">
        <el-avatar
          :size="100"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </div>
    </div> -->
    <div class="task">
      <div class="title">作业</div>
      <div class="filter">
        <span>筛选</span>
        <el-radio v-model="radio" label="1">全部</el-radio>
        <el-radio v-model="radio" label="2">已完成</el-radio>
        <el-radio v-model="radio" label="3">未完成</el-radio>
      </div>

      <div class="task-item" v-for="item in this.examList" :key="item.exam_id">
        <STaskItem
          :eaxm-info="item"
          :status="0"
          @click.native="taskItemClick(item.exam_id, item.status)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import STaskItem from '@/components/student/sMine/sTaskItem.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { getCache } from '@/utils/localstorage'
export default {
  name: 'sMine',
  components: { STaskItem },
  data() {
    return {
      radio: '1',
      studentID: ''
    }
  },
  created() {
    this.studentID = getCache('studentId')
    this.getInitExamList(this.studentID)
  },
  methods: {
    // ...mapMutations('sTask'),
    ...mapActions('sTask', ['getInitExamList']),
    taskItemClick(key, status) {
      this.$router.push({
        path: '/student/task',
        query: {
          exam_id: key,
          status
        }
      })
    }
  },
  computed: {
    ...mapState('sTask', ['examList', 'studentAnswers'])
  }
}
</script>

<style lang="less" scoped>
.home {
  margin-top: 10px;

  .personal {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    .info {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  // 作业
  .task {
    margin-top: 10px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;

    .title {
      font-size: 20px;
      font-weight: 700;
      color: #4498ee;
    }

    .filter {
      margin-top: 20px;
      font-size: 14px;
      color: #999;

      span {
        margin-right: 20px;
      }
    }
  }
}
</style>
