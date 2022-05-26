// O(n²)


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

  this.bubbleSort = () => {
    var length = array.length
    for(var i = 0; i < length; i++) {
      // length - 1 - i 内循环减去外循环轮数
      // eg: [5,4,3,2,1] => [4,3,2,1,5]
      // 执行外循环第二轮数字5已正确排序无需对比
      for(var j = 0; j < length - 1 - i; j++) {
        if(array[j] > array[j+1]) {
          swap(j, j+1)
        }
      }
    }
  }
}
