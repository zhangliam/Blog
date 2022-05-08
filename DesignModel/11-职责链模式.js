/*

	职责链模式

	定义: 使多个对象都有机会处理请求, 从而避免请求的发送者和接收者之间的耦合关系, 
	将这些对象连成一条链, 并沿着该链请求, 直到有个对象处理它为止. 

*/


// orderType: 订单类型, 1: 500定金用户 2: 200元定金用户 3:普通购买用户
// pay: 是否付过定金
// stock: 库存


var order = (orderType, pay, stock) => {

	if(orderType == 1) { // 500元定金模式
		if(pay == true) {
			console.log('500元定金预约, 得到100优惠券')
		} else {
			if(stock > 0) {
				console.log('普通购买, 无优惠券')
			} else {
				console.log('库存不足')
			}
		}
	}

	else if(orderType == 2) { // 200元定金模式
 		if(pay == true) {
			console.log('200元定金预约, 得到50优惠券')
		} else {
			if(stock > 0) {
				console.log('普通购买, 无优惠券')
			} else {
				console.log('库存不足')
			}
		}
	}

	else if(orderType == 3) { 
		if(stock > 0) {
			console.log('普通购买, 无优惠券')
		} else {
			console.log('库存不足')
		}
	}

}

// 第一版模式重构封装成函数

var order500 = (orderType, pay, stock) => {
	if(orderType == 1 && pay == true) {
		console.log('500元定金预约, 得到100优惠券')
	} else {
		order200(orderType, pay, stock)
	}
}

var order200 = (orderType, pay, stock) => {
	if(orderType == 2 && pay == true) {
		console.log('200元定金预约, 得到50优惠券')
	} else {
		orderNormal(orderType, pay, stock)
	}
}

var orderNormal = (orderType, pay, stock) => {
	if(stock > 0) {
		console.log('普通购买, 无优惠券')
	} else {
		console.log('库存不足')
	}
}


// 第二版 - 灵活可拆分的职责链节点
var order500 = (orderType, pay, stock) => {
	if(orderType == 1 && pay == true) {
		console.log('500元定金预约, 得到100优惠券')
	} else {
		return 'nextSuccessor'
	}
}

var order200 = (orderType, pay, stock) => {
	if(orderType == 2 && pay == true) {
		console.log('200元定金预约, 得到50优惠券')
	} else {
		return 'nextSuccessor'
	}
}

var orderNormal = (orderType, pay, stock) => {
	if(stock > 0) {
		console.log('普通购买, 无优惠券')
	} else {
		return 'nextSuccessor'
	}
}



var Chain = function(fn) {
	this.fn = fn
	this.successor = null
}

// 指定链中的下一个节点
Chain.prototype.setNextSuccessor = function(successor) {
	return this.successor = successor
}

// 传递请求给某一个节点
Chain.prototype.passRequest = function() {
	var ret = this.fn.apply(this, arguments)

	if(ret === 'nextSuccessor') {
		return this.successor && this.successor.passRequest.apply(this.successor, arguments)
	}

	return ret
}


// var chainOrder500 = new Chain(order500)
// var chainOrder200 = new Chain(order200)
// var chainOrderNormal = new Chain(orderNormal)

// chainOrder500.setNextSuccessor(chainOrder200)
// chainOrder200.setNextSuccessor(chainOrderNormal)


// chainOrder500.passRequest(1, true, 500)



// 异步职责链
Chain.prototype.next = function() {
	return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}


var fn1 = new Chain(function() {
	console.log(1)
	return 'nextSuccessor'
})

var fn2 = new Chain(function() {
	console.log(2)
	var self = this
	setTimeout(function() {
		self.next()
	}, 1000)
}) 

var fn3 = new Chain(function() {
	console.log(3)
})



fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()


/*

	优: 链中的对象可随意组合且内部逻辑不受影响, 避免了很多条件分支逻辑判断	
	缺: 
		1. 当链中没有最终返回时, 要么从链尾直接离开, 要么抛出错误. 这种情况下最好设置保底接受者节点处理链尾请求
		2. 该模式使得程序多了一些节点对象, 在某次请求过程中, 不部分节点无实质作用仅为传递, 性能方面考虑需避免过长的职责链带来性能损耗

*/



