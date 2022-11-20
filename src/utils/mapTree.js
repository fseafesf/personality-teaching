// export const mapTree = (other, level2) => {
//   const level3 = []
//   other.forEach(item => {
//     level2.forEach(item2 => {
//       if (item2.id === item.parent_knp_id) {
//         item2.children.push(item)
//         level3.push(item)
//       }
//     })
//   })

//   if (level3.length === 0) {
//     return
//   } else {
//     mapTree(other, level3)
//   }
// }

export const mapTree = (data) => {
  console.log('res', data)
  const level1 = []
  const other = []
  data.forEach(item => {
    // 获取一级知识点 （父id=自己）
    if (item.knp_id === item.parent_knp_id) {
      const newItem = {}
      newItem.id = item.knp_id
      newItem.label = item.name
      newItem.children = []
      level1.push(newItem)
    } else {
      // 获取非一级知识点 （父id不=自己）
      const newItem = {}
      newItem.id = item.knp_id
      newItem.label = item.name
      newItem.parent_knp_id = item.parent_knp_id
      newItem.children = []
      other.push(newItem)
    }
  })
  const level2 = []
  other.forEach(item => {
    level1.forEach(item1 => {
      if (item1.id === item.parent_knp_id) {
        item1.children.push(item)
        level2.push(item)
      }
    })
  })

  mapChildren(other, level2)

  // console.log('level1', level1)
  return level1
}

function mapChildren(other, level2) {
  const level3 = []
  other.forEach(item => {
    level2.forEach(item2 => {
      if (item2.id === item.parent_knp_id) {
        item2.children.push(item)
        level3.push(item)
      }
    })
  })

  if (level3.length === 0) {
    return
  } else {
    mapChildren(other, level3)
  }
}