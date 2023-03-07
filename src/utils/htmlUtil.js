// 加密富文本添加知识点、添加题目上传内容给数据库的HTML标签 不然上传给会可能会与数据库、nginx的敏感字符冲突 造成503错误
export function HTMLEncode(html) {
  var temp = document.createElement('div')
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html)
  var output = temp.innerHTML
  temp = null
  return output
}

// 解密HTML加密的内容获取html 进行展示
export function HTMLDecode(text) {
  var temp = document.createElement('div')
  temp.innerHTML = text
  var output = temp.innerText || temp.textContent
  temp = null
  return output
}
