<template>
  <div class="class">
    <div class="title">
      <span>作业</span>
      <span class="back el-icon-back" @click="goBack">返回</span>
    </div>
    <div class="filter">
      <span>筛选</span>
      <el-radio v-model="radio" label="1">全部</el-radio>
      <el-radio v-model="radio" label="2">已完成</el-radio>
      <el-radio v-model="radio" label="3">未完成</el-radio>
    </div>

    <div class="task-item">
      <template v-for="(item, index) in 3">
        <STaskItem @click.native="taskItemClick" />
      </template>
    </div>
  </div>
</template>

<script >
import STaskItem from '@/components/student/home/sTaskItem.vue';

export default {
  data() {
    return {
      radio: "1"
    };
  },
  methods: {
    goBack() {
      this.$router.push("/student/home");
    },
    taskItemClick() {
      this.$router.push("/student/task")
    }
  },
  components: { STaskItem }
}
</script>

<style lang="less" scoped>
.class {
  box-sizing: border-box;
  margin-top: 10px;
  min-height: 85vh;
  border-radius: 5px;
  background-color: #fff;
  padding: 20px;

  .title {
    display: flex;
    justify-content: space-between;

    .back {
      color: var(--primary-color);
      font-weight: 700;

      &:hover {
        cursor: pointer;
      }
    }
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
</style>