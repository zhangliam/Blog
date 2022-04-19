/*

  集合: 由一组无序且唯一的项组成, 这个数据结构使用了有限集合相同的数学概念, 但应用在计算机科学的数据结构中 

*/

function Set() {

  var items = {}

  this.has = value => {
    return items.hasOwnProperty(value)
  }

  this.add = value => {
    if(!this.has(value)) {
      items[value] = value
      return true
    }
    return false
  }

  this.remove = value => {
    if(this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }

  this.clear = () => {
    items = {}
  }

  this.size = () => {
    return Object.keys(items).length
  }

  this.values = () => {
    return Object.keys(items)
  }

  // 并集: 集合A & B的并集, x(元素)存在于A中, 或x存在于B中
  this.union = (otherSet) => {
    var unionSet = new Set()

    var values = this.values()
    for(var i=0; i<values.length; i++) {
      unionSet.add(values[i])
    }

    values = otherSet.values()
    for(var i=0; i<values.length; i++) {
      unionSet.add(values[i])
    }

    return unionSet
  }


  // 交集: 集合A & B的交集, x(元素)存在于A中, 且x存在于B中
  this.intersection = (otherSet) => {
    var intersectionSet = new Set

    var values = this.values
    for(var i=0; i<values.length; i++) {
      if(otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }

    return intersectionSet
  }


  // 子集: 集合A 是 B的子集, 集合A中每一个元素x, 也需要存在于B中
  this.subset = (otherSet) => {
   
    if(this.size() > otherSet.size()) {
      return false
    }

    var values = this.values
    for(var i=0; i<values.length; i++) {
      if(!otherSet.has(values[i])) {
        return false
      }
    }

    return true
  }

}




