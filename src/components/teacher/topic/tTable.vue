<template>
  <div class="table">
    <el-table
      :data="$store.state.tTopic.topicTableData"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" width="60" type="index"> </el-table-column>
      <el-table-column label="题目内容" width="600" prop="context">
      </el-table-column>
      <el-table-column label="题型" width="100" prop="type"> </el-table-column>
      <el-table-column label="难易度" width="100" prop="level">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    topicTableData: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number
    },
    level: {
      type: Number
    },
    keyword: {
      type: String
    },
    size: {
      type: Number,
      default: 10
    },
    page: {
      type: Number
    }
  },
  mounted() {
    this.updateTable()
  },
  methods: {
    updateTable() {
      this.$store.dispatch('QuestionListActive', {
        type: this.$props.type,
        level: this.$props.level,
        keyword: this.$props.keyword,
        size: this.$props.size,
        page: this.$props.page
      })
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/teacher/topic/edit/' + row.question_id })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('QuestionDeleteActive', row.question_id)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.updateTable()
              // this.$store.dispatch('QuestionListActive')
            })
        })
        .catch(() => {})
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
