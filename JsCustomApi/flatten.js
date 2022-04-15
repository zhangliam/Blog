// 数组扁平化
var arr = [1, [2, [3, 4]]];

// 常规递归
function flatten(arr) {
  var result = []
  for(var i = 0, len = arr.length; i < len; i++) {
    if( Array.isArray(arr[i]) ) {
      result = result.concat( flatten(arr[i]) )
    } else {
      result.push(arr[i])
    }
  }
  return result
}

// reduce递归
function flatten(arr) {
  return arr.reduce( (prev, next) => {
    return prev.concat( Array.isArray(next) ? flatten(next) : next ) 
  }, [])
}

// es6拓展运算符
var arr = [1, [2, [3, 4]]];
console.log([].concat(...arr)); // [1, 2, [3, 4]] 但只能扁平一层

var arr = [1, [2, [3, 4]]];
// 借鉴思考实现
function flatten(arr) {
  while(arr.some( item => Array.isArray(item) )) {
    arr = [].concat(...arr)
  }

  return arr
}

console.log(flatten(arr))