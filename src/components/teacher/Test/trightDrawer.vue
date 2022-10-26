<template>
  <div class="right-drawer">
    <div @click="drawer" class="drawer-box">
      <div class="drawer-content">
        <div class="drawer-preview">试卷预览</div>
      </div>
      <div class="drawer-basket" :class="basketShow ? 'basket' : ''">
        <div class="basket-content" v-if="this.selectProblem.length !== 0">
          <div class="basket-head">
            题目总数:{{ this.selectProblem.length }}
          </div>
          <div class="basket-list">
            <div class="basket-radio unified" v-show="this.problemData['1']">
              <div class="radio-content content-unifed">
                <div class="radio-left left-unifed">
                  <span>单选题</span>
                  <span><em class="numColor">{{
                    this.problemData["1"]?.length
                  }}</em>题</span>
                </div>
                <div class="radio-right"><i class="el-icon-delete"></i></div>
              </div>
            </div>
            <div class="basket-select unified" v-show="this.problemData['2']">
              <div class="radio-content content-unifed">
                <div class="radio-left left-unifed">
                  <span>多选题</span>
                  <span><em class="numColor">{{
                    this.problemData["2"]?.length
                  }}</em>题</span>
                </div>
                <div class="radio-right"><i class="el-icon-delete"></i></div>
              </div>
            </div>
            <div class="basket-calcul unified" v-show="this.problemData['3']">
              <div class="radio-content content-unifed">
                <div class="radio-left left-unifed">
                  <span>计算题</span>
                  <span ><em class="numColor">{{
                    this.problemData["3"]?.length
                  }}</em>题</span>
                </div>
                <div class="radio-right"><i class="el-icon-delete"></i></div>
              </div>
            </div>
            <div class="basket-read unified" v-show="this.problemData['4']">
              <div class="radio-content content-unifed">
                <div class="radio-left left-unifed">
                  <span>阅读题</span>
                  <span ><em class="numColor">{{
                    this.problemData["4"]?.length
                  }}</em>题</span>
                </div>
                <div class="radio-right"><i class="el-icon-delete"></i></div>
              </div>
            </div>
            <div class="basket-program unified" v-show="this.problemData['5']">
              <div class="radio-content content-unifed">
                <div class="radio-left left-unifed">
                  <span>编程题</span>
                  <span
                    ><em class="numColor">{{
                      this.problemData["5"]?.length
                    }}</em>题</span
                  >
                </div>
                <div class="radio-right"><i class="el-icon-delete"></i></div>
              </div>
            </div>
            <el-button type="primary" @click="preview">预览</el-button>
          </div>
        </div>
        <div class="basket-else" v-else>没有添加题目</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { groupByType } from "@/utils/groupByType";
export default {
  name: "right-drawer",
  data() {
    return {
      basketShow: false,
      problemData: [],
    };
  },
  methods: {
    drawer() {
      this.basketShow = !this.basketShow;
    },
    preview() {
      this.$router.push({
        path: "/teacher/examHome/preview",
      });
    },
    getData() {
      this.problemData = groupByType(this.$store.state.tTest.selectProblem);
      console.log("根据type分类的题目", this.problemData);
    },
  },
  computed: {
    ...mapState("tTest", ["selectProblem"]),
    params() {
      return JSON.parse(JSON.stringify(this.selectProblem));
    },
  },
  watch: {
    params: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        this.getData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.right-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  height: 100%;

  .drawer-box {
    height: 100%;
    background: #364044;
    position: relative;
    .drawer-content {
      width: 35px;
      position: absolute;
      background: #364044;
      height: 100%;
      color: white;
      font-size: 20px;
      padding: 20px 0 0 5px;

      .drawer-preview {
        margin-top: 300px;
      }
    }
    .basket-else {
      padding: 20px 0 0 45px;
    }
    .drawer-basket {
      //题目数目预览
      width: 290px;
      height: 100%;
      background: #f6f6f6;
      margin-right: -260px;
      transition: 0.5s ease;
      .basket-content {
        padding: 10px 10px 0 50px;
        display: flex;
        flex-direction: column;
        .basket-head {
          color: #999;
          height: 56px;
          line-height: 56px;
        }
        .basket-list {
          min-height: 200px;
          .unified {
            height: 30px;
            background: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 5px;
            font-size: 14px;
            
            .content-unifed {
              display: flex;
              width: 90%;
              justify-content: space-between;
              .left-unifed {
                display: flex;
                justify-content: space-between;
                width: 80%;
                .numColor {
                  color: #4498ee;
                  font-size: 16px;
                  font-style: normal;
                  margin-right: 4px;
                }
              }
            }
          }
        }
      }
    }
    .basket {
      margin-right: 0px;
    }
  }
}
</style>