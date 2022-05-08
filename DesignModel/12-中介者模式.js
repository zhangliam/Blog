/*

	中介者模式: 
		
		面向对象鼓励将行为分布到各个对象中, 把对象划分为更小颗粒度以复用, 但由于这些细颗粒对象之间联系激增, 又可能反过来降低它们可复用性.

		该模式作用就是解除对象与对象间耦合关系, 增加一个中介者对象后, 所有的相关对象都通过中介者来通信, 而不是互相应用. 
		所以当一个对象发生改变时, 只需要通知中介者对象即可, 中介者使各对象之间耦合松散, 而且可独立改变它们之间交互.
		该模式使网状的多对多关系变成了相对简单一对一关系.

*/


/* 手机加入购物车涉及颜色, 内存, 库存三级联动逻辑判断, 传统模式为给各个目标绑定事件来实现 */

colorSelect.onChange = function() {
	//...
}

memorySelect.onChange = function() {
	//...
}

numberInput.onChange = function() {
	//...
}


// 中介者模式 - 优化版

// 手机内存
var goods = {
	'red | 32G': 3
	'red | 16G': 0,
	'blue | 32G': 1, 
	'blue | 16G': 6, 
}

// 中介者
var mediator = (function(){

	var colorSelect = document.getElementById('colorSelect')
	var memorySelect = document.getElementById('memorySelect')
	var numberInput = document.getElementById('numberInput')
	var colorInfo = document.getElementById('colorInfo')
	var memeryInfo = document.getElementById('memeryInfo')
	var numberInfo = document.getElementById('numberInfo')
	var nextBtn = document.getElementById('nextBtn')


	return {
		changed(obj) {
			var color = colorSelect.value
			var memory = memorySelect.value
			var number = numberInput.value
			var stock = goods[color + '|' + memory]

			if(obj === colorSelect) {
				colorInfo.innerHTML = color
			}

			if(obj === memorySelect) {
				memeryInfo.innerHTML = memory
			}

			if(obj === numberInput) {
				numberInfo.innerHTML = number
			}


			if(!color) {
				nextBtn.disabled = true
				nextBtn.innerHTML = '请选择手机颜色'
				return
			}

			if(!memory) {
				nextBtn.disabled = true
				nextBtn.innerHTML = '请选择内存大小'
				return
			}

			if( ((number - 0) | 0) !== number - 0) {
				nextBtn.disabled = true
				nextBtn.innerHTML = '请输入正确购买数量'
				return
			}

			nextBtn.disabled = false
			nextBtn.innerHTML = '放入购物车'

		}
	}

})()


colorSelect.onChange = function() {
	mediator.changed(this)
}

memorySelect.onChange = function() {
	mediator.changed(this)
}

numberInput.onChange = function() {
	mediator.changed(this)
}


/*

	该模式迎合迪米特法则的一种实现, 也叫最少知识原则 => 指一个对象应尽可能少的了解另外对象

	因此中介者模式使各个对象之间得以解耦, 以中介者与对象之间一对多关系取代对象网状多对多关系, 各个对象只需关注自身功能的实现, 
	对象之间交互关系由中介者对象来实现和维护

	缺点: 复杂度转嫁给新增中介者对象难以维护, 需衡量对象之间耦合程度和使用成本

*/


