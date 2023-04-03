<template>
  <div class="class">
    <div class="left">
      <el-dropdown>
        <span class="el-dropdown-link">
          选择班级<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="menu">
          <el-dropdown-item v-for="cls in classList" :key="cls.class_id">
            <router-link
              class="className"
              :to="{
                name: 'classAnalysisDetail',
                query: {
                  id: cls.class_id,
                  className: cls.name
                }
              }"
              @click.native.prevent="getClassId(cls.class_id)"
              style="color: #000"
            >
              {{ cls.name }}
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="pointTree">
        <el-tree
          :data="analysisTreeData"
          ref="tree"
          :show-checkbox="true"
          node-key="id"
          default-expand-all
          :check-strictly="true"
          @check="checkHandler"
          v-if="$route.query.id"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="label">
              <span>{{ node.label }}</span>
            </div>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getClassAPI } from '@/services/modules/teacher/tClass.js'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'classAnalysis',
  data() {
    return {
      keyword: '',
      getClassPage: {
        page_num: 1,
        page_size: 50
      },
      classList: [], // 存放班级列表
      getStudentPage: {
        page_num: 1,
        page_size: 200
      }
    }
  },
  mounted() {
    this.getClassListFn()
    this.$store.dispatch('PointListAction') 
    // console.log(this.$route.query.id)
  },
  computed: {
    ...mapState({
      tAnalysis: (state) => state.tAnalysis
    }),
    // 从store中获取知识点树列表
    analysisTreeData() {
      return this.tAnalysis.analysisPoints
    },
    // 是否清空知识点树的选择
    isResetChecked() {
      return this.tAnalysis.isResetChecked
    },
    selectedId() {
      return this.tAnalysis.selectedId
    },
    checkedPoints() {
      return this.tAnalysis.checkedPoints
    }
  },
  watch: {
    isResetChecked(newVal) {
      if (newVal === true) {
        this.resetChecked()
      }
    },
    selectedId(newVal) {
      this.$refs.tree.setChecked(newVal, true)
    },
    analysisTreeData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (this.tAnalysis.pointsList.length > 0) {
          this.tAnalysis.pointsList = []
        }
        this.expandTreeData(newVal)
      }
    },
    checkedPoints: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.judgeCheckedPointsNum()
      }
    }
  },
  methods: {
    ...mapActions(['getClassInfoActions']),
    ...mapMutations(['checkedPointsMutation', 'PointListMutation']),
    getClassId(val) {
      // 获取班级id
      this.class_id = val
    },
    // 请求班级列表
    async getClassListFn() {
      const res = await getClassAPI(this.getClassPage)
      this.classList = res.data
    },
    // 递归知识点
    deepTree(analysisTreeData, handler) {
      analysisTreeData.forEach((analysisPoint) => {
        handler(analysisPoint)
        if (analysisPoint.children) {
          this.deepTree(analysisPoint.children, handler)
        }
      })
    },
    // 如果选择知识点的条数大于10时的操作
    judgeCheckedPointsNum() { 
      let _this = this
      if (this.tAnalysis.checkedPoints.length >= 3) {
        this.$message({
          type: 'warning',
          message: '最多只能选择10个知识点哦'
        })
        this.tAnalysis.checkedPoints.forEach((item) => {
          this.deepTree(this.analysisTreeData, function (analysisPoint) {
            if (analysisPoint.id == item.id) {
              analysisPoint.checked = true
            } else if (!analysisPoint.checked) {
              analysisPoint.checked = false
            }
          })
        })
        this.deepTree(this.analysisTreeData, function (analysisPoint) {
          if (!analysisPoint.checked) {
            _this.$set(analysisPoint, 'disabled', true)
          }
        })
      } else {
        this.deepTree(this.analysisTreeData, function (analysisNode) {
          _this.$set(analysisNode, 'disabled', false)
        })
      }
    },
    // 操作树形节点时
    checkHandler(data, checkedData) {
      if (data.checked) {
        data.checked = false
      }
      this.$store.commit('checkedPointsMutation', checkedData.checkedNodes)
      this.judgeCheckedPointsNum()
      this.tAnalysis.isResetChecked = false // 控制是否清空选择
    },
    // 清空已选择的知识点树
    resetChecked() {
      let _this = this
      this.tAnalysis.checkedPoints = []
      this.$refs.tree.setCheckedKeys([])
      this.deepTree(this.analysisTreeData, function (analysisNode) {
        _this.$set(analysisNode, 'disabled', false)
        analysisNode.checked = false
      })
    },
    // 将知识点树转成扁平结构
    expandTreeData(analysisTreeData) {
      analysisTreeData.forEach((node) => {
        this.tAnalysis.pointsList.push(node)
        if (node.children) {
          this.expandTreeData(node.children)
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.class {
  display: flex;
  width: 100%;
  margin-top: 10px;
  .left {
    width: 300px;
    min-height: calc(100vh - 120px);
    margin-right: 10px;
    padding: 10px 0 0 10px;
    border-radius: 10px;
    background-color: #fff;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
      font-size: 16px;
    }
    .pointTree {
      margin-top: 20px;
    }
  }
  .right {
    flex: 1;
    padding: 0 10px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>