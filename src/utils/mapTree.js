export const mapTree = (other, level2) => {
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
    mapTree(other, level3)
  }
}