/* this & call apply */


// this: JS中的this总指向一个对象, 具体指向由运行时函数的执行环境动态绑定, 而非声明环境
// 1. 作为对象使用
// ...

// 2. 普通函数调用
// ...

// 3. 构造器使用

// *tips: new 调用构造器时，如果构造器显式的返回object类型对象, this将失效
var MyClass = function() {
  this.name = 'sven'
  return {
    name: 'anne'
  }
}

var obj = new MyClass()
console.log(obj) // anne

// 如果不显式返回任何数据, 或者返回非对象类型数据, 则不会有以上问题
var MyClass = function() {
  this.name = 'sven'
  return 'anne'
}

var obj = new MyClass()
console.log(obj) // sven
// Function.prototype.call/apply


// --- 丢失的this

// 报错
// document.getElementById 方法需要用到this, this原指向document
// 以下调用则为普通函数调用, this指向window
var getId = document.getElementById
getId('start-of-content')


// 修正
document.getElementById = (function(func) {
  return function() {
    return func.apply(document, arguments)
  }
})(document.getElementById)

var getId = document.getElementById
getId('start-of-content')


/*

  高阶函数: 
  1. 函数可以作为参数传递
  2. 函数可以作为返回值输出  

*/

// AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来
// 无关的功能包括: 日志统计, 安全控制, 异常处理等, 抽离出来之后, 动态织入方式掺入业务逻辑模块中, 保持业务逻辑模块高内聚性和纯净.

Function.prototype.before = function(beforefn) {
  var __self = this  // 保存原函数引用
  return function() {  // 返回包含原函数&新函数的"代理"函数
    beforefn.apply(this, arguments)  // 执行新函数, 修正this
    return __self.apply(this, arguments) // 执行原函数
  }
}

Function.prototype.after = function(afterfn) {
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}


var func = function() {
  console.log(2)
}

func = func.before(() => {
  console.log(1)
}).after(() => {
  console.log(3)
})

func()



/*

  currying(函数柯里化)
  部分求值, 一个currying函数首先会接受一些参数, 接受之后不会立即求值, 而是返回形成有闭包引用的函数, 待需真正求值则返回 

*/

var currying = function(fn) {
  var args = []

  return function() {
    if(arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      [].push.apply(args, arguments)
      return arguments.callee
    }
  }
}

var cost = (function() {
  var money = 0

  return function() {
    for(var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i]
    }
    return money
  }
})()

var curryingCost = currying(cost)

curryingCost(100)
curryingCost(200)
curryingCost(300)
curryingCost()



/*

  uncurrying: 提取泛化this

*/

Function.prototype.uncurrying = function() {
  var __self = this
  return function() {
    var obj = Array.prototype.shift.call(arguments)
    return __self.apply(obj, arguments)
  }
}


var _push = Array.prototype.push.uncurrying()

(function() {
  _push(arguments, 4)
  console.log([...arguments])
})(1, 2, 3)



// 另一种uncurrying方式
Function.prototype.uncurrying = function() {
  var __self = this
  return function() {
    return Function.prototype.call.apply(__self, arguments)
  }
}




/*

  分时函数(Duff's Device应用)
  创建节点工作分批进行, 比如一秒创建1000个节点, 改为8个节点/200ms
  tips: 如代码逻辑非同步|非按序 => 运用setInterval队列不影响主线程运行

*/

var timeChunk = function(ary, fn, count) {
  var obj, timer
  var start = function() {
    for(var i = 0, len = ary.length; i < Math.min(count | 1, len); i++) {
      var obj = ary.shift()
      fn(obj)
    }
  }
  
  return () => {
    timer = setInterval( () => {
      if(ary.length === 0) {  // 节点全部创建好
        return clearInterval(timer)
      }
      start()
    }, 200)  // 分批执行的间隔时间, 也可以参数形式传入
  } 
}


var ary = []
for(var i = 0; i <= 1000; i++) {
  ary.push(i)
}

var renderFriendList = timeChunk(ary, n => {
  var div = document.createElement('div')
  div.innerHTML = n
  document.body.appendChild(div)
}, 8)


renderFriendList()









