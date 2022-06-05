
/* DP - 动态规划  */


// 最长公共子序列


//  T[i][j] 计算, 记住口诀：相等左上角加一, 不等取上或左最大值

function longestSeq(input1, input2, size1, size2) {
  var T = []
  for(let i = 0; i < size1; i++) {
    T[i] = []
    for(let j = 0; j < size2; j++) {

      if(i == 0 || j == 0) {
        T[i][j] = 0
        continue
      }

      if(input1[i] === input2[j]) {
        T[i][j] = T[i-1][j-1] + 1
      } else {
        T[i][j] = Math.max(T[i-1][j], T[i][j-1])
      }

    }
  } 

  findValue(input1, input2, size1, size2, T)
  return T
}


//  如果它来自左上角加一, 则是子序列, 否则向左或上回退
//  findValue过程, 其实就是和就是把T[i][j]的计算反过来

function findValue(input1, input2, size1, size2, T) {
  var result = []
  var i = size1 - 1
  var j = size2 - 1

  console.log(i, j)
  while(i > 0 && j > 0) {
    if(input1[i] === input2[j]) {
      result.unshift(input1[i])
      i--
      j--
    } else {
      if(T[i-1][j] > T[i][j-1]) {
        i--
      } else {
        j--
      }
    }
  }
  console.log(result)
}


var input1 = ['', 'a', 'b', 'c', 'a', 'd', 'f']
var input2 = ['', 'a', 'c', 'b', 'a', 'd']
var size1 = input1.length
var size2 = input2.length

console.log(longestSeq(input1, input2, size1, size2))


