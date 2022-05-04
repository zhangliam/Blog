/*

	享元模式

	内部状体 & 外部状态
	该模式要求将对象的属性分为内部状态和外部状态. 目标是尽量减少共享对象的数量; 如何划分内外状态以下几点:
	a. 内部状态存储于对象内部
	b. 内部状态可以被一些对象共享
	c. 内部状态独立于具体场景, 通常不会改变
	d. 外部状态取决于具体场景, 根据场景而变化, 且不能被共享

*/

window.startUpload = function(uploadType, files) {

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

