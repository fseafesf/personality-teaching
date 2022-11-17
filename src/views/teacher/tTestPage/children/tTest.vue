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
                <li
                  v-for="(item, index) in type"
                  :key="index"
                  :class="{ active: currentType === item }"
                  @click="changeType(item)"
                >
                  <span>{{ toTypeT(item) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="filter-item">
            <span class="mt">难度:</span>
            <div class="filter-option">
              <ul class="filter-item-wrap">
                <li
                  v-for="(item, index) in type"
                  :key="index"
                  :class="{ active: currentLevel === item }"
                  @click="changeLevel(item)"
                >
                  <span>{{ toLevelT(item) }}</span>
                </li>
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
        <div class="handle-line">
          <div class="line-left">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable
              size="small"
            >
            </el-input>
          </div>
          <div class="line-right">
            <span>这是一些操作</span>
          </div>
        </div>

        <div class="manual-list" v-if="renderList.length !== 0">
          <div
            class="content-box"
            v-for="(item, index) in renderList"
            :key="item.question_id"
          >
            <ProblemHead :Problem="item"></ProblemHead>
            <div
              :is="typeComponent[item.type - 1]"
              :typeProblem="item"
              :index="Number(index)"
              class="content-problem"
            ></div>
            <keep-alive>
              <ToolMenu :typeProblem="item"></ToolMenu>
            </keep-alive>
          </div>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="15"
              :current-page="queryInfo.page_no"
              :page-size="queryInfo.page_size"
              @current-change="handleCurrentChange"
              background
            >
            </el-pagination>
          </div>
        </div>
        <div class="none" v-else>
          <i class="el-icon-loading"></i>
          <span>没有相应题目噢</span>
        </div>
      </div>
    </div>

    <RightDrawer :problemData="problemData"></RightDrawer>
  </div>
</template>

<script>
import Problem from "components/teacher/Test/tTest/tproblem.vue";
import ProblemHead from "components/teacher/Test/tTest/tproblemHead.vue";
import ToolMenu from "components/teacher/Test/tTest/toolMenu.vue";
import RightDrawer from "components/teacher/Test/tTest/trightDrawer.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { setCache, getCache, clearCache } from "@/utils/localstorage";
import { getQuestionList } from "@/services";
import { toType, toDifficult } from "@/utils/transfrom";
import { groupByType } from "@/utils/groupByType";

export default {
  name: "tTest",
  data() {
    return {
      // 初始数据
      list: [],
      // 过滤的数据
      seList: [],
      // 渲染的数据
      renderList: [],
      // 编辑的试卷id
      pageId: String,
      // 课程选择
      show: false,
      // 题目搜索
      input: "",
      // 题目类型
      type: [0, 1, 2, 3, 4, 5],
      currentType: 0,
      // 题目难度
      level: [0, 1, 2, 3],
      currentLevel: 0,
      // 不同题型的组件
      typeComponent: ["Radio", "Multi", "Judge", "Fill", "Answer"],
      currentView: "",

      // 分页器的数据
      total: 0,
      queryInfo: {
        query: "",
        page_size: 10,
        page_no: 1,
      },

      //左侧知识点树
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
      problemData: {},
    };
  },
  created() {
    if (!!this.$route.query.id) {
      this.pageId = this.$route.query.id;
    }
    if (!!getCache("selectProblem")) {
      this.setPageData({
        key: "selectProblem",
        val: getCache("selectProblem"),
      });
    }
    this.receive();
  },
  methods: {
    ...mapMutations("tTest", ["setPageData", "clearPageData", "initProblems"]),
    ...mapActions("tTest", ["getProblems"]),
    receive() {
      this.getProblems(this.queryInfo).then((res) => {
        this.getListData();
      });
    },
    getListData() {
      this.list = this.problems;
      this.seList = JSON.parse(JSON.stringify(this.list));
      this.renderList = JSON.parse(JSON.stringify(this.list));
      console.log(this.page.selectProblem, "tTest");
    },
    changeType(param) {
      this.currentType = param;
    },
    changeLevel(param) {
      this.currentLevel = param;
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
      this.$router.replace({
        path: "/teacher/examHome/examPaper",
      });
      this.clearPageData({
        key: "title",
        val: "",
      });
      this.clearPageData({
        key: "exam_id",
        val: "",
      });
      this.clearPageData({
        key: "selectProblem",
        val: [],
      });

      clearCache("exam_id");
      clearCache("title");
      clearCache("selectProblem");
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page_no = newPage;
      this.currentLevel = 0;
      this.currentType = 0;
      this.receive();
    },
    toTypeT(key) {
      return toType(key);
    },
    toLevelT(key) {
      return toDifficult(key);
    },
  },
  computed: {
    ...mapState("tTest", ["page", "problems"]),
    listenChange() {
      const { currentType, currentLevel } = this;
      return { currenttype: currentType, currentlevel: currentLevel };
    },
  },
  watch: {
    listenChange(val) {
      const filterKeys = Object.keys(val);
      console.log(val);
      this.renderList = this.seList.filter((item) => {
        return filterKeys.every((key) => {
          if (val[key] === 0) return true;
          return item[key.slice(7)] == val[key];
        });
      });
    },
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
        height: 150px;
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
        padding: 5px 18px 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .line-left {
          width: 200px;
        }
        .line-right {
          width: 100px;
        }
      }
      .manual-list {
        .content-box {
          margin-top: 20px;
          min-height: 150px;
          background: white;
          transition: 1s;
          &:last-child {
            margin-bottom: 40px;
          }
          .content-problem {
            padding: 15px 0 0 5px;
          }
        }
        .block {
          display: flex;
          justify-content: center;
          margin: 20px 0 20px 0;
        }
      }
    }
    .none {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
    }
  }
}
</style>