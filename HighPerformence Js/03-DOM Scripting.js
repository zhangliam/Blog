/*  高性能JavaScript  */ 


// ------ DOM编程


// DOM访问 & 修改

function innerHTMLLoop() {

  // 改写前
  // 每次循环迭代, 该元素被访问两次, 一次读取innerHTML属性值, 一次改写
  for(var i = 0; i < 5000; i++) {
    document.getElementById('here').innerHTML += 'a'
  }

  // 改写后
  // 局部变量存储修改内容, 循环结束一次性写入
  var content = ''
  for(var i = 0; i < 5000; i++) {
    content += 'a'
  }
  document.getElementById('here').innerHTML = content

  // 访问DOM次数越多, 代码运行速度越慢 => 减少DOM访问次数, 运算尽量留在ECMScript端处理

}


// innerHTMl & DOM => 新建一大段HTML, innerHTMl比DOM元素操作更快


// 访问集合元素时使用局部变量
// 对于任何类型DOM访问, 需要频繁访问同一个DOM属性或者方法时, 最好使用一个局部变量来缓存此成员
// 遍历一个集合时, 第一原则把集合存储在局部变量中, 并把其length缓存外部(读取DOM集合length比读取普通数组length要慢, 因为每次都会重新查询), 然后使用局部变量替代这些需多次读取的元素

function collectionGlobal() {

  // 较慢
  var coll = document.getElementsByTagName('div')
  var len = coll.length
  var name = ''
  for(var count = 0; count < len; count++) {
    name = document.getElementsByTagName('div')[count].nodeName
    name = document.getElementsByTagName('div')[count].nodeType
    name = document.getElementsByTagName('div')[count].tagName
  }
  return name

  // 较快
  var coll = document.getElementsByTagName('div')
  var len = coll.length
  var name = ''
  for(var count = 0; count < len; count++) {
    name = coll[count].nodeName
    name = coll[count].nodeType
    name = coll[count].tagName
  }
  return name

  // 最快
  var coll = document.getElementsByTagName('div')
  var len = coll.length
  var name = ''
  var el = null
  for(var count = 0; count < len; count++) {
    el = coll[count]
    name = el.nodeName
    name = el.nodeType
    name = el.tagName
  }
  return name

}

// children 替代 childNode更快, 因为集合项更少, HTML源码中的空白实际上是文本节点并且不包含在children集合中


/* 重绘 & 重排(repaints & reflows) */

// 重排何时发生
// 1. 添加或删除可见DOM元素
// 2. 元素位置改变
// 3. 元素尺寸改变(外边距, 内边距, 边框厚度, 宽高等)
// 4. 内容改变(文本, 图片被另一个不同尺寸图片替代)
// 5. 页面渲染器初始化
// 6. 浏览器窗口改变

// => 重排 & 重绘 代价非常昂贵, 提高程序响应速度策略减少此类操作发生, 为了减少发生次数, 需合并多次对DOM样式修改, 一次处理完毕


/* 渲染树变化的排队与刷新 */

// 由于每次重排都会产生计算消耗, 大多浏览器通过队列化修改并批量执行来优化重排过程, 然而可能会通过触发以下操作触发强制刷新队列要求任务立即执行
// offsetTop | Left | Width | Height
// scrollTop | Left | Width | Height
// clientTop | Left | Width | Height
// getComputedStyle(IE)
// 以上属性和方法需返回最新布局信息, 因此浏览器不得不执行渲染队列中"待处理"变化并触发重排返回正确的值
// 所以修改样式过程中, 避免使用上面属性, 他们都会刷新渲染队列



/* 批量修改DOM */
// 1. 使元素脱离文档流
//   - 隐藏元素, 应用修改, 重新显示
//   - 使用文档片断在当前DOM之外构建一个子树, 再拷贝回文档
//   - 将原始元素拷贝到一个脱离文档的节点中, 修改副本, 完成后替换原始元素
// 2. 对其应用多重改变
// 3. 把元素带回文档中



/* 缓存布局信息 */
// eg: element.style.left
// 对以上属性访问存储变量避免多次访问



/*

  总结: 访问和操作DOM是现代Web应用重要部分, 为了减少DOM编程带来的性能损失, 以下几点入手: 
  
  1. 最小化DOM访问次数, 尽可能JS端处理
  2. 如需多次访问DOM节点, 使用局部变量存储
  3. 小心处理HTML集合, 它实时联系底层文档, 集合长度缓存变量中, 如需频繁操作集合, 建议把它拷贝数组中
  4. 如果可能用速度更快API, 如querySelectAll
  5. 留意重绘与重排, 批量修改样式时, “离线”操作DOM树, 使用缓存, 较少访问布局信息次数
  6. 动画使用绝对定位, 使用拖放代理
  7. 事件委托减少事件处理器数量
  
*/ 












