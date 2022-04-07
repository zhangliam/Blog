/* call: call方法在使用一个指定this的值和若干指定参数前提下调用某个函数或方法 */

var foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.call(foo)

// 模拟实现第一步, 调用call时把foo对象改造成如下
var foo = {
  value: 1,
  bar() {
    console.log(this.value)
  }
}

foo.bar()

// 所以我们模拟的步骤可以分为：
// 将函数设为对象的属性 foo.fn = bar
// 执行该函数 foo.bar()
// 删除该函数 delete foo.fn

//第一版
Function.prototype.call2 = function(context) {
  context.fn = this
  context.fn()
  delete context.fn
}


// 完成不定参 & 不定参数组放进执行函数参数里

// 第二版
Function.prototype.call2 = function(context) {
  context.fn = this
  var args = []
  for(var i = 1; i < context.length; i++) {
    args.push('arguments[' + i + ']')
  }

  // eval(string)
  // string必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。
  // 该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。因此请不要为 eval() 函数传递 String 对象来作为参数。
  // 简单来说把eval理解为script标签作用

  // context.fn(arguments[1], arguments[2], ...);
  eval('context.fn('+ args +')')
  delete context.fn
}

// 完成函数返回值 & 参数可传null

// 第三版
Function.prototype.call2 = function(context) {
  var context = context || window

  context.fn = this
  var args = []
  for(var i = 1; i < context.length; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('context.fn('+ args +')')
  delete context.fn

  return result
}

// apply同理
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}



