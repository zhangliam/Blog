/*

	组合模式: 用小的对象来构建更大的对象

	1. 组合模式不是父子关系, HAS-A聚合关系, 而不是IS-A. 	
	组合对象包含一组叶对象, 但leaf并不是composite子类. 组合对象是把所有请求委托给它所含有的叶对象, 它们能够合作关键是拥有相同接口. 

	2. 对叶操作对象一致性 => 一致方式对待你列表每个叶对象

	3. 双向映射关系 => 严格意义上层次结构

	4. 用职责链模式提高组合模式性能

*/

var MacroCommand = function() {
	return {
		commandList: [],

		add(command) {
			this.commandList.push(command)
		},

		execute() {
			for(var i = 0, command; command = this.commandList[i++];) {
				command.execute()
			}
		}
	}
}


var openTvCommand = {
	execute() {
		console.log('打开电视')
	},
	add() {
		throw new Error('叶节点不能添加子节点')
	}
}

var marcroCommand = MacroCommand()

marcroCommand.add(openTvCommand)
openTvCommand.add(marcroCommand) // Uncaught Error 叶对象不能添加子节点


/*

	应用场景: 

	1. 表对象部门-整体层次结构
	该模式可构造一棵树来表对象的部分-整体结构, 特别在开发中不确定树有多少层次的时候, 树构造完成之后, 只需要请求树的最顶层对象, 就可对
	整颗树进行统一操作, 组合模式中增加和删除树的节点特别方便, 符合开放-闭合原则


	2. 统一对待树中所有对象
	组合模式可忽略组合对象和叶对象的区别, 在处理这颗树不用顾及组合对象还是叶对象, 也就是不用写if else判断语句分别处理


*/








