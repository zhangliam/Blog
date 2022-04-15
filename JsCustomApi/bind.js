/* 
  bind方法创建一个新函数. 当函数调用时, bind第一个参数将会作为它运行时的this, 之后的一序列参数将会在传递的实参前传入作为它的参数
  1. 返回一个参数
  2. 可以传入参数
*/

var foo = {
  value: 1,
}

function bar() {
  return this.value
}  

var bindFoo = bar.bind(foo)
bindFoo() // 1


// 第一版(return self.apply(context)，是考虑到绑定函数可能是有返回值的)
Function.prototype.bind2 = function(context) {
  var self = this
  return function() {
    return self.apply(context)
  }
}

// 传参的模拟实现
var foo = {
  value: 1,
}

function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}

var bindFoo = bar.bind(foo, 'daisy')
bindFoo('18')
// 1
// daisy
// 18

//第二版
Function.prototype.bind2 = function(context) {
  var self = this
  // 获取bind2第二个到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)

  return function() {
    // 这个arguments为bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(bindArgs))
  }
}


// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
// 大白话: 也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
var value = 2
var foo = { value: 1 }

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');
var obj = new bindFoo('18');
// undefined
// daisy
// 18

console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin

// 第三版
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = this.prototype;
    return fBound;
}

// 构造函数效果的优化实现
// 在这个写法中，我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：


// 第四版
Function.prototype.bind2 = function (context) {
  // 调用非function报错
  if(typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function() {}
  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

// tips
Object.create = function(o) {
    function f(){}
    f.prototype = o;
    return new f;
};

// fNOP.prototype = this.prototype;
// fbound.prototype = new fNOP();
// 等于fbound.prototype = Object.create(this.prototype);












