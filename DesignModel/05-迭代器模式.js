

/*

	迭代器模式: 	提供一种方法顺序访问一个聚合对象中各个元素, 而又不需要暴露该对象内部表示.
	该模式可把迭代的过程从业务逻辑中分离出来, 使用该模式后, 即不关心对象的内部构造, 也可按顺序访问其中每个元素. 

*/ 

var each = (ary, callback) => {
	for(var i = 0, len = ary.length; i < len; i++) {
		callback.call(ary[i], i, ary)
	}
}

each([1, 2, 3], (i, n) => {
	console.log([i, n])
})



