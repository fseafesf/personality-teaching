<template>
  <div class="card">
    <div class="card-type">
      <h3>
        <span>{{ index + 1 }}、</span>
        <span>{{ this.toType(typeProblem.type) }}</span>
      </h3>
    </div>
    <div class="card-list">
      <vuedraggable v-model="typeProblem.data">
        <transition-group>
          <div
            class="drag-individual"
            :is="currentView"
            v-for="(item, index) in typeProblem.data"
            :key="index"
            :index="index"
            v-show="typeProblem.data.length !== 0"
            :typeProblem="item"
            
          ></div>
        </transition-group>
      </vuedraggable>
    </div>
  </div>
</template>

<script>
import Problem from "components/teacher/Test/tTest/tproblem.vue";
import vuedraggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  name: "card",
  data() {
    return {
      currentView: "",
      typeArr: ["单选", "多选", "填空", "判断", "简答"],
      typeComponent: ["Radio", "Multi", "Fill", "Judge", "Answer"],
    };
  },
  created() {
    document.body.ondrop = (event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    this.currentView = this.typeComponent[this.typeProblem.type - 1];
  },
  methods: {
    toType(key) {
      return this.typeArr[key - 1];
    },
    end() {
      console.log(this.typeProblem.data);
      console.log(this.page.selectProblem);
    },
  },
  props: {
    typeProblem: {
      type: Object,
      default: function () {
        return {};
      },
    },
    index: {
      type: Number,
    },
  },
  computed: {
    ...mapState("tTest", ["page"]),
  },
  components: {
    Problem,
    vuedraggable,
    Radio: () => import("@/components/teacher/Test/tQuestion/tRadio.vue"),
    Multi: () => import("@/components/teacher/Test/tQuestion/tMulti.vue"),
    Judge: () => import("@/components/teacher/Test/tQuestion/tJudge.vue"),
    Fill: () => import("@/components/teacher/Test/tQuestion/tFill.vue"),
    Answer: () => import("@/components/teacher/Test/tQuestion/tAnswer.vue"),
  },
};
</script>

<style lang="less" scoped>
.card {
  min-height: 200px;
  margin: 0 0 20px 10px;
  display: flex;
  flex-direction: column;
  .card-type {
    position: relative;
    background: #fff;
    height: 80px;
    border: 1px solid transparent;
    margin: 15px 0 0 25px;
    line-height: 80px;
  }
  .drag-individual {
    border: 1px solid transparent;
    padding: 10px;
    &:hover {
      cursor: pointer;
      border-color: #4498ee;
    }
  }
}
</style>