// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

// 示例：
// 输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组




function minSubArrayLen(target: number, nums: number[]): number {
  let left: number = 0, right: number = 0
  let result: number = nums.length + 1
  let sum: number = 0

  while(right < nums.length) {
    sum += nums[right]

    if(sum >= target) {
      // 不断移动左指针, 直到不能缩小为止
      while(sum - nums[left] >= target) {
        sum -= nums[left++]
      }
      result = Math.min(result, right - left + 1)
    }

    right++
  }

  console.log(result)
  return result === nums.length + 1 ? 0 : result
}


minSubArrayLen(7, [2,3,1,2,4,3])



// 在链表类中实现这些功能：

// get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
// addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
// addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
// addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
// deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。


class ListNode {
  public val: number
  public next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}


class MyLinkedList {

  private size: number
  private head: ListNode | null
  private tail: ListNode | null


  constructor() {
    this.size = 0
    this.head = null
    this.tail = null
  }


  private getNode(index: number): ListNode {
    let curNode: ListNode = new ListNode(0, this.head)
    for(let i = 0; i <= index; i++) {
      curNode = curNode.next!
    }
    return curNode
  }


  get(index: number): number {
    if(index < 0 || index >= this.size) {
      return -1
    }
    let curNode = this.getNode(index)
    return curNode.val
  }


  addAtHead(val: number): void {
    let node: ListNode = new ListNode(val, this.head)
    this.head = node
    if(!this.tail) {
      this.tail = node
    }

    this.size++
  }


  addAtTail(val: number): void {
    let node: ListNode = new ListNode(val, null)
    if(this.tail) {
      this.tail.next = node
    } else {
      this.head = node
    }
    this.tail = node
    this.size++
  }


  toString(): void {
    let substr: string = ''
    let curNode: ListNode | null = this.head
    while(curNode) {
      substr += (curNode.next ? curNode.val + '=>' : curNode.val)
      curNode = curNode.next
    }
    console.log(substr)
  }


} 


var instance_myLinkedList = new MyLinkedList()

instance_myLinkedList.addAtHead(1)
instance_myLinkedList.addAtTail(4)
instance_myLinkedList.addAtHead(2)
instance_myLinkedList.addAtHead(2)

instance_myLinkedList.toString()


















