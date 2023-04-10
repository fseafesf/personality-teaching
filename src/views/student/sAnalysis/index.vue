<template>
  <div class="sAnalysis">
    <h2 class="title">学情分析</h2>
    <div class="block">
      <el-tree :data="treeData" ref="tree" node-key="id" default-expand-all>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="label">
            <span>{{ node.label }}</span>
          </div>
          <el-progress class="progressbar" v-if="data.score >= 90" :text-inside="true" :stroke-width="20" :percentage="data.score" status="success"></el-progress>
          <el-progress class="progressbar" v-else-if="data.score >= 70" :text-inside="true" :stroke-width="20" :percentage="data.score"></el-progress>
          <el-progress class="progressbar" v-else-if="data.score >= 60" :text-inside="true" :stroke-width="20" :percentage="data.score" status="warning"></el-progress>
          <el-progress class="progressbar" v-else-if ="data.score < 60" :text-inside="true" :stroke-width="20" :percentage="data.score" status="exception"></el-progress>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sAnalysis',
  data() {
    return {
      treeData: [
        {
          id: '1623636393072799744',
          label: '数据结构',
          children: [
            {
              id: '1623636660912664576',
              label: '数据结构概念',
              parent_knp_id: '1623636393072799744',
              children: [
                {
                  id: '1623642059044827136',
                  label: '数据结构的定义',
                  parent_knp_id: '1623636660912664576',
                  children: [],
                  level: 3,
                  score: 58,
                },
                {
                  id: '1623642319775346688',
                  label: '数据结构的相关术语',
                  parent_knp_id: '1623636660912664576',
                  score: 74,
                  children: [
                    {
                      id: '1623643903469039616',
                      label: '数据、数据元素、数据项、数据对象',
                      parent_knp_id: '1623642319775346688',
                      children: [],
                      level: 4,
                      score: 95,
                    },
                    {
                      id: '1623643981134966784',
                      label: '数据结构、逻辑结构、物理结构',
                      parent_knp_id: '1623642319775346688',
                      children: [],
                      level: 4,
                      score: 52,
                    },
                    {
                      id: '1623644098525147136',
                      label: '数据类型、抽象数据类型',
                      parent_knp_id: '1623642319775346688',
                      children: [],
                      level: 4,
                      score: 88,
                    }
                  ],
                  level: 3,
                  score: 68,
                }
              ],
              level: 2,
              score: 70,
            },
            {
              id: '1644172830360743936',
              label: '算法和算法分析',
              parent_knp_id: '1623636393072799744',
              children: [],
              level: 2,
              score: 83,
            }
          ],
          level: 1,
          score: 93,
        },
        {
          id: '1623934414213885952',
          label: '线性表',
          children: [
            {
              id: '1632308578704437248',
              label: '线性表的链式表示和实现',
              parent_knp_id: '1623934414213885952',
              children: [
                {
                  id: '1633109381962805248',
                  label: '单链表的定义和表示',
                  parent_knp_id: '1632308578704437248',
                  children: [],
                  level: 3,
                  score: 75,
                },
                {
                  id: '1633113006499966976',
                  label: '单链表基本操作的实现',
                  parent_knp_id: '1632308578704437248',
                  children: [],
                  level: 3,
                  score: 59,
                },
                {
                  id: '1633117308752769024',
                  label: '循环链表',
                  parent_knp_id: '1632308578704437248',
                  children: [],
                  level: 3,
                  score: 81,
                },
                {
                  id: '1633124646733754368',
                  label: '双向链表',
                  parent_knp_id: '1632308578704437248',
                  children: [],
                  level: 3,
                  score: 77,
                },
                {
                  id: '1633471781870252032',
                  label: '总结',
                  parent_knp_id: '1632308578704437248',
                  children: [],
                  level: 3,
                  score: 56,
                }
              ],
              level: 2,
              score: 76,
            },
            {
              id: '1644246034827718656',
              label: '线性表的顺序表示和实现',
              parent_knp_id: '1623934414213885952',
              children: [
                {
                  id: '1644246343960506368',
                  label: '线性表的顺序存储表示',
                  parent_knp_id: '1644246034827718656',
                  children: [],
                  level: 3,
                  score: 98,
                },
                {
                  id: '1644246773847306240',
                  label: '顺序表中基本操作的实现',
                  parent_knp_id: '1644246034827718656',
                  children: [],
                  level: 3,
                  score: 89,
                }
              ],
              level: 2,
              score: 53,
            }
          ],
          level: 1,
          score: 79,
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.sAnalysis {
  margin-top: 20px;
  min-height: calc(100vh - 90px);
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  .title {
    margin-bottom: 20px;
    font-size: 20px;
    color: #4498ee;
  }
  .block {
    padding: 10px;
    .custom-tree-node {
      display: flex;
      width: 100%;
      .progressbar {
        width: 260px;
        margin-left: 30px;
      }
    }
  }
}
</style>
