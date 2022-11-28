<template>
  <div class="class">
    <h2>班级学情分析 -- 1班</h2>
    <div class="classAnalysis" id="classAna"></div>
    <div class="studentAnalysis" id="studentAna"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "classAnalysis",
  mounted() {
    this.classChartFn()
    this.studentChartFn()
  },
  methods: {
    // 班级掌握情况
    classChartFn() {
      const classChart = echarts.init(document.getElementById("classAna"));
      const classChartOption = {
        dataset: {
          source: [
            ["掌握情况", "知识点"],
            [19.3, "知识点1"],
            [57.1, "知识点2"],
            [74.4, "知识点3"],
            [50.1, "知识4"],
            [89.7, "知识5"],
            [60.0, "知识6"],
            [69.7, "知识7"],
            [99.7, "知识8"],
            [89.7, "知识9"],
          ],
        },
        grid: { containLabel: true },
        xAxis: { name: "知识点", type: "category" },
        yAxis: { name: "掌握情况" },
        visualMap: {
          orient: "vertical",
          left: "left",
          top: "center",
          min: 0,
          max: 100,
          text: ["熟练", "不熟练"],
          dimension: 0,
          inRange: {
            color: ["#FD665F", "#FFCE34", "#65B581"],
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              x: "知识点",
              y: "掌握情况",
            },
          },
        ],
      }
      classChart.setOption(classChartOption)
    },
    // 学生掌握情况
    studentChartFn() {
      const studentChart = echarts.init(document.getElementById("studentAna"));
      const knowledgePoint = [
          '知识点1', '知识点2', '知识点3', '知识点4', '知识点5', '知识点6', '知识点7',
          '知识点8', 
      ];
      const student = [
          '唐三', '李四', '王五',
          '赵六', '张七', '肖八', '冯九'
      ];
      const data = [[0, 0, 70], [0, 1, 80], [0, 2, 60], [0, 3, 50], [0, 4, 40], [0, 5, 30], [0, 6, 77], [0, 7, 87],
        [1, 0, 66], [1, 1, 77], [1, 2, 88], [1, 3, 55], [1, 4, 68], [1, 5, 79], [1, 6, 84], [1, 7, 82],
        [2, 0, 55], [2, 1, 89], [2, 2, 100], [2, 3, 85], [2, 4, 95], [2, 5, 77], [2, 6, 89], [2, 7, 100],
        [3, 0, 48], [3, 1, 75], [3, 2, 83], [3, 3, 84], [3, 4, 88], [3, 5, 65], [3, 6, 61], [3, 7, 62],
        [4, 0, 55], [4, 1, 48], [4, 2, 91], [4, 3, 93], [4, 4, 87], [4, 5, 81], [4, 6, 70], [4, 7, 60],
        [5, 0, 77], [5, 1, 23], [5, 2, 45], [5, 3, 67], [5, 4, 68], [5, 5, 79], [5, 6, 74], [5, 7, 88],
        [6, 0, 48], [6, 1, 75], [6, 2, 80], [6, 3, 93], [6, 4, 99], [6, 5, 93], [6, 6, 68], [6, 7, 69]]
          .map(function (item) {
          return [item[1], item[0], item[2] || '-'];
      });
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
          text: ["熟练", "不熟练"],
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
        gradientColor: ["red", "yellow", "green"]
      };
      studentChart.setOption(studentChartOption)
    }
  },
};
</script>

<style lang="less" scoped>
.class {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  h2 {
    height: 60px;
    line-height: 60px;
    padding-left: 14px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgb(222, 222, 222);
  }
  .classAnalysis {
    height: 400px;
  }
  .studentAnalysis {
    height: 400px;
  }
}
</style>