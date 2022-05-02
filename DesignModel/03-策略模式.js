

// 策略模式: 定义一系列算法, 把它们封装起来, 使他们可以相互替换

// 目的: 将算法的使用与算法的实现分开来

// 组成: 
// 第一部分是一组策略类封装具体的算法, 并负责具体的计算过程. 
// 第二部分是环境类Context, Context类接收客户的请求, 随后把请求委托给某个策略类. 做到这点说明context中要维持对某个策略对象引用

	

/* ----------------------- 策略 -------------------------- */

var strategies = {
	isNonEmpty(value, errorMsg) {
		if(value == '') {
			return errorMsg;
		}
	},
	minLength(value, length, errorMsg) {
		if(value.length < length) {
			return errorMsg;
		}
	},
	isMobile(value, errorMsg) {
		if(!/(^1[3|5|8][0-9]{9}$)/.test( value )) {
			return errorMsg;
		}
	}
};


/* --------------------- validator类 -------------------- */

var Validator = function() {
	this.cache = [];
};

Validator.prototype.add = function( dom, rules ) { 
	 var self = this; 
	 for ( var i = 0, rule; rule = rules[ i++ ]; ){ 
		 	(function( rule ){ 
		 		var errorMsg = rule.errorMsg;
			 	var strategyAry = rule.strategy.split( ':' ); 

				self.cache.push( () => { 
					var strategy = strategyAry.shift(); 
					strategyAry.unshift( dom.value ); 
					strategyAry.push( errorMsg ); 
					return strategies[ strategy ].apply( dom, strategyAry ); 
				}); 

		 	})(rule) 
	 } 
}; 

Validator.prototype.start = function() { 
	for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ) { 
		var errorMsg = validatorFunc(); 
		if ( errorMsg ){ 
			return errorMsg; 
		} 
	} 
};



/*********************** 客户调用代码 **************************/ 

var registerForm = document.getElementById( 'registerForm' ); 
var validataFunc = function() { 

	var validator = new Validator(); 

	validator.add( registerForm.userName, [{ 
		strategy: 'isNonEmpty', 
		errorMsg: '用户名不能为空' 
	}, { 
		strategy: 'minLength:6', 
		errorMsg: '用户名长度不能小于 10 位' 
	}]); 

	validator.add( registerForm.password, [{ 
		strategy: 'minLength:6', 
		errorMsg: '密码长度不能小于 6 位' 
	}]); 

	validator.add( registerForm.phoneNumber, [{ 
		strategy: 'isMobile', 
		errorMsg: '手机号码格式不正确' 
	}]); 

	var errorMsg = validator.start(); 
	return errorMsg; 

}

registerForm.onsubmit = function() { 
	var errorMsg = validataFunc(); 
	if ( errorMsg ){ 
		alert ( errorMsg ); 
		return false; 
	} 
}

