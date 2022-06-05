
  /* DP 动态规划 */

  function MinCoinChange(coins) {
    let _coins = coins
    let cache = {}

    this.makeChange = function(amount) {
      let _self = this

      if(!amount) {
        return []
      }
      if(cache[amount]) {
        return cache[amount]
      }

      let min = [], newMin, newAmount
      for(let i = 0; i < _coins.length; i++) {
        let coin = _coins[i]
        let newAmount = amount - coin

        console.log('newAmount: ' + newAmount)
        if(newAmount >= 0) {
          newMin = _self.makeChange(newAmount)
        }
        if(
          newAmount >= 0 &&
          (newMin.length < min.length - 1 || !min.length) &&
          (newMin.length || !newAmount)
        ) {
          min = [coin].concat(newMin)
          console.log(`new Min ${ min } for ${ amount }`)
        }
      }
      return (cache[amount] = min)
    }

    this.getCache = () => {
      return cache
    }
  }

  var minCoinChange = new MinCoinChange([1, 3, 4]); 
  console.log(minCoinChange.makeChange(6));
  console.log(minCoinChange.getCache());



  // 1 + n 总和
  function sum(num) {
    var result
    if(num === 1) return 1
    result = sum(num - 1) + num
    console.log(result)
    return result
  }


  /* 贪心算法 */
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

  // let fuck = new MinCoinChange([1,3,4])
  // console.log(fuck.makeChange(6))


  /* 遍历DOM树 */

  // var root = document.getElementById('subTree');
  // console.log(root);//打印跟节点

  // //获取根节点的孩子
  // function forDOM(root1) {
  //   var children = root1.children;
  //   //遍历孩子
  //   for (var i = 0; i < children.length; i++) {
  //     console.log(i)
  //     var child = children[i];
  //     console.log(child);
  //     child.children && forDOM(child);
  //   }
  // }
  // forDOM(root);

