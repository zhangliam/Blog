// https://github.com/mqyqingfeng/Blog/issues/26

/*
  节流
  
  如果你持续触发事件，每隔一段时间，只执行一次事件。

  根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
  我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。

  关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

*/ 


// 1. 时间戳
// 当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )
// 如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

function throttle(fn, wait) { 
  var previous = 0
  return function() {
    var context = this
    var args = arguments
    
    // JavaScript中可以在某个元素前使用  '+'  号，这个操作是将该元素转换成Number类型，如果转换失败，那么将得到 NaN
    //+new Date() 将会调用 Date.prototype 上的 valueOf() 方法，根据MDN，Date.prototype.value方法等同于Date.prototype.getTime()
    var now = +new Date()

    if(now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}


// 2. 定时器
// 当触发事件的时候，我们设置一个定时器，再触发事件的时候
// 如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
function throttle(fn, wait) {
  var timers
  var previous = 0
  
  return function() {
    var context = this
    var args = arguments
    if(!timers) {
      timers = setTimeout(function() {
        timers = null
        fn.apply(context, args)
      }, wait)
    }
  }
}


/*

比较两个方法：

第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件

结合两者移入鼠标立刻执行, 停止触发再执行一次

*/ 

// 第三版
function throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}











