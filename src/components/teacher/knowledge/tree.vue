<template>
  <div class="tree">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree :data="treeData" :show-checkbox="showCheckbox" node-key="id" default-expand-all
          :expand-on-click-node="false" :default-checked-keys="[defaultChecked]" @check-change="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <template v-if="operation">
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">
                  添加
                </el-button>
                <el-button type="text" size="mini" @click="() => edit(node, data)">
                  编辑
                </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">
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
  emits: ['nodeClick'],
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('PointListActive')
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    edit(node, data) {
      console.log(node, data);
      this.$prompt('', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: data.label
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: value
        });
      }).catch(() => {
      });
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleNodeClick(data, checked, node) {
      this.$emit('nodeClick', data, checked, node)
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