export function toType(key) {
  switch (key) {
    case 0:
      return "全部";
    case 1:
      return "单选";
    case 2:
      return "多选";
    case 3:
      return "判断";
    case 4:
      return "填空";
    case 5:
      return "简答";
    default:
      break;
  }
}

export function toDifficult(key) {
  switch (key) {
    case 0:
      return "全部";
    case 1:
      return "简单";
    case 2:
      return "中等";
    case 3:
      return "困难";
    default:
      break;
  }
}

export function toSelect(key) {
  switch (key) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    default:
      break;
  }
}

export function transfromClass(arr) {
  let res = [];
  arr.forEach(element => {
    res.push({
      "class_id": element.class_id
    })
  });
  return res
}

export function transfromStudent(arr) {
  let res = [];
  arr.forEach(element => {
    res.push({
      "student_id": element.student_id
    })
  });
  return res
}

export function transfromStatus(key) {
  function statusClass(key){
    switch (key) {
      case -1:
        return "uncommitted"
      case 0:
        return "unfinished"
      case 1:
        return "uncorrected"
      case 2:
        return "finished"
      default:
        break;
    }
  }
  function statusText(key){
    switch (key) {
      case -1:
        return "未提交"
      case 0:
        return "未批改完"
      case 1:
        return "未批改"
      case 2:
        return "已完成"
      default:
        break;
    }
  }
  return {
    statusClass,
    statusText
  }
}