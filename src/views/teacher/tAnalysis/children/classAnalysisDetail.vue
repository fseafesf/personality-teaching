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
    <div class="studentAnalysis" id="studentAna"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  name: 'classAnalysisDetail',
  props: ['className'],
  data() {
    return {
      keyword: '',
      source: [],
      searchResult: [],   
      stuAnaList: [
        {pointName: '数据结构', stuName: '魏羡', score: 85},
        {pointName: '数据结构', stuName: '蓝战', score: 95},
        {pointName: '数据结构', stuName: '左柚', score: 83},
        {pointName: '数据结构', stuName: '顾薇', score: 77},
        {pointName: '数据结构', stuName: '肖太阳', score: 100},
        {pointName: '数据结构', stuName: '王月亮', score: 95},
        {pointName: '数据结构', stuName: '张璐妮', score: 73},
      ]
    }
  },
  mounted() {
    this.classChartFn()
    this.studentChartFn()
  },
  computed: {
    ...mapState({
      tAnalysis: (state) => state.tAnalysis
    }),
    pointsData() {
      return this.tAnalysis.checkedPoints
    }
  },
  watch: {
    pointsData: {
      deep: true,
      handler() {
        this.getClassChartData()
        this.classChartFn()
        if (this.tAnalysis.checkedPoints.length == 0) {
          this.source = []
        }
      }
    },
    source: {
      deep: true,
      handler() {
        this.classChartFn()
      }
    }
  },
  methods: {
    // 重置
    resetFn() {
      this.keyword = ''
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
    },
    // 班级掌握情况
    classChartFn() {
      let classChart = echarts.getInstanceByDom(
        this.$refs.classChartRef
      )
      if (!classChart){
        classChart = echarts.init(document.getElementById('classAna'))
      }
      let classChartOption = {}
      if (this.source.length > 0) {
        classChartOption = {
          dataset: {
            source: this.source
          },
          grid: { containLabel: true },
          xAxis: {
            name: '知识点',
            type: 'category',
            axisLabel: {
              interval: 0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              rotate: 38 //调整数值改变倾斜的幅度（范围-90到90）
            }
          },
          yAxis: { name: '掌握情况' },
          visualMap: {
            orient: 'vertical',
            left: 'left',
            top: 'center',
            min: 0,
            max: 100,
            text: ['熟练', '不熟练'],
            dimension: 0,
            inRange: {
              color: ['#FD665F', '#FFCE34', '#65B581']
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                x: '知识点',
                y: '掌握情况'
              }
            }
          ]
        }
      } else {
        classChartOption = {
          title: {
            text: "请选择知识点查看班级学情分析",
            x: "center",
            y: "center",
            textStyle: {
              fontSize: 16,
              fontWeight: "normal"
            }
          }
        }
      }
      // 不进行合并
      classChart.setOption(classChartOption, true)
    },
    // 学生掌握情况
    studentChartFn() {
      const studentChart = echarts.init(document.getElementById('studentAna'))
      const knowledgePoint = [
        '知识点1',
        '知识点2',
        '知识点3',
        '知识点4',
        '知识点5',
        '知识点6',
        '知识点7',
        '知识点8'
      ]
      let student = []
      this.stuAnaList.forEach(stu => {
        student.push(stu.stuName)
      })
      const data = [
        [0, 0, 70],
        [0, 1, 80],
        [0, 2, 60],
        [0, 3, 50],
        [0, 4, 40],
        [0, 5, 30],
        [0, 6, 77],
        [0, 7, 87],
        [1, 0, 66],
        [1, 1, 77],
        [1, 2, 88],
        [1, 3, 55],
        [1, 4, 68],
        [1, 5, 79],
        [1, 6, 84],
        [1, 7, 82],
        [2, 0, 55],
        [2, 1, 89],
        [2, 2, 100],
        [2, 3, 85],
        [2, 4, 95],
        [2, 5, 77],
        [2, 6, 89],
        [2, 7, 100],
        [3, 0, 48],
        [3, 1, 75],
        [3, 2, 83],
        [3, 3, 84],
        [3, 4, 88],
        [3, 5, 65],
        [3, 6, 61],
        [3, 7, 62],
        [4, 0, 55],
        [4, 1, 48],
        [4, 2, 91],
        [4, 3, 93],
        [4, 4, 87],
        [4, 5, 81],
        [4, 6, 70],
        [4, 7, 60],
        [5, 0, 77],
        [5, 1, 23],
        [5, 2, 45],
        [5, 3, 67],
        [5, 4, 68],
        [5, 5, 79],
        [5, 6, 74],
        [5, 7, 88],
        [6, 0, 48],
        [6, 1, 75],
        [6, 2, 80],
        [6, 3, 93],
        [6, 4, 99],
        [6, 5, 93],
        [6, 6, 68],
        [6, 7, 69]
      ].map(function (item) {
        return [item[1], item[0], item[2] || '-']
      })
      const studentChartOption = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '90%',
          top: '5%'
        },
        xAxis: {
          type: 'category',
          data: knowledgePoint,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: student,
          splitArea: {
            show: true
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
            }
          }
        ],
        gradientColor: ['red', 'yellow', 'green']
      }
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
  height: 400px;
}
</style>