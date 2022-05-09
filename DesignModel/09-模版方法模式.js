/*

	模版方法模式

	该模式是一种典型通过封装变化提高系统扩展性的设计模式. 
	传统面向对象语言中, 一个运用模版方法模式程序中, 子类的方法种类和执行顺序是不变的, 所以将它部分逻辑封装于父类模版方法内. 
	而子类具体实现是可变的, 所以把这部分可变封装于子类中. 通过增加新子类, 给程序添加新功能, 而无需修改抽象父类和其他子类, 符合开放-闭合原则

	tips: JS中该模式思想如此, 更好以高阶函数去实现

*/	


var Beverage = function(param) {

	var boilWater = () => {
		console.log('煮沸水')
	}

	var brew = param.brew || function() {
		throw new Error('必须传递brew方法')
	}

	var pourInCup = param.pourInCup || function() {
		throw new Error('必须传递pourInCup方法')
	}


	var addCondiments = param.addCondiments || function() {
		throw new Error('必须传递addCondiments方法')
	}

	var F = function() {}

	// 该方法中封装了子类的算法框架, 它作为一个算法的的模版, 指导子类以何种顺序去执行哪些方法, 这就是模版方法
	F.prototype.init = () => {
		boilWater()
		brew()
		pourInCup()
		addCondiments()
		// 挂钩返回true则执行, 模拟钩子行为
		// if(param.customerHandle) {
		// 	addCondiments()
		// }
	}

	return F
}


var Coffee = Beverage({
	brew() {
		console.log('沸水冲泡杯子')
	},
	pourInCup() {
		console.log('咖啡倒进杯子')
	},
	addCondiments() {
		console.log('加糖奶')
	}
})


var Tea = Beverage({
	brew() {
		console.log('沸水冲泡茶叶')
	},
	pourInCup() {
		console.log('茶叶倒进杯子')
	},
	addCondiments() {
		console.log('加柠檬')
	}
})


var coffee = new Coffee()
coffee.init()

var tea = new Tea()
tea.init()





