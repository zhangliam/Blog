// 浅拷贝slice & concat不作赘述. 深拷贝JSON.stringify简单粗暴但不能拷贝函数
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
var new_arr = JSON.parse( JSON.stringify(arr) );

console.log(new_arr);


// 浅拷贝实现
var shallowCopy = function(obj) {
  // 只拷贝对象
  if(typeof obj !== 'object') return
  // 根据obj的类型判断是新建一个数组还是对象
  var newobj = obj instanceof Array ? [] : {}
  // 遍历obj，并且判断是obj的属性才拷贝
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      newobj[key] = obj[key]
    }
  }  
  return newobj
}

// 深拷贝的实现
// 我们在拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数就就可以了
var deepCopy = function(obj) {
  if(typeof obj !== 'object') return
  var newobj = obj instanceof Array ? [] : {}
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      newobj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }

  return newobj
}