<template>
  <div class="search">
    <el-select class="search-item" v-model="typeValue" placeholder="题型" size="small">
      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select class="search-item" v-model="difficultyValue" placeholder="难度" size="small">
      <el-option v-for="item in difficultyOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
    <el-button type="primary" size="small">查询</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeOptions: [
        {
          value: '1',
          label: '单选题'
        },
        {
          value: '2',
          label: '多选题'
        },
        {
          value: '3',
          label: '判断题'
        },
        {
          value: '4',
          label: '填空题'
        },
        {
          value: '5',
          label: '简答题'
        }
      ],
      typeValue: '',
      difficultyOptions: [{
        value: '1',
        label: '简单'
      },
      {
        value: '2',
        label: '中等'
      },
      {
        value: '3',
        label: '困难'
      }
      ],
      difficultyValue: '',
      input: ''
    }
  },
  methods: {

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