<template>
  <div class="tree">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree v-if="treeData.length > 0" :data="treeData" ref="tree" node-key="id" default-expand-all>

          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="label">
              <span>{{ node.label }}</span>
            </div>
            <el-progress class="progressbar" v-if="data.percentage >= 90" :text-inside="true" :stroke-width="20"
    :percentage="data.percentage || 0" status="success"></el-progress>

  <el-progress class="progressbar" v-else-if="data.percentage >= 70" :text-inside="true" :stroke-width="20"
    :percentage="data.percentage || 0" status="success"></el-progress>

  <el-progress class="progressbar" v-else-if="data.percentage >= 60" :text-inside="true" :stroke-width="20"
    :percentage="data.percentage || 0" status="warning"></el-progress>

  <el-progress class="progressbar" v-else :text-inside="true" :stroke-width="20"
    :percentage="data.percentage || 0" status="exception"></el-progress>


          </span>

        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { searchStudentAPI, PointPercentageUpdate } from '@/services/modules/teacher/tAnalysis.js'
export default {
  data() {
    return {
      percentage: 90,
    
    }
  },
  props: ['studentInfo'],
  mounted() {
    this.$store.dispatch('PointListActive')
    PointPercentageUpdate(this.$store, this.studentInfo[0].student_id)
    //console.log(this.studentInfo[0].student_id);
  },
  computed: {
    ...mapState({
      tKnowledge: (state) => state.tKnowledge
    }),
    treeData() {
      const points = JSON.parse(JSON.stringify(this.tKnowledge.points))
      return points
    }
  },
  watch: {
     studentInfo: {
      deep: true,
      handler(newVal) {
        
        PointPercentageUpdate(this.$store, newVal[0].student_id)
        console.log('aaa');
      }
    },
  },
  methods: {
    
  }

}
</script>



<style lang="less" scoped>
.tree {
  height: 100%;

  .custom-tree-container {
    border-radius: 5px;

    .block {
      padding: 10px;
    }

    .custom-tree-node {
      display: flex;
      width: 100%;
      .progressbar {
        width: 260px;
        margin-left: 30px;
      }
    }
  }
}
</style>
