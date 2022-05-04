
/*

	迭代器模式: 	提供一种方法顺序访问一个聚合对象中各个元素, 而又不需要暴露该对象内部表示.
	该模式可把迭代的过程从业务逻辑中分离出来, 使用该模式后, 即不关心对象的内部构造, 也可按顺序访问其中每个元素. 
	
*/ 

// 模拟each
var each = (ary, callback) => {
	for(var i = 0, len = ary.length; i < len; i++) {
		callback.call(ary[i], i, ary)
	}
}

each([1, 2, 3], (i, n) => {
	console.log([i, n])
})


// eg: 不同浏览器获取相应上传组件对象

var getUploadObj = () => {
	try {
		return new ActiveXObject('A.FTNUpload')  //IE上传控件
 	} catch(e) {
 		if(supprotFlash()) {  //supprotFlash未提供
 			var str = '<object type="application/x-shockwave-flash"></object>'
 			return $(str).appendTo($('body'))
 		}

 		var str = '<input name="file" type="file" />' //表单上传
 		return $(str).appendTo($('body'))
	} 
}


// 优化版本
var getActiveUploadObj = () => {
	try {
		return new ActiveXObject('A.FTNUpload') 
 	}catch(e) { 
 		return false
 	}
}

var getFlashUploadObj = () => {
	if(supprotFlash()) {  // supprotFlash未提供
		var str = '<object type="application/x-shockwave-flash"></object>'
		return $(str).appendTo($('body'))
	}
 	return false
}

var getFormUploadObj = () => {
	var str = '<input name="file" type="file" />'
 	return $(str).appendTo($('body'))
}


// 迭代器
var iteratorUploadObj = () => {
	for(var i = 0, fn; fn = arguments;) {
		var uploadObj = fn()
		if(uploadObj !== false) {
			return uploadObj
		}
	}
}

var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)



/*

	重构之后可见, 获取不同上传对象的方法被隔离在各自的函数里互不打扰, try,catch,if分支没有纠缠在一起,
	使得我们可以方便的维护和扩展代码.	

*/





