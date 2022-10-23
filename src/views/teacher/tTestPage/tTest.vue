<template>
  <div class="test">
    <div class="left_content wrap-v3">
      <div
        class="list-tree-mt"
        @mouseenter="handleMouse"
        @mouseleave="handleMouse"
      >
        <div class="mt-hd">
          <i class="el-icon-menu"></i>
          <div class="mt-wrap">数据结构</div>
          <i class="el-icon-caret-bottom"></i>
          <div class="mt-content" :class="show ? 'show' : ''">123</div>
        </div>
      </div>
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="middle_content wrap-v4">
      <div class="filter-box"></div>
      <div class="handle-line"></div>

      <div class="content-box" v-for="(item, index) in seList" :key="index">
        <ProblemHead></ProblemHead>
        <Problem>{{ item.content }}</Problem>
        <ToolMenu :Knp_id="item.id"></ToolMenu>
      </div>
    </div>
    <RightDrawer></RightDrawer>
  </div>
</template>

<script>
import Problem from "../../../components/Test/tproblem.vue";
import ProblemHead from "../../../components/Test/tproblemHead.vue";
import ToolMenu from "../../../components/Test/toolMenu.vue";
import RightDrawer from "../../../components/Test/trightDrawer.vue";
export default {
  data() {
    return {
      list: [],
      seList: [],
      show: false,
      data: [
        {
          label: "一级 1",
          id: 1,
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          id: 2,
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          id: 3,
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      // console.log(this.$store.state.tTest.problems);
      this.list = this.$store.state.tTest.problems;
      this.seList = { ...this.list };
    },
    handleNodeClick(data) {
      console.log(data);
      this.seList = this.list.filter((element) => {
        return element.id === data.id;
      });
    },
    handleMouse() {
      this.show = !this.show;
    },
  },
  components: {
    Problem,
    ProblemHead,
    ToolMenu,
    RightDrawer,
  },
};
</script>

<style lang="less" scoped>
.test {
  display: flex;

  .left_content {
    height: 500px;
    margin: 50px 50px 0 0;
    background: white;
    .list-tree-mt {
      position: relative;
      z-index: 10;
      .mt-hd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        padding-left: 20px;
        padding-right: 50px;
        line-height: 20px;
        min-height: 20px;
        background-color: #fff;
        color: #333;
        text-align: left;
        border-bottom: 1px solid #e8e8e8;

        .mt-content {
          width: 400px;
          height: 200px;
          position: absolute;
          z-index: 100;
          margin-top: 240px;
          margin-left: -20px;
          background: #fff;
          border: 1px solid #4498ee;
          display: none;
        }

        .show {
          display: block;
        }
      }
    }
    .el-tree {
      height: 100%;
      padding: 20px;
    }
  }
  .middle_content {
    min-height: 800px;
    margin: 50px 50px 0 0;
    background: #f5f5f5;
    .filter-box {
      background: white;
      height: 200px;
    }
    .handle-line {
      margin-top: 20px;
      background: white;
      height: 50px;
    }
    .content-box {
      margin-top: 20px;
      min-height: 150px;
      background: white;
      &:last-child {
        margin-bottom: 40px;
      }
    }
  }
}
</style>