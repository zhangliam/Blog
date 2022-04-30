/*  高性能JavaScript  */ 


// ------ 工具


// 性能分析 - 在脚本运行期间定时执行各种函数和操作, 找出优化部分
// 网络分析 - 检查图片, 样式表, 和脚本加载过程, 以及它们对页面整体加载和渲染的影响


// 纯JS计时器脚本

var Timer = {
  _data: {},

  start(key) {
    this._data[key] = new Date()
  },

  stop(key) {
    var time = this._data[key]
    if(time) {
      this._data[key] = new Date() - time
    }
  },

  getTime(key) {
    return this._data[key]
  },
}


var element, count = 1000

Timer.start('createElement')

for(var i = 0; i < count; i++) {
  element = document.createElement('div')
}

Timer.stop('createElement')

console.log(`created ${ count } in ${ Timer.getTime('createElement') }`)



// YUI Profiler
// JS 编写的JS性能分析工具, 除了计时功能, 还提供针对函数, 对象, 构造器性能分析接口
Y.Profiler.start('createElement')
Y.Profiler.stop('createElement')
Y.Profiler.getAverage('createElement')

// 函数注册性能分析
Y.Profiler.registerFunction('initUI')
// 对象注册性能分析
Y.Profiler.registerFunction('uiTest', uiTest)
// 构造函数性能分析
Y.Profiler.registerConstructor('myWidget', myNameSpace)

// 数据报告
Y.Profiler.getFullReport( data => {
  // 过滤callback
  return (data.call > 0 && data.avg > 5)
})


/*
  
  总结: 
    1. 使用网络分析工具找出加载脚本&页面其他资源的瓶颈, 帮助你决定哪些脚本需延迟执行(Fiddle, chrome performance)
    2. 尽量减少HTTP请求数, 脚本延迟加载可以加快页面渲染速度, 提高用户体验
    3. 使用性能分析工具找出脚本运行低效地方, 检查函数调用时间以及次数
  
*/ 
