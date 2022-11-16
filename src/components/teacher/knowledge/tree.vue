<template>
  <div class="tree">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree :data="treeData" :show-checkbox="showCheckbox" node-key="id" default-expand-all
          :expand-on-click-node="false" :highlight-current="true" :default-checked-keys="[defaultChecked]"
          :current-node-key="treeData ? treeData[0]?.id : ''" @check-change="handleNodeClick"
          @node-click="nodeClickHandler">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
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
      type: String,
      default: ''
    }
  },
  emits: ['checkedClick', 'nodeClick'],
  data() {
    return {
      // data: [
      //   {
      //     id: 1,
      //     label: '知识点1',
      //     children: [
      //       {
      //         id: 2.1,
      //         label: '知识点2.1',
      //         children: [
      //           {
      //             id: 3.1,
      //             label: '知识点3'
      //           }
      //         ]
      //       },
      //       {
      //         id: 2.2,
      //         label: '知识点2.2',
      //         children: [
      //           {
      //             id: 3.2,
      //             label: '知识点3'
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    };
  },
  mounted() {
    this.$store.dispatch('PointListActive')
  },
  methods: {
    append(data) {
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
      this.$router.push({ path: '/teacher/knowledge/add' })
    },
    edit(node, data) {
      console.log(node, data);
      // this.$prompt('', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputValue: data.label
      // }).then(({ value }) => {
      //   this.$message({
      //     type: 'success',
      //     message: value
      //   });
      // }).catch(() => {
      // });

      this.$router.push({ path: '/teacher/knowledge/edit/' + data.id })
    },
    remove(node, data) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => { });
    },
    handleNodeClick(data, checked, node) {
      this.$emit('checkedClick', data, checked, node)
    },
    nodeClickHandler(data) {
      this.$emit('nodeClick', data)
    }
  },
  computed: {
    treeData() {
      const level1 = []
      const level2 = []
      if (this.$store.state.tKnowledge.points.list) {
        this.$store.state.tKnowledge.points.list.forEach(item => {
          if (item.level == 1) {
            const newItem = {}
            newItem.id = item.knp_id
            newItem.label = item.name
            level1.push(newItem)
          }
          if (item.level == 2) {
            const newItem = {}
            newItem.id = item.knp_id
            newItem.label = item.name
            newItem.parent_knp_id = item.parent_knp_id
            level2.push(newItem)
          }
        })

        for (const item of level1) {
          const arr = level2.filter(iten => iten.parent_knp_id)
          item.children = arr
        }
        return level1
      }
    }
  },
};
</script>

<style lang="less" scoped>
.tree {
  height: 100%;

  .custom-tree-container {
    width: 300px;
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
    }
  }

}
</style>