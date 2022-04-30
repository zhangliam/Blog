/*  高性能JavaScript  */ 


// ------ 加载和执行

//1. 脚本位置: head中放入脚本阻塞页面渲染 - 尽可能放在页面底部

//2. 组织脚本: 减少页面外链脚本文件数量(HTTP角度看下载一个100KB文件比4个25KB文件快) - 文件合并

//3. 延迟脚本: defer属性(本元素包含的脚本不包含对dom操作, 可安全的延迟执行, 不阻塞浏览器进程可并行下载) - DOM加载完成后, window.onload事件触发前调用

//4. 动态脚本: 文档对象模型(DOM)存在, JS可动态创建HTML所有内容, 此举在于无论何时启动, 文件下载和执行过程不会阻塞页面其他进程

// 封装动态加载JS文件
function loadScript(url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'

  if(script.readyState) { //IE
    script.readyStatechange = () => {
      if(script.readyState === 'loaded' || script.readyState === 'complete') {
        script.readyStatechange = null
        callback()
      }
    }
  } else { // 其他浏览器
    script.onload = () => {
      callback()
    }
  }

  script.src = url
  document.getElementByTagName('head')[0].appendChild(script)
}

// 5. XMLHttpRequest脚本注入: 创建一个XHR对象, 用它来下载JS文件, 最后通过动态创建script标签元素注入页面中

var xhr = new XMLHttpRequest()
xhr.open('get', 'file1.js', true)
xhr.onreadystatechange = () => {
  if(xhr.readyState === 4) {
    // 200表有效相应 304从缓存读取
    if(xhr.state >= 200 && xhr.state < 300 || xhr.state == 304) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = xhr.responseText
      document.body.appendChild(script)
    }
  }
}
xhr.send(null)

// 优: 下载但不立即执行 & 主流浏览器皆可支持
// 缺: 同源策略


// 推荐无阻塞模式
// 1. 先添加动态加载所需代码
// 2. 加载初始化页面所需剩余代码

// 直接把loadScript函数嵌入页面, 从而避免多产生一次HTTP请求
// <script>

  function loadScript(url, callback) {
    //...
  }

  loadScript('the.rest.js', () => {
    Application.init()
  })

// </script>



// 如使用推荐无阻塞模式, 推荐yahoo LazyLoad类库
LazyLoad.js(['first-file.js', 'the-rest.js'], () => {
  Application.init()
})



/*

  总结: 代码执行过程中会影响浏览器其他进程(比如用户界面绘制), 遇script标签页面必须停下来等待代码下载并执行等. 以下几条减少JS对性能的影响
  
  1. body闭合前所有脚本放置页面底部, 确保脚本执行前页已完成渲染
  2. 合并脚本, 外链越少加载越快 
  3. 多种无阻塞下载JS方法
    - defer属性
    - 动态创建script元素来下载并执行
    - XML对象下载js代码注入页面

*/ 






