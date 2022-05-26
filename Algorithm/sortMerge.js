
/*
  
  归并排序是第一个可以被实际使用的排序算法.
  效率胜于冒泡, 选择, 插入
  复杂度为O(nlogⁿ)

  归并排序是一种分治算法.
  其思想是将原始数组切分成较小的数组, 直到每个小数组只有一个位置, 接着将小数组归并成较大的数组, 直到最后只有一个排序完毕的大数组. 
  
  Array.prototype.sort 
    Moz用的为此归并算法
    Chrome则为快速排序算法

*/


function createNonSortArray(size) {
  var array = new ArrayList()
  for(var i = size; i > 0; i--) {
    array.insert(i)
  }
  return array
}


function ArrayList() {

  let array = []

  let mergeSortRec = array => {
    let length = array.length

    if(length == 1) {
      return array
    }

    let mid = Math.floor(length / 2)
    let left = array.slice(0, mid)
    let right = array.slice(mid, length)

    return merge(mergeSortRec(left), mergeSortRec(right))
  }

  let merge = (left, right) => {
    var result = []
    var il = 0, ir = 0

    while(il < left.length && ir < right.length) {
      if(left[il] > right[ir]) {
        result.push(right[ir++])
      } else {
        result.push(left[il++])
      }
    }

    while(il < left.length) {
      result.push(left[il++])
    }

    while(ir < right.length) {
      result.push(right[ir++])
    }

    return result
  }

  this.insert = item => {
    array.push(item)
  }

  this.toString = () => array.join()

  this.mergeSort = () => {
    array = mergeSortRec(array)
  }

}

