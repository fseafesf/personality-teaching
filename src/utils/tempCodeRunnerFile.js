function buildTree(list) {
  const map = {}
  const roots = []

  list.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })

  list.forEach(item => {
    const parent = map[item.parentId]
    if (parent) {
      parent.children.push(map[item.id])
    } else {
      roots.push(map[item.id])
    }
  })

  return roots
}

const cityList = [
  { id: 1, parentId: 1, name: '江苏1' },
  { id: 2, parentId: 2, name: '江苏2' },
  { id: 3, parentId: 1, name: '江苏3' },
  { id: 4, parentId: 1, name: '江苏4' },
  { id: 5, parentId: 1, name: '江苏5' },
  { id: 6, parentId: 2, name: '江苏6' },
  { id: 7, parentId: 2, name: '江苏7' },
  { id: 8, parentId: 3, name: '江苏8' },
  { id: 9, parentId: 4, name: '江苏9' },
  { id: 10, parentId: 4, name: '江苏10' },
  { id: 11, parentId: 9, name: '江苏11' },
  { id: 12, parentId: 11, name: '江苏12' }
]

const tree = buildTree(cityList)
console.log(tree)