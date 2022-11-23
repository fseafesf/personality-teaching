<template>
  <div class="multi">
    <div class="multi-content">
      <div class="multi-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span>{{ typeProblem.context }}</span>
      </div>
      <div class="multi-option">
        <div
          class="option"
          v-for="(item, index) in typeProblem.question_option_list"
          :key="index"
        >
          <span> {{ toSelect(index) }}、</span>
          <span> {{ item.Context }}</span>
        </div>
      </div>
    </div>
    <div
      class="multi-operate"
      :class="[{ special: $route.name !== 'tPreview' }]"
    >
      <div class="set-parse">
        <span>
          <i class="el-icon-data-line"></i>
          解析
        </span>
      </div>
      <div class="set-score">
        <span>
          <i class="el-icon-s-data"></i>
          设定得分
        </span>
      </div>
      <div class="set-delete" @click="handleDelete">
        <span>
          <i class="el-icon-delete"></i>
          删除
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { toSelect } from "@/utils/transfrom";
export default {
  name: "multi",
  data() {
    return {};
  },
  props: {
    index: {
      type: Number,
    },
    typeProblem: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapMutations("tTest", ["addProblem", "deleteProblem"]),
    toSelect,
    handleDelete() {
      console.log(this.typeProblem.question_id);
      console.log(this.page.selectProblem);
      let index = this.page.selectProblem.findIndex((item) => {
        console.log(item.question_id === this.typeProblem.question_id);
        return item.question_id === this.typeProblem.question_id;
      });
      console.log(index);
      this.deleteProblem(index);
    },
   
  },
  computed: {
    ...mapState("tTest", ["page"]),
  },
};
</script>

<style lang="less" scoped>
.multi {
  margin: 5px 25px 0 25px;
  min-height: 100px;
  position: relative;
  .multi-content {
    .multi-title {
      height: 46px;
      span {
        margin-right: 5px;
      }
    }

    .multi-option {
      display: flex;
      padding-right: 40px;
      flex-wrap: wrap;
      .option{
        width: 600px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .special {
      display: none !important;
    }
  .multi-operate {
    position: absolute;
    top: -31px;
    right: -1px;
    display: flex;
    border: 1px solid #4498ee;
    display: none;
    div {
      padding: 0 10px 0 10px;
      min-width: 60px;
      height: 29px;
      border: 1px solid #4498ee;
      display: flex;
      align-items: center;
      span {
        padding: 5px 10px;
        font-size: 16px;
        color: #4498ee;
      }
      &:hover {
        background: #4498ee;
        span {
          color: #fff;
        }
      }
    }
  }
  &:hover .multi-operate {
    display: flex;
  }
}
</style>