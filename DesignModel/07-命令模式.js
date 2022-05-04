/*  

	命令模式

	常见应用场景: 有时候需要向某些对象发送请求, 但不知道接收者是谁, 也不知道请求的操作是什么, 
	此时希望用一种松耦合的方式来设计程序, 使得请求发送者和请求接收者能够消除彼此耦合关系
	
*/

var menuBar = {
	refresh() {
		console.log('刷新菜单界面')
	}
}


var RefreshMenuBarCommand = receiver => {
	return {
		execute: () => {
			receiver.refresh()
		}
	}
}


var setCommand = (button, command) => {
	button.onclick = () => {
		command.execute()
	}
}


var refreshMenuBarCommand = RefreshMenuBarCommand(menuBar)
setCommand(btn, refreshMenuBarCommand)


// 宏命令
var closeDoorCommand = {
	execute() {
		console.log('关门')
	}
}

var openPcCommand = {
	execute() {
		console.log('开电脑')
	}
}

var openQQCommand = {
	execute() {
		console.log('打开QQ')
	}
}


var macroCommand = function() {
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







