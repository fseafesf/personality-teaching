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