<template>
  <div class="card">
    <div class="card-type">
      <h3>
        <span>{{ index + 1 }}、</span>
        <span>{{ this.toType(typeProblem.type) }}</span>
        <span>（共</span>
        <span>{{typeProblem.data.length }}</span>
        <span>题，每题</span>
        <input 
        type="text" 
        class="el-input__inner" 
        style="width:70px;font-size: 18px; text-align: center;padding:0"
        v-model="score"
        maxlength="10"
        @change="this.changeScore"
        >
        <span> 分，共</span>
        <span>{{typeProblemTotalScore}}</span>
        <span>分）</span>
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
            ref="child"
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
import { mapMutations } from 'vuex';

export default {
  name: "card",
  data() {
    return {
      // value: 0,
      score: 0,
      currentView: "",
      typeArr: ["单选", "多选", "判断", "填空", "简答"],
      typeComponent: ["Radio", "Multi", "Judge", "Fill", "Answer"],
    };
  },
  created() {
    // this.typeProblemList = this.typeProblem.data
    // this.typeProblemList = this.typeProblemList.filter(key => key == question_id)
    // console.log("////////",this.typeProblemList);
    
    //阻止浏览器默认的拖放行为
    document.body.ondrop = (event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    this.currentView = this.typeComponent[this.typeProblem.type - 1];

    this.setTypeProblemScore()
    
    // this.$watch('score', this.handler)
  },
  methods: {
    ...mapMutations('tTest', ['setScore']),
    toType(key) {
      return this.typeArr[key - 1];
    },
    end() {
      console.log(this.typeProblem.data);
      console.log(this.page.selectProblem);
    },
    //设定每种题型的每小题分数
    setTypeProblemScore(){
      for(let i = 0; i < this.typeProblem.data.length; i++)
      {
        this.setScore({
          question_id: this.typeProblem.data[i].question_id,
          value: this.score
        })
        
      }
     
      // this.score = this.everyScore.get(this.typeProblem.question_id);
      this.$watch('score', this.handler)
    },

    changeScore(){
      this.setTypeProblemScore()
    },
    
    handler(newVal, oldVal) {
      if (newVal.trim() !== '') {
        for(let i = 0; i < this.typeProblem.data.length; i++)
        {
          this.setScore({
            question_id: this.typeProblem.data[i].question_id,
            value: this.score
          })
          console.log(this.everyScore.get(this.typeProblem.data[i].question_id))
          if(i == this.typeProblem.data.length - 1){
            console.log(this.$refs)
            
            
          }
        }
        console.log("监听到了",this.everyScore);
        console.log(3333);
        // this.changeTotalScore(this.TotalScore())
        // console.log(this.TotalScore())
      }
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
    ...mapState("tTest", ["page","everyScore"]),
    typeProblemTotalScore(){
      let totalScore = 0
      for(let item of this.everyScore){
        totalScore = item.value + totalScore 
      }
      // console.log("66666666",this.everyScore);
      
      return totalScore
    },
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