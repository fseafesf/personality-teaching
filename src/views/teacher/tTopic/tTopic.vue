<template>
  <div class="topic top-page">
    <!-- 数据展示页面 -->
    <template v-if="!$route.meta.isChildren">
      <!-- 搜索框 -->
      <div class="search">
        <!-- 题型 -->
        <el-select
          class="search-item"
          v-model="type"
          placeholder="题型"
          size="small"
          clearable
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 难度 -->
        <el-select
          class="search-item"
          v-model="level"
          placeholder="难度"
          size="small"
          clearable
        >
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 搜索框 -->
        <el-input
          v-model="keyword"
          placeholder="请输入内容"
          size="small"
          clearable
        ></el-input>

        <!-- 按钮 -->
        <el-button type="primary" size="small" @click="searchClick"
          >查询</el-button
        >
        <el-button type="warning" size="small" @click="resetClick"
          >重置</el-button
        >
      </div>

      <div class="content">
        <!-- 知识点树 -->
        <div class="left">
          <tTree
            :operation="false"
            @nodeClick="nodeClick"
            :currentNode="currentKId"
            :highlight="isHighlight"
          ></tTree>
        </div>

        <div class="right">
          <!-- 表单 -->
          <div class="topic-list">
            <el-button type="primary" @click="addHandleClick"
              >添加题目</el-button
            >
            <tTable
              :type="+type"
              :level="+level"
              :keyword="keyword"
              :knp_id="knp_id"
              :size="size"
              :page="currentPage"
              @editTopic="handleEdit"
              @deleteTopic="handleDelete"
            />
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="+this.$store.state.tTopic.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </template>

    <!-- 添加、编辑子页面 -->
    <!--
      这样做的好处是改页面不会被卸载 所以currentPage、size等参数会保留 当我们编辑、添加题目的时候还是在当前页面 不会被重置
      缺点：需要我们在tTable中的mouted发请求获取数据才能保证添加、编辑会重新刷新一次
    -->
    <router-view></router-view>
  </div>
</template>

<script>
import tTree from '@/components/teacher/knowledge/tTree.vue'
import tTable from '@/components/teacher/topic/tTable'

export default {
  name: 'tTopic',
  components: { tTable, tTree },
  data() {
    return {
      typeOptions: this.$store.state.typeOptions,
      type: '',
      levelOptions: this.$store.state.levelOptions,
      isHighlight: true, // 是否高亮当前选中知识点
      level: '', // 难度
      keyword: '', // 关键字
      knp_id: '', // 知识点ID
      currentPage: 1, // 当前页面
      size: 10 // 页面条数
    }
  },
  mounted() {
    // 我们进入在tTable中请求 因为这样更新的时候 table也能自动发请求获取新的数据
    // 如果在这里请求 编辑后就不请求 展示的还是之前的数据
    this.$store.dispatch('QuestionListActive', {
      type: this.type,
      level: this.level,
      keyword: this.keyword,
      knp_id: this.knp_id,
      size: this.size,
      page: this.page
    })
  },
  destroyed() {
    // console.log('ok')
  },
  methods: {
    // 搜索
    searchClick() {
      this.$store.dispatch('QuestionListActive', {
        type: this.type,
        level: this.level,
        keyword: this.keyword,
        size: this.size
      })
    },

    // 重置
    resetClick() {
      this.$store.dispatch('QuestionListActive')
      this.size = 10
      this.keyword = ''
      this.type = ''
      this.level = ''
      this.knp_id = ''

      // 取消知识点树高亮
      this.isHighlight = false
    },

    // 添加
    addHandleClick() {
      this.$router.push({ path: '/teacher/topic/add' })
    },

    // 改变每页显示数量
    handleSizeChange(size) {
      this.size = size
      this.$store.dispatch('QuestionListActive', {
        type: this.type,
        level: this.level,
        keyword: this.keyword,
        knp_id: this.knp_id,
        size
      })
      this.currentPage = 1
    },

    // 改变页码
    handleCurrentChange(page) {
      this.$store.dispatch('QuestionListActive', {
        type: this.type,
        level: this.level,
        keyword: this.keyword,
        knp_id: this.knp_id,
        size: this.size,
        page
      })
      // console.log(`当前页: ${page}`);
      this.currentPage = page
    },

    // 点击知识点
    nodeClick(data) {
      // console.log('nodeClick', data)
      this.$store.dispatch('QuestionListActive', {
        knp_id: data.id
      })
      this.knp_id = data.id
      // 保存当前知识点id到vuex中 用于默认高亮
      this.$store.commit('changecurrendKId', data.id)

      // 当前知识点树高亮
      this.isHighlight = true
    },

    // 编辑题目
    handleEdit(row) {
      this.$router.push({ path: '/teacher/topic/edit/' + row.question_id })
    },

    // 删除题目
    handleDelete(row) {
      if (this.$store.state.tTopic.topicTableData.length === 1) {
        this.currentPage -= 1
      }

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

              // 删除成功后重新获取数据
              this.$store.dispatch('QuestionListActive', {
                type: this.type,
                level: this.level,
                keyword: this.keyword,
                knp_id: this.knp_id,
                size: this.size,
                page: this.currentPage
              })
            })
        })
        .catch(() => {})
    }
  },
  computed: {
    // 获取选中的当前知识点Id
    currentKId() {
      return this.$store.state.tTopic.currendKId
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

  .content {
    margin-top: 10px;
    display: flex;

    .left {
      width: 300px;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 3px;
      background-color: #fff;
      font-size: 12px !important;
    }

    .right {
      width: 890px;
      margin-left: 10px;
      .topic-list {
        border-radius: 5px;
        background-color: #fff;

        .el-button {
          margin: 10px;
        }
      }

      .pagination {
        margin: 10px 0 0;
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
}
</style>
