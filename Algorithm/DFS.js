/*

  深度优先(Depth-First Search) => O(V + E)

    深度优先搜索算法将会从第一个指定的顶点开始遍历图, 沿着路径直到这条路径最后一个顶点被访问了, 
    接着原路回退并探索下一条路径. 换句话说, 它是先深度后广度地访问顶点. 

  深度优先搜索算法不需要一个源顶点. 在深度优先搜索算法中, 若图中顶点v未访问, 则访问该顶点v. 
  要访问顶点v, 照如下步骤做. 
  (1) 标注v为被发现的（灰色）. 
  (2) 对于v的所有未访问的邻点w：
    (a) 访问顶点w. 
  (3) 标注v为已被探索的（黑色）. 
  如你所见, 深度优先搜索的步骤是递归的, 这意味着深度优先搜索算法使用栈来存储函数调
  用（由递归调用所创建的栈）. 

*/


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


  var dfsVisit = (u, color, callback) => {
    color[u] = 'grey'
    callback && callback(u)

    var neighbors = adjList.get(u)
    for(var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i]
      if(color[w] === 'white') {
        dfsVisit(w, color, callback)
      }
    }
    color[u] = 'black'
  }
  

  this.DFS = (callback) => {
    var color = initializeColor()
    for(var i = 0; i < vertices.length; i++) {
      if(color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback)
      }
    }
  }

  // 探索深度优先算法 => 拓扑排序 => 图的发现 & 完成时间

  //  对于给定的图G, 我们希望深度优先搜索算法遍历图G的所有节点
  //  构建“森林”（有根树的一个集合）以及一组源顶点（根）, 并输出两个数组：发现时间和完成探索时间. 
  //  我们可以修改dfs方法来返回给我们一些信息: 
  //    顶点u的发现时间d[u]
  //    当顶点u被标注为黑色时, u的完成探索时间f[u];
  //    顶点u的前溯点p[u].

  var time = 0

  var DFSVisit2 = (u, color, d, f, p) => {
    console.log('discovered', u)
    color[u] = 'grey'

    d[u] = ++time
    var neighbors = adjList.get(u)
    for(var i = 0; i< neighbors.length; i++) {
      var w = neighbors[i]
      if(color[w] === 'white') {
        p[w] = u
        DFSVisit2(w, color, d, f, p)
      }
    }
    color[u] = 'black'
    f[u] = ++time
    console.log('explored' + u)
  }


  this.DFS2 = () => {
    var color = initializeColor()
    var d = [], f = [], p = []
    time = 0

    for(var i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0
      d[vertices[i]] = 0
      p[vertices[i]] = null
    }

    for(i = 0; i < vertices.length; i++) {
      if(color[vertices[i]] === 'white') {
        DFSVisit2(vertices[i], color, d, f, p)
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
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



// graph.DFS(printNode)
// function printNode(value){ 
//  console.log('Visited vertex: ' + value)
// } 


graph.DFS2()

