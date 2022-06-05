

/*  
  
  广度优先 (breadth-first search)


    解决两类问题: 
      1. 节点A出发, 有前往B的节点 ?
      2. 节点A出发, 前往B节点哪条路径最短 ?


    运行时间
      整个人际关系中搜索芒果供应商, 意味你将沿着每条边前行(边: 一个人到另一个人箭头或连接), 因此运行时间至少为O(边数大O)
      还使用了队列, 其中包含检查每一个人. 将一个人添加到队列时间是固定的, 即为O(1), 因此对每个人做需要的总时间为O(人数)
      所以广度优先运行时间为O(人数+边数) => O(V+E): V为顶点(vertice)数, E为边数.  



*/

// 队列
function Queue() {
  var items = []

  this.enqueue = (ele) => {
    items.push(ele)
  }

  this.dequeue = () => {
    return items.shift()
  }

  this.front = () => {
    return items[0]
  }

  this.isEmpty = () => {
    return items.length == 0
  }

  this.size = () => {
    return items.length
  }

  this.clear = () => {
    items = []
  }

  this.print = () => {
    console.log(items.toString())
  }

  this.iterartor = ary => {
    for(var i = 0; i < ary.length; i++) {
      this.enqueue(ary[i])
    }
  }
}


// 图信息
// var graph = {
//   you: ['alice', 'bob', 'claire'],
//   bob: ['anuj', 'peggy'],
//   alice: ['peggy'],
//   claire: ['thom', 'jonny'],
//   anuj: [],
//   peggy: [],
//   thom: [],
//   jonny: [],
// }


// function checkMongoSeller() {

//   let personIsSeller = name => name[name.length - 1] == 'm'

//   let searched = []
//   let search_queue = new Queue()
//   search_queue.iterartor(graph['you'])

//   while(!search_queue.isEmpty()) {
//     let person = search_queue.dequeue()
    
//     if(searched.includes(person)) {
//       continue
//     }

//     if(personIsSeller(person)) {
//       console.log(`Yeah, ${person} is Seller !`)
//       return true
//     } 

//     search_queue.iterartor(graph[person])
//     searched.push(person)

//   }  
// }




/* 

  数据结构书中 BFS

*/

function Stack() {

  var items = []

  this.push = (ele) => {
    items.push(ele)
  }

  this.pop = () => {
    return items.pop()
  }

  this.peek = () => {
    return items[items.length - 1]
  }

  this.isEmpty = () => {
    return items.length == 0
  }

  this.size = () => {
    return items.length
  }

  this.clear = () => {
    items = []
  }

  this.print = () => {
    console.log(items.toString())
  }

}


// 字典
function Dictionary() {
  var items = {} 

  this.has = key => {
    return key in items
  }

  this.set = (key, value)  => {
    items[key] = value
  }

  this.remove = key => {
    if(this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }

  this.get = key => {
    return this.has(key) ? items[key] : undefined
  }

  this.values = () => {
    var values = []
    for(var k in items) {
      if(this.has(k)) {
        values.push(items[k])
      }
    }
    return values
  }
}


// 图
function Graph() {

  let vertices = []
  let adjList = new Dictionary()

 

  this.addVertex = v => {
    vertices.push(v)
    adjList.set(v, [])
  }

  this.addEdge = (v, w) => {
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }

  this.toString = () => {
    var str = ''  
    for(var i = 0; i < vertices.length; i++) {
      str += vertices[i] + ' -> '
      var neighbors = adjList.get(vertices[i])
      for(var j = 0; j < neighbors.length; j++) {
        str += neighbors[j] + ' '
      }
      str += '\n'
    }
    return str
  }


  // white: 白色 => 该顶点没有被访问
  // grey: 灰色 => 该顶点访问过, 但并未探索过
  // black: 黑色 => 该顶点访问过且完全探索过

  var initializeColor = () => {
    var color = []
    for(var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'
    }
    return color
  }

  // 以下是从顶点v开始的广度优先搜索算法所遵循的步骤. 
  // (1) 创建一个队列Q. 
  // (2) 将v标注为被发现的(灰色), 并将v入队列Q. 
  // (3) 如果Q非空, 则运行以下步骤：
  // (a) 将u从Q中出队列
  // (b) 将标注u为被发现的(灰色)
  // (c) 将u所有未被访问过的邻点(白色)入队列
  // (d) 将u标注为已被探索的(黑色)

  this.bfs = (v, callback) => {
    var color = initializeColor()
    var queue = new Queue()
    queue.enqueue(v)

    while(!queue.isEmpty()) {
      var u = queue.dequeue();
      var neighbors = adjList.get(u)
      color[u] = 'grey'

      for(var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          queue.enqueue(w)
        }
      }

      color[u] = 'black'
      if(callback) {
        callback(u)
      }
    }
  }

  
  /*

    使用BFS寻找最短路径

    给定一个图G和源顶点v, 找出对每个顶点u, u和v之间最短路径的距离（以边的数量计）. 
    对于给定顶点v, 广度优先算法会访问所有与其距离为1的顶点, 接着是距离为2的顶点, 以此类推. 
    所以, 可以用广度优先算法来解这个问题. 我们可以修改bfs方法以返回给我们一些信息：

    从v到u的距离distance[u]； 
    前溯点predecessors[u], 用来推导出从v到其他每个顶点u的最短路径. 

  */  

  this.BFS = (v, vertices) => {
    var color = initializeColor()
    var queue = new Queue()
    var distance = []
    var predecessors = []

    queue.enqueue(v)

    for(var i = 0; i < vertices.length; i++) {
      distance[myVertices[i]] = 0
      predecessors[myVertices[i]] = null
    }

    while(!queue.isEmpty()) {
      var u = queue.dequeue();
      var neighbors = adjList.get(u)
      color[u] = 'grey'

      for(var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          distance[w] = distance[u] + 1
          predecessors[w] = u
          queue.enqueue(w)
        }
      }
      color[u] = 'black' 
    }

    return { distance, predecessors }
  }

}


// 图 => 顶点对应关系建立
var graph = new Graph()
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for(var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B') 
graph.addEdge('A', 'C') 
graph.addEdge('A', 'D') 
graph.addEdge('C', 'D') 
graph.addEdge('C', 'G') 
graph.addEdge('D', 'G') 
graph.addEdge('D', 'H') 
graph.addEdge('B', 'E') 
graph.addEdge('B', 'F') 
graph.addEdge('E', 'I')




// 广度遍历
// function printNode(value){ 
//  console.log('Visited vertex: ' + value)
// } 
// graph.bfs(myVertices[0], printNode)
// Visited vertex: A 
// Visited vertex: B 
// Visited vertex: C 
// Visited vertex: D 
// Visited vertex: E 
// Visited vertex: F 
// Visited vertex: G 
// Visited vertex: H 
// Visited vertex: I


// 返回源顶点到其他顶点距离 & 前溯点数组
var shortestPathA = graph.BFS(myVertices[0], myVertices)
console.log(shortestPathA)

// myVertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
// console.log(graph.BFS(myVertices[0], myVertices))

// distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 , I: 3]
// predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G:"C", H: "D", I: "E"]


// 打印源顶点A到其他顶点最短路径
function printShortestPath() {
  var fromVertext = myVertices[0]
  for(var i = 1; i < myVertices.length; i++) {
    var toVertex = myVertices[i]
    var path = new Stack()

    for(var v = toVertex; v !== fromVertext; v = shortestPathA.predecessors[v]) {
      path.push(v)
    }
    path.push(fromVertext)
    var s = path.pop()
    while(!path.isEmpty()) {
      s += ' - ' + path.pop() 
    }
    console.log(s)
  }
}











