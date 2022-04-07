// 防抖
function ajax(content) {
  console.log('ajax request ' + content)
}

function debounce(fun, delay) { //利用闭包将timer存在自己得作用域（简单的讲闭包就是在函数里面定义的函数）
  let timer = null;
  return function () {
    if(timer) clearTimeout(timer)
    timer = setTimeout( () => {
        fun.call(this, arguments)
    }, delay)
  }
}
  
let input2 = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 3000) //此处很重要！需要引用才会生成闭包，不然timer就会被垃圾回收掉导致之前的请求依然会发送不会被清除

input2.addEventListener('keyup', function (e) {
  debounceAjax(e.target.value) //如果写成debounce()(ajax, 3000)这样，就不会产生引用 不会生成闭包
})


// 截流
function throttle(func, wait) {
  let timeout;
  return function() {
    if (!timeout) {
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(this, arguments)
        }, wait)
    }
  }
}
