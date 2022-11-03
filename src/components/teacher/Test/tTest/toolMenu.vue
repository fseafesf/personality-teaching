<template>
  <div class="tool-menu">
    <div class="tool-content">
      <div class="tool-operation">
        <span>收藏</span>
        <span>纠错</span>
        <span>查看解析</span>
      </div>
      <el-button
        :class="!btnHide ? 'hide' : ''"
        type="primary"
        @click="handleMneu"
        >+ 选题</el-button
      >
      <el-button :class="btnHide ? 'hide' : ''" type="info" @click="deleteMenu"
        >- 移除</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "tool-menu",
  data() {
    return {
      list: [1, 2, 3],
      btnHide: Boolean,
    };
  },
  props: {
    Knp_id: {
      type: Number,
    },
  },
  mounted() {
    this.btnHide = !this.page.selectProblem.includes(
      this.problems.find(
        (item) => item.id === this.$props.Knp_id
      )
    );
  },
  computed:{
   ...mapState("tTest",["page","problems"])
  },
  methods: {
    ...mapMutations("tTest", ["addProblem", "deleteProblem"]),
    handleMneu() {
      console.log(this.$props.Knp_id);
      this.btnHide = false;
      let problem = this.problems.find(
        (item) => item.id === this.$props.Knp_id
      );
      this.addProblem(problem);
      console.log("tool-menu", this.page.selectProblem);
    },

    deleteMenu() {
      this.btnHide = true;
      let index = this.page.selectProblem.findIndex(
        (item) => item.id === this.$props.Knp_id
      );
      this.deleteProblem(index);
    },
  },
};
</script>

<style lang="less" scoped>
.tool-menu {
  height: 50px;
  border-top: 1px solid #f5f5f5;
  padding: 0 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  .tool-content {
    height: 40px;
    width: 300px;
    line-height: 40px;
    padding: 5px;
    display: flex;
    .tool-operation {
      color: #23589e;
      span {
        margin-left: 15px;
      }
    }
    .el-button--primary {
      margin-left: 10px;
    }
    .hide {
      display: none;
    }
    .el-button {
      margin-left: 180px;
      position: absolute;
      height: 25px;
      padding-bottom: 25px;
    }
  }
}
</style>