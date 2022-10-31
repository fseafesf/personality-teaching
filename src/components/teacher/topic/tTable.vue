<template>
  <div class="table">
    <el-table :data="$store.state.tTopic.topicTableData" border style="width: 100%" size="small">
      <el-table-column label="序号" width="60" type="index">
      </el-table-column>
      <el-table-column label="题目内容" width="600" prop="content">
      </el-table-column>
      <el-table-column label="题型" width="100" prop="type.label">
      </el-table-column>
      <el-table-column label="难易度" width="100" prop="difficulty">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
export default {
  data() {
    return {

    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({ path: '/teacher/topic/edit' })
      this.$store.commit("changeCurrentTopicEditData", row)
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="less" scoped>
.table {
  .el-table {
    padding: 10px;
  }

}
</style>