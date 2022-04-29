/*  高性能JavaScript  */ 


// ------ 快速响应的用户界面


// -- 使用定时器取代循环两个决定性因素:
//  1. 处理过程是否必须同步
//  2. 数据是否必须按顺序处理

function processArray(items, process, callback) {
  var todo = items.concat();

  setTimeout(function() {
    process(todo.shift())

    if(todo.length > 0) {
      setTimeout(arguments.callee, 25)
    } else {
      callback(items)
    }

  }, 25)
}


var items = [123, 888, 999, 111, 190];
function outValue(value) {
  console.log(value)
}

processArray(items, outValue, () => {
  console.log('Done')
})


// -- 记录代码运行时间(优化上面数组定时器)
// 假设数组项为1000, 每项处理为1ms, 且在每项处理产生25ms延迟那么总耗时为 (25+1) * 1000 = 26000ms
// 假设每批次处理50个, 每批25ms延迟则为 (1000/50) * 25 + 1000 = 1500ms
// 对比之下批量处理比单个要快, JS可以持续运行最长时间为100ms, 建议将这个数字减半为50ms以下以免不影响用户体验
// 通过原生new Date()来跟踪代码运行时间, 这是大多数JS分析工具的工作原理

function TimerProcessArray(items, process, callback) {
  var todo = items.concat();

  setTimeout(function() {
    var start = +new Date()

    do {
      process(todo.shift())
    } while (todo.length > 0 && (+new Date - start < 50))

    if(todo.length > 0) {
      setTimeout(arguments.callee, 25)
    } else {
      callback(items)
    }

  }, 25)
}



// -- 分割任务
// 如果一个函数运行时间太长, 试试拆分子任务, 将每个任务放入定时器中调用
// 使用此函数前提条件是任务可以异步处理不影响用户体验以及造成相关代码错误

function multistep(steps, args, callback) {
  var tasks = steps.concat()

  setTimeout(function() {
    var task = tasks.shift()
    task.apply(null, args || [])

    if(tasks.length > 0) {
      setTimeout(arguments.callee, 25)
    } else {
      callback()
    }
  }, 25)
}


function saveDocument(id) {
  var tasks = [openDocument, writeText, closeDocument, updateUI]

  multistep(tasks, [id], () => {
    alert('Save complete')
  })
} 



// -- Web Workers(独立重复定时器) => JS特性的子集, 每个web workers都有自己的全局运行环境

// 背景: 间隔1s及以上低频率重复定时器几乎不影响web应用响应速度, 这种情况远远超于UI线程产生瓶颈的值, 当多个定时器使用较高频率(100ms ~ 200ms)就会有影响了
// 组成: 
//  1. navigator对象: appName, appVersion, userAgent, platForm
//  2. location对象(只读)
//  3. self对象, 指向全局worker对象
//  4. importScripts()方法, 加载外部文件
//  5. ECMScript对象, eg: Object, Array, Date等
//  6. XMLHttpRequest
//  7. setTimeout & setInterval
//  8. close()方法, 立刻停止Worker运行

// 可能受益的任务如下: 
//  1. 编码/解码大字符串
//  2. 复杂数学运算
//  3. 大数组排序 



var worker = new Worker('jsonparser.js')

// 数据就位时, 调用事件处理器
worker.onmessage = function(event) {
  // JSON结构回传
  var jsonData = event.data
  // 使用JSON结构
  evaluateData(jsonData)

}

// 传入需解析JSON字符串
worker.postMessage(jsonText)


// jsonparser.js

// 当JSON数据存在时, 该事件处理器会被调用
self.onmessage = function(event) {
  // JSON字符串由event.data传入
  var jsonText = event.data
  // 解析
  var jsonData = JSON.parse(jsonText)
  // 回传结果
  self.postMessage(jsonData)

}



/*

  总结: JS和用户界面更新在同一个进程中进行, 因此一次只能处理一件事情; 这意味着JS代码运行时, 用户界面不能响应输入, 反之亦然;
  高效管理UI线程就是确保JS不能运行太长时间, 以免影响用户体验, 牢记以下几点: 
    1. 任何JS任务不得执行超过100ms, 过长时间将影响UI更细延迟
    2. 定时器可安排代码延迟执行, 它使得你可以把长时间运行脚本分解成一系列小任务
    3. Web Works是新版浏览器特性, 它允许你在UI线程外执行JS, 避免锁定UI线程

  Web应用越复杂, 积极主动管理UI线程就越重要, 即使JS代码重要, 也不应该影响用户体验
  
*/ 












