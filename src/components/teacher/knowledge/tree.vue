<template>
  <div class="tree">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree :data="treeData" ref="tree" :show-checkbox="showCheckbox" node-key="id" default-expand-all
          :expand-on-click-node="false" highlight-current :current-node-key="currentNode"
          @check-change="checkedClickHandler" @node-click="nodeClickHandler">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="label">
              <span>{{ node.label }}</span>
            </div>
            <template v-if="operation">
              <span>
                <el-button type="text" size="mini" @click.stop="() => append(data)">
                  添加
                </el-button>
                <el-button type="text" size="mini" @click.stop="() => edit(node, data)">
                  编辑
                </el-button>
                <el-button type="text" size="mini" @click.stop="() => remove(node, data)">
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

<script >
import { deletePoint } from "@/services"
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
      default: () => ([])
    },
    currentNode: {
      type: String,
      default: ''
    }
  },
  emits: ['checkedClick', 'nodeClick'],
  data() {
    return {
      data: [
        {
          id: 1,
          label: '知识点1',
          children: [
            {
              id: 2.1,
              label: '知识点2.1',
              children: [
                {
                  id: 3.1,
                  label: '知识点3'
                }
              ]
            },
            {
              id: 2.2,
              label: '知识点2.2',
              children: [
                {
                  id: 3.2,
                  label: '知识点3'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          label: '知识点4',
        }

      ]
    };
  },
  mounted() {
    // this.$store.dispatch('PointOneActive')
    this.$store.dispatch('PointListActive')
  },
  methods: {
    append(data) {
      this.$router.push({ path: '/teacher/knowledge/add/' + data.id })
    },
    edit(node, data) {
      this.$router.push({ path: '/teacher/knowledge/edit/' + data.id })
    },
    remove(node, data) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePoint(data.id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            this.$store.dispatch('PointListActive')
          }
        })
      }).catch(() => { });
    },
    checkedClickHandler(data, checked) {
      this.$emit('checkedClick', this.$refs.tree.getCheckedKeys().join(','), checked)
    },
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
    defaultChecked: function (newValue) {
      this.$refs.tree.setCheckedKeys(newValue)
    },
    currentNode: function (newValue) {
      // this.$refs.tree.setCurrentKey(newValue)
    }

  }
};
</script>

<style lang="less" scoped>
.tree {
  height: 100%;

  .custom-tree-container {
    // width: 400px;
    // min-height: 800px;
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

      // .label {
      //   width: 300px;
      // }
    }
  }

}
</style>