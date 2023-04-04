<template>
  <div class="fill">
    <div class="fill-content">
      <div class="fill-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span v-html="this.HTMLDecode(typeProblem.context)"></span>
      </div>
      <slot name="Fill">
        <div class="fill-option"></div>
      </slot>
    </div>
    <div
      class="fill-operate"
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
import { mapMutations, mapState } from 'vuex'
import { HTMLDecode } from '@/utils/htmlUtil'
export default {
  name: 'fill',
  data() {
     return {
      typeArr: ["单选", "多选", "判断","填空" , "简答"],
      typeIndex: ["一", "二", "三", "四", "五"],
    }
  },
  props: {
    index: {
      type: Number
    },
    typeProblem: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapMutations('tTest', ['addProblem', 'deleteProblem']),
    HTMLDecode,
    handleDelete() {
      this.$confirm(`此操作将删除${this.typeArr[this.typeProblem.type - 1]}题第${this.index + 1}题
      "${this.typeProblem.context.slice(0,10)}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // console.log(this.typeProblem.question_id)
        // console.log(this.page.selectProblem)
        let index = this.page.selectProblem.findIndex((item) => {
        // console.log(item.question_id === this.typeProblem.question_id)
        return item.question_id === this.typeProblem.question_id
      })
      // console.log(index)
      this.deleteProblem(index)
      this.$message({
        type: 'success',
        message: '删除成功!'
        })
      })
      .catch(() => {})
    }
  },
  computed: {
    ...mapState('tTest', ['page'])
  }
}
</script>

<style lang="less" scoped>
.fill {
  margin: 5px 25px 0 25px;
  min-height: 50px;
  position: relative;
  .fill-content {
    .fill-title {
      display: flex;
      align-items: baseline;

      
    }
  }

  .special {
    display: none !important;
  }
  .fill-operate {
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
  &:hover .fill-operate {
    display: flex;
  }
}
</style>