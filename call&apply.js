/* call: call方法在使用一个指定this的值和若干指定参数前提下调用某个函数或方法 */

var foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.call(foo)

// 模拟实现第一步, 调用call时把foo对象改造成如下
var foo = {
  value: 1,
  bar() {
    console.log(this.value)
  }
}

foo.bar()

// 所以我们模拟的步骤可以分为：
// 将函数设为对象的属性 foo.fn = bar
// 执行该函数 foo.bar()
// 删除该函数 delete foo.fn

//第一版
Function.prototype.call2 = function(context) {
  context.fn = this
  context.fn()
  delete context.fn
}




