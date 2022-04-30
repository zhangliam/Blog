/*  高性能JavaScript  */ 


// ------ 数据存取


// 作用域链 & 标识符(Scope Chains & Identifier Resolution)
// [[scope]]包含一个函数被创建作用域中对象的集合, 这个集合称为函数作用域链, 作用域中每个对象称为一个可变对象你, key: value形式存储
// 当一个函数被创建后, 它的作用域链会被创建此函数的作用域中可访问的数据对象所填充
/*
  
  创建后类似如下结构: 

  add[[scope]] => [0][val](作用域链) => {
    this: window
    window: (object)
    document: (object)
    add: (function)
  }

*/

function add(num1, num2) {
  var sum = num1 + num2
  return sum
}



// 执行函数时会创建称为执行环境(execution context)内部对象, 一个执行环境定义了一个函数运行时环境, 函数每次执行都是独一无二的
// 所以多次调用同一个函数会导致创建多个执行环境, 当函数执行完毕时, 执行环境就被销毁

/*
  
  每个执行环境都有自己的作用域链用于解析标识符, 当执行环境创建时, 它的作用域链初始化为当前函数[[scope]]属性中对象复制到当前执行环境作用域链中
  这个过程完成即为执行环境创建了一个“活动对象(activation object)”, 其中包含所有局部变量, 命名参数, 参数集合以及this推入作用域链最前端
  当执行环境销毁, 活动对象也随之销毁


  标识符的搜索按照执行环境作用域链头部开始, 也就是当前运行函数的活动对象
  找到同名标识符即使用对应变量, 没有到话沿着作用域链寻找下一个对象找到为止，否则视为未定义
  每个标识符都会经历这个过程, 函数访问sum, num1, num2都会产生搜索过程, 这个过程影响性能


  在执行环境作用域中, 一个标识符所在位置越深, 它都读写速度也就越慢
  因此函数中读写局部变量最快, 全局变量通常是最慢的

*/ 

var total = add(1, 2)



// 遇到.操作符, 嵌套成员会导致JS引擎搜索所有对象成员, 执行location.href总比window.location.href要快
window.location.href 


// 缓存对象成员值(在同一个函数中没有必要多次读取同一个对象成员)

function hasEitherClass(element, className1, className2) {

  // 修改前
  return element.className == className1 || element.className == className2

  // 修改后
  var currentClassName = element.className
  return currentClassName == className1 || currentClassName == className2

}


/*

  总结: JS中数据存储位置会对代码整体性能产生影响, 数据存储分4种: 字面量, 变量, 数组项, 对象成员
  
  1. 访问字面量, 局部变量最快, 数组以及对象成员相对较慢
  2. 局部变量处于作用域链中起始位置, 访问局部变量比访问跨作用域变量更快, 变量作用域越深访问时间越长, 全局最慢
  3. with, try-catch中catch子句会改变执行环境作用域链
  4. 嵌套对象成员影响性能
  5. 属性或方法在原型链中位置越深, 访问速度越慢
  6. 通常来说可将常用对象成员, 数组元素, 跨域变量保存在局部变量中提升性能, 因为局部(作用域链顶端)访问速度更快

*/ 








