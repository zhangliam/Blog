// 数组去重
var ary = [1, 1, '1', '1']

// 在这个方法中，我们使用循环嵌套，最外层循环 array, 里面循环 res, 如果 array[i] 的值跟 res[j] 的值相等, 就跳出循环.
// 如果都不等于，说明元素是唯一的，这时候 j 的值就会等于 res 的长度，根据这个特点进行判断，将值添加进 res.
// 看起来很简单吧，之所以要讲一讲这个方法，是因为——————兼容性好！
function unique(array) {
  var res = []
  for(var i = 0, arylen = array.length; i < arylen; i++) {
    for(var j = 0, reslen = res.length; j < reslen; j++) {
      if(array[i] === res[j]) {
        break
      }
    }
    if(j === reslen) {
      res.push(array[i])
    }
  }

  return res
}

// indexOf
function unique(array) {
  var res = []
  for(var i = 0, len = array.length; i < len; i++) {
    var current = array[i]
    if(res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res
}


// 排序后去重
// 试想我们先将要去重的数组使用 sort 方法排序后
// 相同的值就会被排在一起，然后我们就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进res
function unique(array) {
  var seen
  var res = []
  // 对数组进行了 array.concat()操作之后，相当于复制出来一份原有的数组，且对复制出来的新数组的操作不会影响到原有数组，
  var sortedArray = array.concat().sort()

  for(var i = 0, len = sortedArray.length; i < len; i++) {  
    if(!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }
    seen = sortedArray[i]
  }
  return res
}
// 如果我们对一个已经排好序的数组去重，这种方法效率肯定高于使用 indexOf


// ES5 filter
function unique(array) {
  var res = array.filter( (item, index, array) => {
    // 当前数组目标索引等于遍历index
    return array.indexOf(item) === index
  })
  return res
}


// ES6 Set & Map
function unique(array) {
  return Array.from(new Set(array))
}
// 精简版
var unique = (ary) => [...new Set(ary)]





