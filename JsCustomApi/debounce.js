// https://github.com/mqyqingfeng/Blog/issues/22
/* 

  防抖: 
  频繁触发事件，但是一定在事件触发 n 秒后才执行，
  如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，
  总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行

*/
var count = 1
var container = document.getElementById('container')

// function getUserAction() {
//   console.log(this)
//   container.innerHTML = count++
// }

// 第一版
function debounce(fn, wait) {
  var timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}

// getUserAction中增加console.log(this), 不使用debounce时this指向container, 使用时this指向window

// 第二版 修正this指向
function debounce(fn, wait) {
  var timer
  return function() {
    var context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context)
    }, wait)
  }
}

// event对象: JS在处理函数中会提供事件对象Event
function getUserAction(e) {
  console.log(this)
  console.log(e)
  container.innerHTML = count++
}


// 第三版
function debounce(fn, wait) {
  var timer 
  return function() {
    var context = this
    var args = arguments

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}


// container.onmousemove = getUserAction
container.onmousemove = debounce(getUserAction, 1000)

//* 以上解决this指向, 以及Event对象面试题到此即可



// * 以下拓展underscore学习


// 立即执行: 
// 我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行

// 第四版
function debounce(fn, wait, immediate) {
  var timer 
  return function() {
    var context = this
    var args = arguments

    if(immediate) {
      // 如已执行过, 不再执行
      var callnow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if(callnow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    } 

  }
}


// * 返回值
// getUserAction 函数可能是有返回值的，所以我们也要返回函数的执行结果
// 当 immediate 为 false 的时候，因为使用了 setTimeout 
// 将 func.apply(context, args) 的返回值赋给变量，
// 最后return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。

// 第五版
function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
}


// * 取消debounce 函数
// 比如说我 debounce 的时间间隔是 10 秒钟
// immediate 为 true，这样的话，我只有等 10 秒后才能重新触发事件
// 现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行

// 第六版
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

// 实践

// var count = 1;
// var container = document.getElementById('container');

// function getUserAction(e) {
//     container.innerHTML = count++;
// };

// var setUseAction = debounce(getUserAction, 10000, true);

// container.onmousemove = setUseAction;

// document.getElementById("button").addEventListener('click', function(){
//     setUseAction.cancel();
// })









