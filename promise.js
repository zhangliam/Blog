// Promise 
// https://juejin.cn/post/6860037916622913550
// https://github.com/YvetteLau/Blog/issues/2

// 三种状态
const PENDING = 'PENDING'  // 进行中
const FULFILLED = 'FULFILLED'  // 已成功
const REJECTED = 'REJECTED'  // 已失败

class Promise {

  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    // 成功态回调函数队列
    this.onFulfilledCallback = []
    // 失败态回调函数队列
    this.onRejectedCallback = []

    const resolve = value => {
      // 进行中状态才可改变
      if(this.status === PENDING) { 
        this.status = FULFILLED
        this.value = value
        // 成功态函数依次执行
        this.onFulfilledCallback.foreach( fn => fn(this.value) )
      }
    }

    const reject = reason => {
      // 进行中状态才可改变
      if(this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 失败态函数依次执行
        this.onRejectedCallback.foreach( fn => fn(this.reason) )
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }


  then(onFulfilled, onRejected) {
    // then是微任务, 使用setTimeou模拟
    setTimeout(() => {

      if(this.status === PENDING) {
        // 状态是PENDING下执行
        // 说明promise内部有异步代码执行，还未改变状态，添加到成功/失败回调任务队列即可
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }

      if(this.status === FULFILLED) {
        // FULFILLED状态下执行
        onFulfilled(this.value)
      }

      if(this.status === REJECTED) {
        //REJECTED状态下执行
        onRejected(this.value)
      }

    })
  }


  // 实现链式调用 - Promise的一大优势就是支持链式调用，具体来说就是then方法的具体实现，实际上是返回了一个Promise，需要注意的几个点：
  
  // 1. 保存之前promise实例的引用，即保存this
  // 2. 根据then回调函数执行的返回值

  // ~如果是promise实例，那么返回的下一个promise实例会等待这个promise状态发生变化
  // ~如果不是promise实例，根据目前情况直接执行resolve或reject


  // 第二版then
  then(onFulfilled, onRejected) {
    // 保存this
    let _self = this
    return new Promise( (resolve, reject) => {

      // PENDING
      if(this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(_self.value)
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise ? result.then(resolve, reject) : resolve(result)
            })
          } catch(e) {
            reject(e)
          }
        })
        this.onRejectedCallback.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(_self.reason)
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise ? result.then(resolve, reject) : reject(result)
            })
          } catch(e) {
            reject(e)
          }
        })
      }

      // FULFILLED
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          } catch(e) {
            reject(e)
          }
        })
      }

       // REJECTED
      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason)
            result instanceof Promise ? result.then(resolve, reject) : reject(result)
          } catch(e) {
            reject(e)
          }
        })
      }

    })
  }


}













