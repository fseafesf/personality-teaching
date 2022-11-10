<template>
  <div class="topic top-page">
    <template v-if="!$route.meta.isChildren">
      <!-- 搜索框 -->
      <tSearchBar></tSearchBar>

      <!-- 表单 -->
      <div class="topic-list">
        <el-button type="primary" @click="addHandleClick">添加题目</el-button>
        <tTable />
      </div>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
          :total="+this.$store.state.tTopic.total">
        </el-pagination>
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
      currentPage: 1
    }
  },
  methods: {
    addHandleClick() {
      this.$router.push({ path: '/teacher/topic/add' })
    },
    handleSizeChange(size) {
      this.$store.dispatch('QuestionListActive', { size })
    },
    handleCurrentChange(page) {
      this.$store.dispatch('QuestionListActive', { page })
      // console.log(`当前页: ${page}`);
      this.currentPage = page
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

  .pagination {
    margin-top: 10px;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>