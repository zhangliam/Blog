

// 单例模式: 保证一个类仅有一个实例, 并提供一个访问它的全局访问点
// 🌰中(遵守单一职责原则), 我们把创建对象的职责和管理单例的职责分别放置两个方法里, 这两个方法可以独立变化而互不影响.


var getSingle = function(fn) {
	var result
	return function() {
		return result || ( result = fn.apply(this, arguments) )
	}
}


var createLoginLayer = function() {
	var div = document.createElement('div')
	div.innerHTML = 'login box'
	div.style.display = 'none'
	document.body.appendChild(div)
	return div
}

var createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = () => {
	var loginlayer = createSingleLoginLayer()
	loginlayer.style.display = 'block'
}



var createSingleIframe = getSingle(function() {
	var iframe = document.createElement('iframe')
	document.body.appendChild(iframe)
	return createSingleIframe
})

document.getElementById('loginBtn').onclick = () => {
	var loginlayer = createSingleIframe()
	loginlayer.src = 'http://www.baidu.com'
}

