<template>
  <div class="test">
    <div class="back" @click="this.back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回试卷列表</span>
    </div>
    <div class="content">
      <div class="left_content wrap-v3">
        <div class="list-tree-mt">
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
        <div class="filter-box">
          <div class="filter-item">
            <span class="mt">题型:</span>
            <div class="filter-option">
              <ul class="filter-item-wrap">
                <li class="active">全部</li>
                <li>单选</li>
                <li>多选</li>
                <li>简答</li>
                <li>填空</li>
              </ul>
            </div>
          </div>
          <div class="filter-item">
            <span class="mt">难度:</span>
            <div class="filter-option">
              <ul class="filter-item-wrap">
                <li class="active">全部</li>
                <li>简单</li>
                <li>中等</li>
                <li>困难</li>
              </ul>
            </div>
          </div>
          <div class="filter-item">
            <span class="mt">方式:</span>
            <div class="filter-option">
              <ul class="filter-item-wrap">
                <li class="active">全部</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="handle-line"></div>

        <div class="content-box" v-for="(item, index) in seList" :key="index">
          <ProblemHead :Problem="item"></ProblemHead>
          <div
            :is="typeComponent[item.type-1]"
            :typeProblem="item"
            :index="Number(index)"
            class="content-problem"
          ></div>
          <ToolMenu :Knp_id="item.id"></ToolMenu>
        </div>
      </div>
    </div>

    <RightDrawer></RightDrawer>
  </div>
</template>

<script>
import Problem from "components/teacher/Test/tTest/tproblem.vue";
import ProblemHead from "components/teacher/Test/tTest/tproblemHead.vue";
import ToolMenu from "components/teacher/Test/tTest/toolMenu.vue";
import RightDrawer from "components/teacher/Test/tTest/trightDrawer.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [],
      seList: [],
      pageId: Number,
      show: false,
      typeComponent: ["Radio", "Multi", "Fill", "Judge", "Answer"],
      currentView: "",
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
    back() {
      this.$router.push({
        path: "/teacher/examHome/examPaper",
      });
      this.page.selectProblem = [];
    },
  },
  computed: {
    ...mapState("tTest", ["page"]),
  },
  components: {
    Problem,
    ProblemHead,
    ToolMenu,
    RightDrawer,
    Radio: () => import("@/components/teacher/Test/tQuestion/tRadio.vue"),
    Multi: () => import("@/components/teacher/Test/tQuestion/tMulti.vue"),
    Judge: () => import("@/components/teacher/Test/tQuestion/tJudge.vue"),
    Fill: () => import("@/components/teacher/Test/tQuestion/tFill.vue"),
    Answer: () => import("@/components/teacher/Test/tQuestion/tAnswer.vue"),
  },
};
</script>

<style lang="less" scoped>
.test {
  display: flex;
  flex-direction: column;
  .back {
    display: flex;
    align-items: center;
    width: 20%;
    height: 50px;
    margin: 10px 0 0 0;
    cursor: pointer;
    .back-content {
      margin-left: 10px;
    }
  }
  .content {
    display: flex;
    .left_content {
      height: 500px;
      margin: 10px 50px 0 0;
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
      margin: 10px 50px 0 0;
      // background: #f5f5f5;
      .filter-box {
        background: white;
        height: 200px;
        .filter-item {
          padding: 10px 0 10px 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          .mt {
            color: #999;
            font-size: 14px;
          }
          .filter-item-wrap {
            display: flex;
            gap: 20px;
            font-size: 14px;
            margin-left: 10px;
            li {
              padding: 5px;
              border-radius: 5px;
              &:hover {
                background-color: #4498ee;
                color: #fff;
              }
            }
            .active {
              background-color: #4498ee;
              color: #fff;
            }
          }
        }
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
        .content-problem{
          padding: 15px 0 0 5px;
        }
      }
    }
  }
}
</style>