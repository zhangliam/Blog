/*

	装饰者模式

	同: 该模式和代理模式很像, 同样为对象提供一定程度间接引用, 实现部分都保留了对另一个对象引用, 并向该对象发起请求.

	异: 	代理模式目的是当直接访问本体不符合不方便时间为本体提供一个替代者, 本体定义关键功能, 代理提供对它的访问和访问本体前做其他操作.
			代理模式强调一种关系(Proxy与它实体之间的关系), 这种关系可以静态表达, 也可以说这种关系一开始就可以被确定.
		  装饰者模式是为对象动态加入行为, 用于一开始不能确定对象的全部功能.

			代理模式通常只有一层代理-本体的引用
			装饰者模式则常形成一条装饰链

*/

Function.prototype.before = function(beforefn) {
	var _self = this
	return function() {
		if(beforefn.apply(this, arguments) === false) {
			return
		}
		return _self.apply(this, arguments)
	}
}


var validata = function() {
	if(username.value = '') {
		console.log('username error')
		return false
	}
	if(password.value = '') {
		console.log('password error')
		return false
	}
}


var formsubmit = function() {
	var param = {
		username,
		password
	}
	ajax('http://xxx.com/login', param)
}

formsubmit = formsubmit.before(validata)

submitButton.onclick = () => {
	formsubmit()
}




