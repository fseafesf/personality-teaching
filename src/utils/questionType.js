export function questionType(type) {
  switch (type) {
    case 1:
      return '单选题'
    case 2:
      return '多选题'
    case 3:
      return '判断题'
    case 4:
      return '填空题'
    case 5:
      return '简答题'
    default:
      return '单选题'
  }
}