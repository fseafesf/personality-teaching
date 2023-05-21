<template>
  <div>
    <div class="inputBar">
      <el-autocomplete
        class="inputBox"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="请输入要查找的知识点"
        :trigger-on-focus="false"
        value-key = "label"
        @select="handleSelect"
      >
      </el-autocomplete>
      <el-button type="primary" @click="resetFn">重置</el-button>
    </div>
    <!-- className可以从路由中获取 router.js -->
    <div class="top">
      <h2>{{ className }} -- 学情分析</h2>
      <el-button type="primary" plain class="delBtn" @click="clearChartFn">清空班级统计图数据</el-button>
    </div>
    <div class="classEchart">
      <div class="classAnalysis" id="classAna" ref="classChartRef"></div>
    </div>
    <div id="tableContainer">
      <div class="studentAnalysis" id="studentAna" ref="studentChartRef"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
import Vue from 'vue';
import { getStuListAPI, getClassStudyDetailAPI, getTeacherInfoAPI, getAllStudentsScoresAPI } from '@/services/modules/teacher/tClass.js'
import { login } from '@/services/modules/common/home';
export default {
  name: 'classAnalysisDetail',
  props: ['className'],
  data() {
    return {
      keyword: '',
      source: [], 
      newSource: [['掌握情况', '知识点']],
      searchResult: [],
      stuAnaList: [],
      knowledgePoint: [],   //当前选中的所有知识点
      teacher_id: ' ',
      classScores: [],   //所有班级的所有知识点分数
      selectedScores: [],        //当前班级选中的知识点分数
      allStudentsScores: []     //当前班级所有学生所有知识点分数
    }
  },

  async mounted() {
    this.fetchStuList(this.classId)
    this.classChartFn();
    const result = await getTeacherInfoAPI();
    this.teacher_id = result.data.teacher_id;
    await getClassStudyDetailAPI(this.teacher_id).then(result => {
      this.classScores = result.data
    })
    
  },

  computed: {
    ...mapState({
      tAnalysis: (state) => state.tAnalysis
    }),
    pointsData() {
      return this.tAnalysis.checkedPoints
    },
    classId() {
      return this.$route.query.id
    },
  },
  watch: {
    pointsData: {
      deep: true,
      handler() {
        if (this.tAnalysis.checkedPoints.length == 0) {
          this.source = []
        }
        this.getClassChartData()
        this.classChartFn()
      
      }
    },
   source: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.knowledgePoint = newVal.map(item => item[1]);
          this.knowledgePoint.shift(); // 删掉第一个元素(知识点)
        }
        //scores保存当前班级所选知识点的分数
       let knpNames = this.source.slice(1).map(x => x[1])
        let scores = {};
        for (let knpName of knpNames) {
          let knpObj = this.classScores.find(x => x.KnpName === knpName);
          scores[knpName] = knpObj ? knpObj.Class_id[this.className] : null;
        }
        this.updateSourceWithScores(scores)
        this.classChartFn()

        //保存当前班级所有选中的知识点的学生分数
        const matchingObjs = []
        this.knowledgePoint.forEach(knpName => {
          const matchingObj = this.allStudentsScores.find(obj => obj.KnpName === knpName);
          matchingObjs.push(matchingObj)
        })
        
        // console.log(matchingObjs);
        this.studentChartFn(matchingObjs)
      }
    },
  
    classId: {
      deep: true,
      immediate: true,
      async handler(newVal) {
        if (newVal && this.source.map(item => item[1]).length != 0) {
          await this.fetchStuList(newVal);
        }
       await getAllStudentsScoresAPI(this.classId).then(res => {
          this.allStudentsScores = res.data;
       });
        //触发source更新使得切换班级后表格自动更新
        this.$set(this, 'source', this.source.slice());
      }
    }


  },
  methods: {
    // 重置
    resetFn() {
      this.keyword = ''
    },
   async fetchStuList(classId) {
     await getStuListAPI(classId, { page_num: 1, page_size: 10 }).then((res) => {
        this.stuAnaList = res.data.map((item) => ({
          studentId:item.student_id,
          stuName: item.name,
        }));
      });
      //this.studentChartFn(this.stuAnaList)
    },

    // 查找知识点
    querySearch(queryString, cb) {
      this.searchResult = this.tAnalysis.pointsList.filter(point => {
        return point.label.indexOf(this.keyword) !== -1
      })
      cb(this.searchResult)
    },
    handleSelect(item) {
      this.tAnalysis.checkedPoints.push(item)
      this.tAnalysis.selectedId = item.id
      this.keyword = ""


    },
    //更新班级选中知识点的分数
    updateSourceWithScores( scores) {
   
      const newSource = [['掌握情况', '知识点']];
       for (let key in scores) {
        newSource.push([scores[key]*100, key]);
      }

      this.newSource = newSource
      
    },
     // 添加数据到班级统计表中
    getClassChartData() {
       let classChartData = [['掌握情况', '知识点']]
      let score = 0
      this.pointsData.forEach((point) => {
        let classData = []
        score = Math.floor(Math.random() * 50 + 50)
        classData.push(score, point.label)
        classChartData.push(classData)
        this.source = classChartData
      })
      this.source=classChartData
    },

    // 班级掌握情况
    classChartFn() {
      let classChart = echarts.getInstanceByDom(
        this.$refs.classChartRef
      )
      if (!classChart) {
        classChart = echarts.init(document.getElementById('classAna'))
      }
      let classChartOption = {}
      if (this.source.length > 0) {
         classChartOption = {
          dataset: {
            source: this.newSource,
          },
          grid: { containLabel: true },
          xAxis: {
            name: '知识点',
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 20,
            },
          },
          yAxis: {
            name: '掌握情况',
            min: 0,
            max: 100,
            axisLabel: {
              interval: 25,
            },
          },
          visualMap: {
            orient: 'vertical',
            left: 'left',
            top: 'center',
            min: 0,
            max: 100,
            text: ['熟练', '不熟练'],
            dimension: 0,
            inRange: {
              color: ['#FD665F', '#FFCE34', '#65B581'],
            },
          },
          series: [
            {
              type: 'bar',
              encode: {
                x: '知识点',
                y: '掌握情况',
              },
            },
          ],
        };
      } else {
        classChartOption = {
          title: {
            text: '请选择知识点查看班级学情分析',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
        };
      }
      classChart.clear() // 清除旧的数据
      classChart.setOption(classChartOption, true)
    },

    studentChartFn(matchingObjs) {
      const tableContainer = document.getElementById('tableContainer')
      const tableHeight = 900 // 固定容器高度
      const rowCount = this.stuAnaList.length // 获取行数，即学生人数
      const tableHeightWithPadding = tableHeight - rowCount * 30 // 假设每个单元格高度为30px，减去所有单元格高度，得到表格的高度
     
      let studentChart = echarts.getInstanceByDom(
        this.$refs.studentChartRef
      )
      if (!studentChart) {
        studentChart= echarts.init(document.getElementById('studentAna'))
      }
      let student = []
      this.stuAnaList.forEach(stu => {
        student.push(stu.stuName)
      })

      const knowledgePoints = this.knowledgePoint
      const data = [];
      for (var i = 0; i < this.stuAnaList.length; i++) {
        for (var j = 0; j < this.knowledgePoint.length; j++) {
          //console.log(matchingObjs[j].Studentname);
          data.push([j, i, 100 * (matchingObjs[j]?.Studentname?.[this.stuAnaList[i].studentId] || 0).toFixed(2)]);

        }
      }
     // console.log(data);
      let studentChartOption={}
      if (data.length > 0) {
       studentChartOption = {
          tooltip: {
            position: 'top'
          },
          grid: {
            height: `${tableHeightWithPadding}px`,
            top: '1%',
            right: '10%',
          },
          xAxis: {
            type: 'category',
            data: knowledgePoints,
            axisLabel: {
              interval: 0,
              rotate: 20,
              fontSize: 12,
              priority: 1, // 设置高优先级
            },
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: student,
            splitArea: {
              show: true
            },
            axisLabel: {
              interval: 0,
            }
          },
          visualMap: {
            min: 0,
            max: 100,
            text: ['熟练', '不熟练'],
            calculable: true,
            orient: 'vertical',
            left: 'left',
            top: 'center'
          },
          series: [
            {
              name: 'Punch Card',
              type: 'heatmap',
              data: data,
              label: {
                show: true
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              itemStyle: {
                borderWidth: 1,
                borderColor: '#ccc'
              }
            }
          ],
          gradientColor: ['red', 'yellow', 'green']
        }
     } else {
        studentChartOption = {
          title: {
            text: '请选择知识点查看班级学情分析',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
            },
          },
        };
      }
      studentChart.clear() // 清除旧的数据

      studentChart.setOption(studentChartOption)
    },


    // 清空班级统计图数据
    clearChartFn() {
      this.source = []
      this.tAnalysis.isResetChecked = true
    },
  }
}
</script>

<style lang="less" scoped>

.inputBox {
  width: 240px;
  margin: 20px 10px 20px 0;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(222, 222, 222);
  margin-bottom: 8px;
  h2 {
    height: 60px;
    line-height: 60px;
    padding-left: 14px;
  }
}

.classAnalysis {
  min-height: 600px;
}
.studentAnalysis {
  z-index: 99;
  position: relative;
  min-height: 1000px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.studentAnalysis td {
  flex-grow: 1;
  flex-basis: 0;
}

#tableContainer{
   height: 1200px; /* 您希望的表格高度值 */
}
</style>