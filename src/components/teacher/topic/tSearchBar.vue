<template>
  <div class="search">
    <el-select class="search-item" v-model="typeValue" placeholder="题型" size="small">
      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select class="search-item" v-model="difficultyValue" placeholder="难度" size="small">
      <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="keyword" placeholder="请输入内容" size="small"></el-input>
    <el-button type="primary" size="small" @click="searchClick">查询</el-button>
    <el-button type="warning" size="small" @click="resetClick">重置</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeOptions: this.$store.state.typeOptions,
      typeValue: '',
      levelOptions: this.$store.state.levelOptions,
      difficultyValue: '',
      keyword: ''
    }
  },
  methods: {
    searchClick() {
      this.$store.dispatch('QuestionListActive', { keyword: this.keyword })
    },
    resetClick() {
      this.$store.dispatch('QuestionListActive')
      this.keyword = ''
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>