
/*

  选择排序算法是一种原址比较排序算法。
  选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
  O(n²)
  
*/

function createNonSortArray(size) {
  var array = new ArrayList()
  for(var i = size; i > 0; i--) {
    array.insert(i)
  }
  return array
}


function ArrayList() {

  var array = []

  var swap = (index1, index2) => {
    var aux = array[index1]
    array[index1] = array[index2]
    array[index2] = aux
  }

  this.insert = item => {
    array.push(item)
  }

  this.toString = () => array.join()

  this.selectionSort = () => {
    var length = array.length
    var indexMin

    for(var i = 0; i < length - 1; i++) {
      indexMin = i
      for(var j = i; j < length; j++) {
        if(array[indexMin] > array[j]) {
          indexMin = j
        }
      }
      if(i !== indexMin) {
        swap(i, indexMin)
      }
    }
  }

}


// 统计目标字符串每个字符出现的次数
var teststr = 'afffwwrwfwqeeqwerqwerghewj'
var getCharactorMaps = () => teststr.split('').reduce( (a,b) => (a[b]++ || (a[b] = 1), a), {})

getCharactorMaps(teststr)


/* 

  贪心算法
  输入金额面值 => 输入目标金额 => 输出匹配组合面值

 */
function MinCoinChange(coins) { 
  var coins = coins
  this.makeChange = function(amount) { 
    var change = [], total = 0

    for (var i = coins.length; i >= 0; i--){ 
      var coin = coins[i]
      while (total + coin <= amount) { 
        change.push(coin)
        total += coin
      } 
    } 

    return change
  } 
}

let lovechelsea = new MinCoinChange([1,3,4])
console.log(lovechelsea.makeChange(6))


