// 将多选题、填空题答案数组转成字符串的方法 "填空1+填空2"
export const arr2string = (arr) => {
  let res = ''
  for (let i = 0; i < arr.length; i++) {
    i === 0 ? (res = res + arr[i]) : (res = res + '+' + arr[i])
  }
  return res
}
