

// 代理模式: 为一个对象提供一个代用品||占用符, 以便控制对它的访问


// 图片预加载函数
var myImage = (() => {
	var imgNode = document.createElement('img')
	document.body.appendChild(imgNode)
	var img = new Image

	img.onload = function() {
		imgNode.src = img.src
	}

	return {
		setSrc: src => {
			imgNode.src = 'file://C:/Uer/loading.gif'
			img.src = src
		}
	}
})()s

myImage.setSrc('http://img.qq.com/music/01.jpg')


// 现在通过proxyImage间接访问myImage, proxyImage控制了myImage的访问, 并在其中加入其他额外操作.


// 图片预加载函数 => 代理模式优化
var myImage = (() => {
	var imgNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return {
		setSrc: src => {
			imgNode.src = src
		}
	}
})() 


var proxyImage = (() => {
	var img = new Image
	img.onload = function() {
		myImage.setSrc(this.src)
	}

	return {
		setSrc: src => {
			myImage.setSrc('file://C:/Uer/loading.gif')
			img.src = src
		}		
	}
})()

proxyImage.setSrc('http://img.qq.com/music/01.jpg')


// 缓存代理: 大致思路同高性能JS中04章算法与流程控制缓存唯一key来存储返回作其他作用, 不作赘述. 
var mult = function() {
	var a = 1
	for(var i = 0, len = arguments.length; i < len; i++) {
		a *= arguments[i]
	}
	return a
}

var plus = function() {
	var a = 0
	for(var i = 0, len = arguments.length; i < len; i++) {
		a += arguments[i]
	}
	return a
}


var createProxyFactory = function(fn) {
	var cache = {}
	return function() {
		var args = Array.prototype.join.call(arguments, ',')
		if(args in cache) {
			return cache[args]
		}
		return cache[args] = fn.apply(this, arguments)
	}
}

var proxyMult = createProxyFactory(mult)
var proxyPlus = createProxyFactory(plus)

console.log(proxyPlus(1,2,3,4), proxyMult(1,2,3,4))



/* 



	为了说明代理的意义, 我们引入一个面对对象设计的原则 - 单一职责原则

	单一职责原则指的是, 就一个类(函数||对象)而言, 应该仅有一个引起它变化的原因, 如果一个对象承担了多项职责, 意味这个对象变得巨大,
	引起变化的原因有多个. 面对对象的设计鼓励将行为分布到细颗粒的对象中, 如果一个对象承担的职责过多, 等于把这些职责耦合到一起,
	这种耦合会导致脆弱和低内聚的设计. 变化发生时, 设计可能会遭到意外破坏.

	职责被定义为“引起变化的原因”, 未优化版本中负责给img节点设置src, 还要负责预加载图片. 我们在处理一个职责时, 有可能因为其强耦合性影响另一个职责的体现

	另外在面向对象的设计中, 大多数情况下若违反其他任何原则，同时将违反开放-封闭原则。
	
	如果我们只想从网络中获取体积小的图片, 任何原因将把预加载删除, 这个时候不得不去修改未优化的myImage对象

	实际上, 我们只需要给img设置src，预加载只是锦上添花，如果能把预加载放在另一个对象里最好，这个时候代理模式就派上用场了，
	代理负责加载图片，预记载完毕后把请求重新交给本体myImage

	纵观改写, 我们没有改动myImage接口, 但是通过代理对象，给系统添加了新的行为，是符合开放-闭合原则的，img设置src和预加载分别隔离在
	两个对象里，它们各自变化而不影响对方. 后续如无需懒加载, 只需改成本体即可


	
	代理模式里还有很多小分类, JS中常用的是虚拟代理(先设置cache, 真正执行启用)&缓存代理, 编写业务代码无需预先考虑是否使用代理模式, 
	当真正发现不方便访问某个对象再使用代理不迟.



*/


