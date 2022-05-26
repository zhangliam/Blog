
/*
  
  快速排序也许是最常用的排序算法了.
  复杂度为O(nlogⁿ), 且它的性能通常比其他的复杂度为O(nlogn)的排序算法要好. 
  和归并排序一样, 快速排序也使用分治的方法, 将原始数组分为较小的数组(但它没有像归并排序那样将它们分割开).

  (1) 首先, 从数组中选择中间一项作为主元.
  (2) 创建两个指针, 左边一个指向数组第一个项, 右边一个指向数组最后一个项.移动左指
      针直到我们找到一个比主元大的元素, 接着, 移动右指针直到找到一个比主元小的元素, 然后交
      换它们, 重复这个过程, 直到左指针超过了右指针.这个过程将使得比主元小的值都排在主元之
      前, 而比主元大的值都排在主元之后.这一步叫作划分操作.
  (3) 接着, 算法对划分后的小数组（较主元小的值组成的子数组, 以及较主元大的值组成的
      子数组）重复之前的两个步骤, 直至数组已完全排序.

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

  var swap = (array, index1, index2) => {
    var aux = array[index1]
    array[index1] = array[index2]
    array[index2] = aux
  }

  var partition = (array, left, right) => {
    var i = left, j = right
    var povit = array[ Math.floor( (left + right) / 2 ) ]

    while(i <= j) {
      while(array[i] < povit) {
        i++
      }
      while(array[j] > povit) {
        j--
      }
      if(i <= j) {
        swap(array ,i, j)
        i++
        j--
      }
    }

    return i
  }

  var quick = (array, left, right) => {
    var index
    if(array.length > 1) {
      index = partition(array, left, right)

      if(left < index - 1) {
        quick(array, left, index - 1)
      }

      if(index < right) {
        quick(array, index, right)
      }

    }
  }
  
  this.insert = item => {
    array.push(item)
  }

  this.toString = () => array.join()

  this.quickSort = () => {
    quick(array, 0, array.length - 1)
  }

  /*
    
    二分搜索

    (1) 选择数组的中间值
    (2) 如果选中值是待搜索值，那么算法执行完毕(值找到了).
    (3) 如果待搜索值比选中值要小, 则返回步骤1并在选中值左边的子数组中寻找.
    (4) 如果待搜索值比选中值要大, 则返回步骤1并在选种值右边的子数组中寻找.

  */

  this.binarySearch = item => {
    this.quickSort()

    var low = 0, high = array.length - 1
    var element, mid

    while(low <= high) {
      mid = Math.floor( (low + high) / 2 )
      element = array[mid]

      if(element > item) {
        high = mid - 1
      } else if(element < item) {
        low = mid + 1 
      } else {
        return mid
      }
    }

    return -1
  } 

}

