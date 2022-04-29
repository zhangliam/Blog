/*  高性能JavaScript  */ 


// ------ 算法 & 流程控制

// 限制迭代次数 - Duff's Device(达夫设备模式)

/* 
  从速度上说，由于采用了 "循环展开" 技巧，使所需处理的分支数减少，从而降低了在处理分支时，中断与刷新流水线的巨大运算开销，因而相较于简单、直接的循环代码，这段代码的执行效率较高。另外，由代码易知，若不带switch语句，则这段代码只能复制8*n个数据项，而若count无法为8整除，则仍有count%8（即count除于8的余数）项未处理；有鉴于此，此间嵌入了switch/case语句，负责处理剩余数据。
*/

var iterations = Math.floor(items.length / 8)  
var startAt = items.length % 8 
var i = 0

do {
  switch(startAt) {
    case 0: process(items[i++]);
    case 7: process(items[i++]);
    case 6: process(items[i++]);
    case 5: process(items[i++]);
    case 4: process(items[i++]);
    case 3: process(items[i++]);
    case 2: process(items[i++]);
    case 1: process(items[i++]);
  }
  startAt = 0
} while (--iterations)


/*  
  但是，达夫设备亦有其局限性。在某些环境下，利用switch/case语句处理剩余数据项，有时并非最优选择；相对应的，若采用双循环机制可能反倒更快（实现一个展开后的循环复制8*n个数据项，和另一循环复制剩余数据项）。究其肇因，则常是由于编译器无法针对达夫设备进行优化，但亦可能是因某些架构的流水线与分支预测机制有所差异[2]。除此以外，据测试看，当从XFree86 Server 4.0代码中清理掉所有达夫设备代码后，执行性能却大幅提升[3]。因此，若打算使用达夫设备，最好先针对所用的硬件架构、优化等级和编译器对达夫设备进行基准测试，而后再做定夺。
*/

// Duff's Device(达夫设备模式) - 优化双循环 => 取消switch语句, 将余数和主循环分开

var i = items.length % 8 
while(i--) {
  process(items[i--])
}

i = Math.floor(items.length / 8) 
while(i) {
  process(items[i--])
  process(items[i--])
  process(items[i--])
  process(items[i--])
  process(items[i--])
  process(items[i--])
  process(items[i--])
  process(items[i--])
} 



// 递归模式(合并排序) & 阶乘缓存值, 避免重复运算
function memfactorial(n) {
  if(!memfactorial.cache) {
    memfactorial.cache = {
      '0': 1,
      '1': 1
    }
  }

  if(!memfactorial.cache.hasOwnProperty(n)) {
    memfactorial.cache[n] = n * memfactorial * (n - 1)
  }

  return memfactorial.cache[n]
}


// 一、编译型
// 编译型语言：编译型语言在执行之前要先经过编译过程, 编译成为一个可执行的机器语言的文件, 比如exe.因为翻译只做一遍, 以后都不需要翻译, 所以执行效率高.
// 编译型语言的典型代表：C语言, C++.
// 编译型语言的优缺点：执行效率高, 缺点是跨平台能力弱, 不便调试.

// 二、解释型
// 解释型语言：解释性语言编写的程序不进行预先编译, 以文本方式存储程序代码.执行时才翻译执行.程序每执行一次就要翻译一遍.
// 代表语言：python, JavaScript.
// 优缺点：跨平台能力强, 易于调, 执行速度慢.


/*
  总结: JS和其他编程语言一样, 代码的写法&算法会影响运行时间. 由于JS是解释性语言可用资源有限, 因此优化技术更为重要
  
  1. for, while & do while循环性能相当, 避免使用for in, 除非需要遍历属性未知的对象 
  2. 改善循环性能的最佳方法是减少每次迭代的运算量和迭代次数
  3. 通常来说switch比if else快
  4. 判断条件多时, 使用查找表(逻辑映射)比if-else & switch快
    - switch语句采用branch table(分支表)索引来优化, 另外switch语句比较值使用全等操作符, 不会发生类型转换损耗
  5. 浏览器的调用栈大小限制递归算法在JS中应用, 栈溢出错误会导致其他代码中断运行
  6. 如遇栈溢出错误, 可将方法改为迭代算法, 或使用Memoization避免重复计算
  运行的代码数量越大, 这些策略带来性能提升越明显
*/ 











