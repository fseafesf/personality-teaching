<template>
  <div class="score">
    <div class="score-type">
      <h4>
        <strong>{{ this.toIndex(index) }}、</strong>
        <span>{{ this.toType(typeProblem.type) }}题</span>
      </h4>
      <span class="del" @click="this.delete">删除</span>
    </div>
    <div class="score-list">
      <vuedraggable class="wrapper" v-model="typeProblem.data">
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
import { mapState ,mapMutations} from "vuex";
export default {
  name: "score",
  data() {
    return {
      typeArr: ["单选", "多选", "判断","填空" , "简答"],
      typeIndex: ["一", "二", "三", "四", "五"],
    };
  },
  created() {},
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
    ...mapMutations("tTest",["deleteTypeProblem"]),
    toType(key) {
      return this.typeArr[key - 1];
    },
    toIndex(key) {
      return this.typeIndex[key];
    },
    delete() {
      this.$confirm(`此操作将删除全部${this.typeArr[this.typeProblem.type - 1]}题, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.deleteTypeProblem(this.typeProblem.type)
        this.$message({
          type: 'success',
          message: '删除成功!'
          })
      })
      .catch(() => {})
    },
    end() {
      console.log(this.page.selectProblem);
    },
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
    .del:hover{
      color: #4498ee;
    }
  }
  &:hover {
    cursor: pointer;
    border-color: #4498ee;
  }
  .score-list {
    display: flex;
    padding: 0 5px;
    
    .wrapper {
      span {
        display: flex;
        flex-wrap: wrap;
        .drag-individual {
          width: 25px;
          height: 30px;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px 5px;
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