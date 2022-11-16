<template>
  <div class="topic top-page">
    <template v-if="!$route.meta.isChildren">
      <!-- 搜索框 -->
      <div class="search">
        <el-select class="search-item" v-model="type" placeholder="题型" size="small">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select class="search-item" v-model="level" placeholder="难度" size="small">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="keyword" placeholder="请输入内容" size="small"></el-input>
        <el-button type="primary" size="small" @click="searchClick">查询</el-button>
        <el-button type="warning" size="small" @click="resetClick">重置</el-button>
      </div>

      <!-- 表单 -->
      <div class="topic-list">
        <el-button type="primary" @click="addHandleClick">添加题目</el-button>
        <tTable :type="+type" :level="+level" :keyword="keyword" :size="size" :page="currentPage" />
      </div>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
          :total="+this.$store.state.tTopic.total">
        </el-pagination>
      </div>

    </template>

    <!-- 子页面 -->
    <router-view></router-view>
  </div>
</template>

<script >
import tTable from '@/components/teacher/topic/tTable'

export default {
  name: 'tTopic',
  components: { tTable },
  data() {
    return {
      typeOptions: this.$store.state.typeOptions,
      type: '',
      levelOptions: this.$store.state.levelOptions,
      level: '',
      keyword: '',
      currentPage: 1,
      size: 10,
    }
  },
  // mounted() {
  //   this.$store.dispatch('QuestionListActive')
  // },
  destroyed() {
    console.log('ok')
  },
  methods: {
    searchClick() {
      this.$store.dispatch('QuestionListActive', { type: this.type, level: this.level, keyword: this.keyword, size: this.size })
    },
    resetClick() {
      this.$store.dispatch('QuestionListActive')
      this.size = 10
      this.keyword = ''
      this.type = ''
      this.level = ''
    },
    addHandleClick() {
      this.$router.push({ path: '/teacher/topic/add' })
    },
    handleSizeChange(size) {
      this.size = size
      this.$store.dispatch('QuestionListActive', { type: this.type, level: this.level, keyword: this.keyword, size })
      this.currentPage = 1
    },
    handleCurrentChange(page) {
      this.$store.dispatch('QuestionListActive', { type: this.type, level: this.level, keyword: this.keyword, size: this.size, page })
      // console.log(`当前页: ${page}`);
      this.currentPage = page
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  margin-top: 10px;

  .search {
    height: 46px;
    border-radius: 5px;
    background-color: #fff;

    display: flex;
    align-items: center;

    .search-item {
      margin: 0 10px;
      width: 100px;
    }

    .el-input {
      width: 250px;
    }

    .el-button {
      margin: 0 10px;
    }
  }

  .topic-list {
    margin-top: 10px;
    border-radius: 5px;
    background-color: #fff;

    .el-button {
      margin: 10px;
    }
  }

  .pagination {
    margin: 10px 0;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>