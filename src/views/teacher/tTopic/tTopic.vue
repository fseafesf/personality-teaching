<template>
  <div class="topic top-page">
    <template v-if="!$route.meta.isChildren">
      <!-- 搜索框 -->
      <tSearchBar></tSearchBar>

      <!-- 表单 -->
      <div class="topic-list">
        <el-button type="primary" size="small" @click="addHandleClick">添加题目</el-button>
        <tTable />
      </div>
    </template>

    <!-- 子页面 -->
    <router-view></router-view>
  </div>
</template>

<script >
import tSearchBar from '@/components/teacher/topic/tSearchBar'
import tTable from '@/components/teacher/topic/tTable'

export default {
  components: { tSearchBar, tTable },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.dispatch('QuestionListActive')
  },
  methods: {
    addHandleClick() {
      this.$router.push({ path: '/teacher/topic/add' })
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  margin-top: 10px;

  .topic-list {
    margin-top: 10px;
    border-radius: 5px;
    background-color: #fff;

    .el-button {
      margin: 10px;
    }
  }
}
</style>