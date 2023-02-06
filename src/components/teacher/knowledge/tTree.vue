<template>
  <div class="tree">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="treeData"
          ref="tree"
          :show-checkbox="showCheckbox"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          :current-node-key="currentNode"
          @check-change="checkedClickHandler"
          @node-click="nodeClickHandler"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="label">
              <span>{{ node.label }}</span>
            </div>
            <template v-if="operation">
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="() => append(data)"
                >
                  添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="() => edit(node, data)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </template>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { deletePoint } from '@/services'
// let id = 1000

export default {
  props: {
    operation: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 0
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    defaultChecked: {
      type: Array,
      default: () => []
    },
    currentNode: {
      type: String,
      default: ''
    }
  },
  emits: ['checkedClick', 'nodeClick'],
  data() {
    return {
      // data: []
    }
  },
  mounted() {
    // this.$store.dispatch('PointOneActive')
    this.$store.dispatch('PointListActive')
  },
  methods: {
    // 添加
    append(data) {
      this.$router.push({ path: '/teacher/knowledge/add/' + data.id })
    },

    // 编辑
    edit(node, data) {
      this.$router.push({ path: '/teacher/knowledge/edit/' + data.id })
    },

    // 删除
    remove(node, data) {
      this.$confirm(`是否要删除${data.label}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePoint(data.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })

              this.$store.dispatch('PointListActive')
            }
          })
        })
        .catch(() => {})
    },

    // 勾选
    checkedClickHandler(data, checked) {
      this.$emit(
        'checkedClick',
        this.$refs.tree.getCheckedKeys().join(','),
        checked
      )
    },

    // 点击知识点
    nodeClickHandler(data) {
      this.$emit('nodeClick', data)
    }
  },

  computed: {
    treeData() {
      return this.$store.state.tKnowledge.points
    }
  },
  watch: {
    // 监听defaultChecked 用来更新默认选中的知识点
    defaultChecked: function (newValue) {
      this.$refs.tree.setCheckedKeys(newValue)
    },
    currentNode: function (newValue) {
      // this.$refs.tree.setCurrentKey(newValue)
    }
  }
}
</script>

<style lang="less" scoped>
.tree {
  height: 100%;

  .custom-tree-container {
    border-radius: 5px;

    .block {
      padding: 10px;
    }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>
