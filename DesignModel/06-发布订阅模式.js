
/*

	发布-订阅模式(观察者模式)
	
*/ 

var event = {

	clientList: [],

	listen: function(key, fn) {
		if(!this.clientList[key]) {
			this.clientList[key] = []
		}
		this.clientList[key].push(fn)
	},

	trriger: function() {
		var key = Array.prototype.shift.call(arguments)
		var fns = this.clientList[key]

		if(!fns || fns.length === 0) {
			return false	
		}

		for(var i = 0, fn; fn = fns[i++]; ) {
			fn.apply(this, arguments)
		}
	},

	remove: function(key, fn) {
		var fns = this.clientList[key]

		if(!fns) { // 无人订阅直接返回
			return false
		}

		if(!fn) { // 没有传入具体函数, 删除对应key所有消息订阅
			fns && (fns.length = 0)
			return 
		}

		for(var len = fns.length; len >= 0; len--) {
			var _fn = fns[len]
			if(_fn == fn) {
				fns.splice(len, 1) // 删除对应项
			}
		}
	}, 

}


var saleOffices = {}

// 动态给所有对象安装发布-订阅功能
var installEvent = (obj) => {
	for(var i in event) {
		obj[i] = event[i]
	}
}

installEvent(saleOffices)

saleOffices.listen('squareMeter88', fn1 = price => { 
	console.log('price: ', price)
})

saleOffices.listen('squareMeter88', fn2 = price => { 
	console.log('price: ', price)
})

saleOffices.remove('squareMeter88', fn1)


saleOffices.trriger('squareMeter88', 20000000)


/*

	优: 一为时间上的解耦, 二为对象的解耦, 异步编程中(Vue等)完成更松耦合的代码编写

	缺: 	为本身消耗一定的时间和内存, 订阅消息最后没有触发, 订阅者始终处于内存中
			该模式虽然可以弱化对象之间的联系, 过度使用对象之间必然联系将深埋背后, 导致程序难以跟踪维护和理解

*/ 




