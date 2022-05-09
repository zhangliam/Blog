/*

	状态模式: 允许一个对象在其内部状态改变时改变它的行为, 对象看起来似乎修改了它的类. 
	(将状态封装成独立的类, 并将请求委托给当前的状态对象, 当对象的内部状态改变时, 会带来不同的行为变化)

*/


var Light = function() {
	this.state = 'off'
	this.button = null
}


Light.prototype.init = function() {
	var button = document.createElement('button')
	var __self = this

	button.innerHTML = '开关'
	this.button = document.appendChild(button)
	this.button.onClick = function() {
		__self.buttonWasPressed()
	}
}


Light.prototype.buttonWasPressed = function() {
	if(this.state == 'off') {
		console.log('弱光')
		this.state = 'weakLight'
	}
	if(this.state == 'weakLight') {
		console.log('强光')
		this.state = 'strongLight'
	}
	if(this.state == 'strongLight') {
		console.log('关灯')
		this.state = 'off'
	}
}

var light = new Light()
light.init()


/*
	
	以上问题:

	1. buttonWasPressed违反开放-闭合原则, 新增或修改light状态都需改动其中代码
	2. 状态切换不明显, 单纯的对state赋值
	3. 状态之间切换关系, 单纯的堆砌if,else语句

*/ 


/*

	状态模式改造
	通常想到的封装, 一般都是封装对象的行为, 而不是对象的状态. 但在该模式中关键是把事物的每种状态都封装成单独的类, 
	跟这种状态有关的行为都被封装在这个类的内部, button触发只需在上下文中, 把这个请求委托给当前的状态对象即可, 
	该状态对象会负责渲染它自身的行为. 

*/


// 定义三个状态类

var offLightState = function(light) {
	this.light = light
}

offLightState.prototype.buttonWasPressed = function() {
	console.log('弱光')
	this.light.setState(this.light.weakLightState)
}

var weakLightState = function(light) {
	this.light = light
}

weakLightState.prototype.buttonWasPressed = function() {
	console.log('强光')
	this.light.setState(this.light.strongLightState)
}

var strongLightState = function(light) {
	this.light = light
}

strongLightState.prototype.buttonWasPressed = function() {
	console.log('关灯')
	this.light.setState(this.light.offLightState)
}

// Light类

var Light = function() {
	this.offLightState = new offLightState(this)
	this.weakLightState = new weakLightState(this)
	this.strongLightState = new strongLightState(this)
	this.button = null
}

Light.prototype.init = function() {
	var __self = this
	var button = document.createElement('button')

	this.button = document.body.appendChild(button)
	this.button.innerHTML = '开关'

	this.currState = this.offLightState
	
	this.button.onclick = function() {
		__self.currState.buttonWasPressed()
	}
}

Light.prototype.setState = function(newState) {
	this.currState = newState
}

var light = new Light()
light.init()


/* 

	状态模式优缺点: 
		1. 该模式定义了状态与行为之间的关系, 并将他们封装在一个类里.
		2. 避免context无限膨胀, 状态和逻辑分布在状态类中, 也去掉context中原本过多的条件分支
		3. 用对象替代字符串来记录当前状态, 清晰明了
		4. context中请求动作和状态类中封装的行为独立变化而不受影响
		缺点也是会定义许多状态类, 系统会增加不少对象, 逻辑分散在状态类中, 虽避免了条件分支但也造成逻辑分散问题.	


	状态模式性能优化点: 
		1. 合理控制state对象创建和销毁
		2. context对象可以共享一个state对象, 享元模式应用场景之一


	状态模式 VS 策略模式
		同: 都有上下文, 策略或者状态类, 上下文把请求委托这些类来执行
		异: 策略模式中各个策略类之间是平等又平行的, 它们没有关联; 状态模式中, 状态和状态的行为是提前封装好的, 状态之间切换也早就规定完成,
		"改变行为"这件事情发生在状态模式内部.

*/


// 状态机优化

var delegate = function(client, delegation) {
	return {
		buttonWasPressed() {  // 将客户的操作委托给delegation对象
			return delegation.buttonWasPressed.apply(client, arguments)
		}
	}
}

var FSM = {
	off: {
		buttonWasPressed() {
			console.log('关灯')
			this.button.innerHTML = '下一次我是开灯'
			this.currState = this.onState
		}
	},
	on: {
		buttonWasPressed() {
			console.log('开灯')
			this.button.innerHTML = '下一次我是关灯'
			this.currState = this.offState
		}
	}
}

var Light = function() {
	this.offState = delegate(this, FSM.off)
	this.onState = delegate(this, FSM.on)
	this.currState = this.offState  // 设置初始状态为关闭状态
	this.button = null
}

Light.prototype.init = function() {
	var __self = this
	var button = document.createElement('button')
	button.innerHTML = '已关灯'

	this.button = document.body.appendChild(button)
	
	this.button.onclick = function() {
		__self.currState.buttonWasPressed()
	}
}

var light = new Light()
light.init()







