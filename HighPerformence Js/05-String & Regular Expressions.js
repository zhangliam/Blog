/*  高性能JavaScript  */ 


// ------ 字符串 & 正则表达式


/*
  字符串连接(仅限IE7)
  由于避免重复分配内存&拷贝逐渐增大的字符串, 于是有了这个戏剧性提升
*/

// += 
var str = "I'm Iron Man"
var newStr
var appends = 5000

while(appends--) {
  newStr += str
}

// [].join
var str = "I'm Iron Man"
var strs = []
var newStr
var appends = 5000


while(appends--) {
  strs[strs.length] = str
}
newStr = strs.join('')


// 去除字符空白
String.prototype.tirm = function() {
  var str = this.replace(/^\s+/, '')
  var end = str.length - 1
  var ws = /\s/

  while(ws.test(str.charAt(end))) {
    end--
  }

  return str.slice(0, end + 1)
}

/*

  总结: 
  
  1. 回溯是正则表达式匹配功能的基本组成部分, 也是正则表达式低效之源
    - 回溯失控避免: 
      a. 使相邻字元乎互斥, 避免嵌套量词对同一个字符串相同部分多次匹配
      b. 重复利用预查原子组去除非必要回溯

  2. 提高正则表达式效率的各种手段有助于其更快匹配, 并非在匹配位置花更少时间
   - eg: 减少分支数量, 缩小分支范围
      cat|bat => [cb]at
      red|read => rea?d
      red|raw => r(?:ed|aw)
      (.|\r|\n) => [\s\S]
    字符集比分支更快, 因为它使用位向量而不是回溯

    tips: chrome & firefox自动执行其中优化, 因此较少受到手工调整影响

*/ 












