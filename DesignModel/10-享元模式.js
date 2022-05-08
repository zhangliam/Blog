/*

	享元模式 => 核心是运用共享技术来有效支持大量颗粒度的对象

	内部状体 & 外部状态
	该模式要求将对象的属性分为内部状态和外部状态. 目标是尽量减少共享对象的数量; 如何划分内外状态以下几点:
	a. 内部状态存储于对象内部
	b. 内部状态可以被一些对象共享
	c. 内部状态独立于具体场景, 通常不会改变
	d. 外部状态取决于具体场景, 根据场景而变化, 且不能被共享

*/


// 文件上传例子

window.startUpload = function(uploadType, files) {
	for(var i = 0 , file; file = files[i++]) {
		var uploadobj = new Upload(uploadType, fileName, fileSize)
		uploadobj.init(id)
	}
}


var Upload = function(uploadType, fileName, fileSize) {
	this.uploadType = uploadType
	this.fileName = fileName
	this.fileSize = fileSize
	this.dom = null
}

Upload.prototype.init = function(id) {
	var that = this
	this.id = id
	this.dom = document.creatElement('div')
	this.dom.innerHTML = `<span>文件名称${ this.fileName }, 大小${ this.fileSize }</span><button class="delFile">删除</button>`

	this.dom.querySelector('.delFile').onclick = function() {
		that.delFile()
	}

	document.body.appendChild(this.dom)
}

Upload.prototype.delFile = function() {
	if(this.fileSize < 3000) {
		return this.dom.parentNode.removeChild(this.dom)
	}
	if(window.confim('确定删除？' + this.fileName)) {
		return this.dom.parentNode.removeChild(this.dom) 
	}
}




// 该模式重构优化

// a. 剥离外部状态
var Upload = function(uploadType, fileName, fileSize) {
	this.uploadType = uploadType
}


Upload.prototype.delFile = function(id) {
	uploadManager.setExternalState(id, this)

	if(this.fileSize < 3000) {
		return this.dom.parentNode.removeChild(this.dom)
	}
	if(window.confim('确定删除？' + this.fileName)) {
		return this.dom.parentNode.removeChild(this.dom) 
	}
}

// b.	工厂进行对象实例化
var UploadFactory = (function(){
	var createFlyWeidghts = {}
	return {
		create(uploadType) {
			if(createFlyWeidghts[uploadType]) {
				return createFlyWeidghts[uploadType]
			}
			return createFlyWeidghts[uploadType] = new Upload(uploadType)
		}
	}
})()


// c.管理器封装外部状态
var uploadManager = (function() {
	var uploadDatabase = {}
	return {
		add(id, uploadType, fileName, fileSize) {
			var flyWeightObj = UploadFactory.create(uploadType)

			var dom = document.creatElement('div')
			dom.innerHTML = `<span>文件名称${ fileName }, 大小${ fileSize }</span><button class="delFile">删除</button>`
			dom.querySelector('.delFile').onclick = function() {
				flyWeightObj.delFile(id)
			}

			document.body.appendChild(dom)
			uploadDatabase[id] = {
				fileName,
				fileSize,
				dom
			}

			return flyWeightObj
		}, 
		setExternalState(id, flyWeightObj) {
			var uploadData = uploadDatabase[id]
			for(var i in uploadData) {
				flyWeightObj[i] = uploadData[i]
			}
		}
	}
})()


var id = 0
window.startUpload = function(uploadType, files) {
	for(var i = 0 , file; file = files[i++]) {
		var uploadobj = uploadManager.add(++id, uploadType, fileName, fileSize)
	}
}


/*

	享元模式适用性: 
	1. 程序中使用大量对象
	2. 由于使用大量对象, 造成很大内存开销
	3. 对象大多状态可变为外部状态
	4. 剥离出对象外部状态后, 可以用较少的共享对象取代大量对象

*/




