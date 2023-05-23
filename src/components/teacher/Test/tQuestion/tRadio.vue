<template>
  <div class="radio">
    <div class="radio-content">
      <div class="radio-title">
        <span> {{ index + 1 }}、</span>
        <span></span>
        <span v-html="this.HTMLDecode( typeProblem.context)"></span>
        <span>（</span>
        <span>{{this.everyScore.get(this.typeProblem.question_id)}}</span>
        <span>分）</span> 
      </div>
      <slot name="Radio">
        <div class="radio-option">
          <div
            class="option"
            v-for="(item, index) in typeProblem.question_option_list"
            :key="index"
          >
            <span> {{ toSelect(index) }}、</span>
            <span> {{ item.Context }}</span>
          </div>
        </div>
      </slot>
    </div>
    <div
      class="radio-operate"
      :class="[{ special: $route.name !== 'tPreview' }]"
    >
      <div class="set-parse">
        <span>
          <i class="el-icon-data-line"></i>
          解析
        </span>
      </div>
      <div class="set-score" @click="setRadioScore">
        <span>
          <i class="el-icon-s-data" ></i>
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
import { mapMutations, mapState , mapGetters } from 'vuex'
import { toSelect } from '@/utils/transfrom'
import { HTMLDecode } from '@/utils/htmlUtil'
export default {
  name: 'radio',
  data() {
     return {
      typeArr: ["单选", "多选", "判断","填空" , "简答"],
      typeIndex: ["一", "二", "三", "四", "五"],
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    typeProblem: {
      type: Object,
      default: () => ({})
    }
  },
  created(){
  },
  methods: {  
    ...mapMutations('tTest', ['addProblem', 'deleteProblem','setScore']),
    toSelect,
    HTMLDecode,
    //删除题目
    handleDelete() {
      this.$confirm(`此操作将删除${this.typeArr[this.typeProblem.type - 1]}题第${this.index + 1}题
      "${this.typeProblem.context.slice(0,10)}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        console.log("*/*/*/*",this.typeProblem.question_id)
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
    },
    //单独设定分数
    setRadioScore(){
      this.$prompt('请输入分数', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          this.$message({
            type: 'success',
            message: '此题分数为: ' + value
          });
          this.setScore({
            question_id: this.typeProblem.question_id,
            value: value
          })
          // this.$forceUpdate()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    }
  },
  computed: {
    ...mapState('tTest', ['page','everyScore']),
    ...mapGetters('tTest', []),
  },
}
</script>

<style lang="less" scoped>
.radio {
  margin: 5px 25px 0 25px;
  min-height: 100px;
  position: relative;
  .radio-content {
    min-height: 200px;
    .radio-title {
      min-height: 46px;
      display: flex;
      align-items: baseline;
      span {
        margin-right: 5px;
      }
    }
    .radio-option {
      display: flex;
      padding-right: 40px;
      flex-wrap: wrap;
      .option {
        width: 600px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .special {
    display: none !important;
  }
  .radio-operate {
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
  &:hover .radio-operate {
    display: flex;
  }
}
</style>