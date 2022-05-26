
/*

  插入排序每次排一个数组项, 以此方式构建最后的排序数组.
  假定第一项已经排序了, 接着，它和第二项进行比较，第二项是应该待在原位还是插到第一项之前呢？
  这样，头两项就已正确排序，接着和第三项比较(它是该插入到第一、第二还是第三的位置呢?), 以此类推.
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

  this.insertionSort = () => {
    var length = array.length
    var temp, j

    for(var i = 1; i < length; i++) {
      j = i
      temp = array[i]
      while(j > 0 && array[j-1] > temp) {
        array[j] = array[j-1]
        j--
      }
      array[j] = temp 
    }
  }

}

