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

  // 第一版then
  // then(onFulfilled, onRejected) {
  //   // then是微任务, 使用setTimeou模拟
  //   setTimeout(() => {

  //     if(this.status === PENDING) {
  //       // 状态是PENDING下执行
  //       // 说明promise内部有异步代码执行，还未改变状态，添加到成功/失败回调任务队列即可
  //       this.onFulfilledCallback.push(onFulfilled)
  //       this.onRejectedCallback.push(onRejected)
  //     }

  //     if(this.status === FULFILLED) {
  //       // FULFILLED状态下执行
  //       onFulfilled(this.value)
  //     }

  //     if(this.status === REJECTED) {
  //       //REJECTED状态下执行
  //       onRejected(this.value)
  //     }

  //   })
  // }


  /*

    实现链式调用 - Promise的一大优势就是支持链式调用，具体来说就是then方法的具体实现，实际上是返回了一个Promise，需要注意的几个点：
    
    1. 保存之前promise实例的引用，即保存this
    2. 根据then回调函数执行的返回值

    ~如果是promise实例，那么返回的下一个promise实例会等待这个promise状态发生变化
    ~如果不是promise实例，根据目前情况直接执行resolve或reject

  */


  // 第二版then
  then(onFulfilled, onRejected) {
    // 值穿透
    // then参数期望是函数，传入非函数则会发生值穿透。值传透可以理解为，当传入then的不是函数的时候，这个then是无效的
    // 原理上是当then中传入的不算函数，则这个promise返回上一个promise的值，这就是发生值穿透的原因，所以只需要对then的两个参数进行设置就行了
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw new Error(reason instanceof Error ? reason.message : reason) }

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


  // catch实现
  // Promise.prototype.catch就是Promise.prototype.then(null, onRejected)的别名
  catch(onRejected) {
    return this.then(null, onRejected);
  }


  // Promise.resolve
  // 不考虑thenable(Promise.resolve的最大特征之一就是可以将thenable的对象转换为promise对象)对象情况下, 则为Promise实例&非Promise实例
  static resolve(value) {
    if(value instanceof Promise) {
      // 如果是Promise实例，直接返回
      return value
    } 

    // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
    return new Promise((resolve, reject) => resolve(value))
  }

  // Promise.reject也会返回一个Promise实例，状态为REJECTED。
  // Promise.resolve不同的是，Promise.reject方法的参数会原封不动地作为reject的参数
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  // Promise.all 返回一个promise对象，只有当所有promise都成功时返回的promise状态才成功
  // 1. 所有的promise状态变为FULFILLED，返回的promise状态才变为FULFILLED
  // 2. 一个promise状态变为REJECTED，返回的promise状态就变为REJECTED
  // 3. 数组成员不一定都是promise，需要使用Promise.resolve()处理
  static all(promiseAry) {
    let count = 0
    const len = promiseAry.length
    const values = new Array(len)

    return Promise( (resolve, reject) => {
      for(let i = 0; i < len; i++) {
        Promise.resolve(promiseAry[i]).then( val => {
          values[i] = val
          count++
          count === len && resolve(values)
        },
        error => reject(error)
      )}
    })
  }

  // race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。
  // 它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
  static race(promiseAry) {
    return new Promise((resolve, reject) => {
      promiseAry.foreach(p => {
        Prmise.resolve(p).then(
          val => resolve(val),
          error => reject(error)
        )
      })
    })
  }


}













