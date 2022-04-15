/*

  栈: 一种遵从后进先出(LIFO)原则的有序集合, 新添加或待删除的元素保存在栈末尾(称栈顶), 另一端叫栈底; 
  在栈里, 新元素靠近栈顶, 旧元素接近栈底

*/

function Stack() {

  var items = []

  this.push = (ele) => {
    items.push(ele)
  }

  this.pop = () => {
    return items.pop()
  }

  this.peek = () => {
    return items[items.lenght - 1]
  }

  this.isEmpty = () => {
    return items.length == 0
  }

  this.size = () => {
    return items.length
  }

  this.clear = () => {
    items = []
  }

  this.print = () => {
    console.log(items.toString())
  }

}


// 转换二进制
function devideBy2(decNumber) {
  
  let binaryString = ''
  let stack = new Stack()

  while(decNumber > 0) {
    var rem = Math.floor(decNumber % 2)
    stack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }

  while(!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }

  return binaryString

}







