<template>
  <div class="class">
    <div class="custom-tree-container">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>

  </div>
</template>

<script >
export default {
  data() {
    return {
      data: [{
        id: 1,
        label: '数据结构',
        children: [
          {
            id: 4,
            label: '线性链表',
            children: [
              {
                id: 9,
                label: '单链表'
              },
              {
                id: 10,
                label: '循环链表'
              },
              {
                id: 11,
                label: '双向链表'
              }
            ]
          },
          {
            id: 5,
            label: '栈',
          },
          {
            id: 6,
            label: '队列'
          },
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
.class {
  margin-top: 20px;
  width: 300px;

  .custom-tree-container {
    padding: 10px;
    // max-height: 900px;
    height: 800px;
    border-radius: 5px;
    background-color: #fff;
  }

}
</style>