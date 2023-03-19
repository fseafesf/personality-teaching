<template>
  <div class="table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="60" type="index"> </el-table-column>
      <el-table-column
        class="text-nowrap"
        label="题目内容"
        width="400"
        prop="context"
      >
        <!-- <template slot-scope="scope">
          <div v-html="scope.row.context"></div>
        </template> -->
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
import { HTMLDecode } from '@/utils/htmlUtil'

export default {
  emits: [
    // 暴露给父组件的两个事件
    'editTopic', // 复选框点击
    'deleteTopic' // 点击知识点节点
  ],
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
    knp_id: {
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
    // 我们进入在tTable中请求 因为这样更新的时候 table也能自动发请求获取新的数据
    this.updateTable()
  },
  methods: {
    // 第一次进入table和table编辑更新发请求
    updateTable() {
      this.$store.dispatch('QuestionListActive', {
        type: this.$props.type,
        level: this.$props.level,
        keyword: this.$props.keyword,
        knp_id: this.$props.knp_id,
        size: this.$props.size,
        page: this.$props.page
      })
    },

    // 编辑
    handleEdit(index, row) {
      this.$emit('editTopic', row)
      // console.log(row)
      this.$router.push({ path: '/teacher/topic/edit/' + row.question_id })
    },

    // 删除
    handleDelete(index, row) {
      this.$emit('deleteTopic', row)
    }
  },
  computed: {
    tableData() {
      if (this.$store?.state.tTopic.topicTableData) {
        let tableData = this.$store?.state.tTopic.topicTableData

        // 对内容进行HTMLDecode解密
        tableData.forEach((item) => {
          item.context = HTMLDecode(item.context)
            .replace(/<img(?:(?!\/>).|\n)*?\/>/gm, '[图片]')
            .replace(/<[^>]+>/g, '')
        })

        return tableData
      }
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
