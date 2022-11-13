<template>
  <div class="score">
    <div class="score-type">
      <h4>
        <strong>{{ this.toIndex(index) }}、</strong>
        <span>{{ this.toType(typeProblem.type) }}题</span>
      </h4>
      <span @click="this.delete">删除</span>
    </div>
    <div class="score-list">
      <vuedraggable class="wrapper" v-model="typeProblem.data" @end="this.end">
        <transition-group>
          <div
            class="drag-individual"
            v-for="(item, index) in typeProblem.data"
            :key="index"
            :Index="index"
            v-show="typeProblem.data"
          >
            {{ index + 1 }}
          </div>
        </transition-group>
      </vuedraggable>
    </div>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  name: "score",
  data() {
    return {
      typeArr: ["单选", "多选", "填空", "判断", "简答"],
      typeIndex: ["一", "二", "三", "四", "五"],
    };
  },
  created() {
    console.log(this.typeProblem);
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
  methods: {
    toType(key) {
      return this.typeArr[key - 1];
    },
    toIndex(key) {
      return this.typeIndex[key];
    },
    delete() {
      console.log(this.typeProblem.type);
    },
    end(){
      console.log(this.page.selectProblem)
    }
  },
  computed: {
    ...mapState("tTest", ["page"]),
    
  },
  components: {
    vuedraggable,
  },
};
</script>

<style lang="less" scoped>
.score {
  min-height: 86px;
  margin: 10px 20px 10px 9px;
  border: 1px solid transparent;
  .score-type {
    height: 30px;
    padding: 5px 5px;
    display: flex;
    justify-content: space-between;
    span {
      cursor: pointer;
    }
  }
  &:hover {
    cursor: move;
    border-color: #4498ee;
  }
  .score-list {
    display: flex;
    padding: 0 5px;
    .wrapper {
      span {
        display: flex;
        .drag-individual {
          width: 25px;
          height: 30px;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 5px;
          border-radius: 5px;
          &:hover {
            color: #fff !important;
            background: #4498ee !important;
            background-color: rgb(68, 152, 238);
          }
        }
      }
    }
  }
}
</style>