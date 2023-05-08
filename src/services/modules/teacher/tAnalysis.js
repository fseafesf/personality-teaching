import ptRequest from '../../request'

/**
 * 个人学情分析搜索学生
 * @param {*} search_text  学号或学生名
 * @returns 
 */
import axios from 'axios'
export const searchStudentAPI = ( search_text) => {
  return ptRequest.get({
    url: "/teacher/student/search",
    params: {
      search_text
    }
  })
}

// 递归函数，遍历知识点及其子知识点，并将对应的百分比值赋给 percentage 属性
function setPercentageForPoint(point, knpList) {
  const knp = knpList.find((k) => k.KnpID === point.id);
  if (knp) {
    point.percentage = Math.floor(parseFloat(knp.Knplevel) * 100);
  }
  if (point.children && point.children.length > 0) {
    point.children.forEach((child) => {
      setPercentageForPoint(child, knpList);
      if (child.children && child.children.length > 0) {
        child.children.forEach((grandchild) => setPercentageForPoint(grandchild, knpList));
      }
    });
  }
}

export function PointPercentageUpdate(context) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3000/data")
      .then((res) => {
        const knpList = res.data;
        const points = JSON.parse(JSON.stringify(context.state.tKnowledge.points));
        points.forEach((point) => setPercentageForPoint(point, knpList));
        console.log(points);
        context.commit("changePoints", points);
        resolve(points);
      })
      .catch((error) => {
        reject(error);
      });
  });
}









