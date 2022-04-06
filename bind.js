Function.prototype.bind = function(oThis) {

  if(typeof this !== 'function') {
    throw new TypeError('被绑定的对象需要是函数')
  }

  var self = this
  var args = [].slice.call(arguments, 1)
  var func = function() {}
  
  fBound = function() { 
  // instanceof用来检测某个实例对象的原型链上是否存在这个构造函数的prototype属性，this instanceof func === true时,说明返回的fBound被当做new的构造函数调用，此时this=fBound(){}，否则this = window, 如果是的话使用新创建的this代替硬绑定的this
    return self.apply(this instanceof func ? this : oThis, args.concat([].slice.call(arguments)))
  }

  //维护原型关系
  if(this.prototype) {
    func.prototype = this.prototype
  }

  //使fBound.prototype是func的实例，返回的fBound若作为new的构造函数，新对象的__proto__就是func的实例
  fBound.prototype = new func()
  return fBound
  
}