class EventEmitter {

  constructor() {
    this.cache = {}
  }

  on(name, fn) {
    if(this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }

  off(name, fn) {
    const tasks = this.cache[name]
    if(tasks) {
      // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引. 若没有找到对应元素则返回-1.
      // const array1 = [5, 12, 8, 130, 44];
      // const isLargeNumber = (element) => element > 13;
      // console.log(array1.findIndex(isLargeNumber));
      const index = tasks.findIndex( f => f === fn || f.callback === fn )
      if(index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }

  emit(name, once = false, ...args) {
    if(this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[name].slice()
      for (let fn of tasks) {
        fn(...args)
      }
      if (once) {
        delete this.cache[name]
      }
    }
  }

}



// 测试
const eventBus = new EventEmitter()
const task1 = () => { console.log('task1'); }
const task2 = () => { console.log('task2'); }

eventBus.on('task', task1)
eventBus.on('task', task2)
eventBus.off('task', task1)

setTimeout(() => {
  eventBus.emit('task') // task2
}, 1000)
