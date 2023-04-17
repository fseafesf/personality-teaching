<template>
  <div class="pageList">
    <el-table :data="pages" border style="width: 100%" stripe>
      <el-table-column label="序号" width="150" align="center" type="index">
      </el-table-column>
      <el-table-column
        label="试卷标题"
        align="center"
        width="350"
        prop="exam_name"
      >
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="300">
        <template v-slot="scope">
          {{ formDate(scope.row.update_time) }}
        </template>
      </el-table-column>
      <el-table-column label="评阅情况" align="center" width="130">
      </el-table-column>
      <el-table-column label="分值" align="center" width="130">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="handleReview(scope.$index, scope.row)"
            >评阅</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
import { getPageList } from '@/services'
import { mapActions, mapMutations, mapState } from 'vuex'
import { formDate } from '@/utils/Date/formatDate'
export default {
  data() {
    return {
      pages: []
    }
  },
  created() {
    this.getPages()
  },
  methods: {
    ...mapActions('tReview', ['getInitReviewPages']),
    formDate,
    getPages() {
      this.getInitReviewPages().then((res) => {
        this.pages = this.reviewPages
        console.log(this.pages)
      })
    },
    handleReview(index, row) {
      this.$router.push({
        path: '/teacher/reviewHome/correctClass',
        query: {
          exam_id: row.exam_id
        }
      })
    }
  },
  computed: {
    ...mapState('tReview', ['reviewPages'])
  }
}
</script>

<style lang="less" scoped>
.pageList {
  min-height: 500px;
  background-color: #fff;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .page {
    width: 300px;
    height: 200px;
    padding: 20px;
    margin: 20px 0 0 0;
    border: 1px solid #fff;
  }
}
</style>
