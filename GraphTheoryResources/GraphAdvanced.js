const util = require("util");
// let vert1 = new Vertex(0, "Zero");
// let vert1 = new Vertex(1, "One");
// let vert1 = new Vertex(2, "Two");

// let edge0_1 = new Edge(1, 15);
// let edge0_1 = new Edge(2, 5);

// in a map you can use an instance of a class as a key
// allows you to use other data types as keys
// obect as key
// array of objects as value
// {{id:0,label:"zero"}: [{weight:3, vertex:1}]}

class Vertex {
    constructor(id, label){
        this.id = id;
        this.label = label;
    }
}

class Edge {
    constructor(id, weight) {
        this.id = id;
        this.weight = weight;
    }
}

class Graph {
    constructor(directed=false, weighted=false){
        this.adjMap = new Map();
        this.directed = directed;
        this.weighted = weighted;
    }
    addVertex(id, label /* can add additional data points here */) {
        let vertex = new Vertex(id, label);
        
        // initialize vertex as the key, array of edges as value
        this.adjMap.set(vertex, []);
    }
    getVertex(id) {
        let vertex;
        this.adjMap.forEach((value, key)=>{
            if(key.id === id) {
                vertex = key;
            }
        })
        return vertex;
    }

    addEdge (srcId, destId, weight){
        let srcVertex = this.getVertex(srcId);
        // get every edge connected to the srcVert, as an array
        let srcEdges = this.adjMap.get(srcVertex);
        // add new edge to the list 
        srcEdges.push(this.weighted ? new Edge(destId, weight) : destId)

        this.adjMap.set(srcVertex, srcEdges);

        // do if weighted graph
        if(!this.directed) {
            let destVertex = this.getVertex(destId);
            // get every edge connected to the srcVert, as an array
            let destEdges = this.adjMap.get(destVertex);
            // add new edge to the list 
            destEdges.push(this.weighted ? new Edge(srcId, weight) : srcId)

            this.adjMap.set(destVertex, destEdges);
        }
        // maybe add language that will do something if the id's don't exist
    }

    dfs(srcId) {
        let visited = [];
        let stack = [srcId];
        while (stack.length > 0 ){
            let currentVertexId = stack.pop();
            if(!visited.includes(currentVertexId)){
                visited.push(currentVertexId);
                let edgeList = this.adjMap.get(this.getVertex(currentVertexId));
                for(let i=0;i<edgeList.length;i++) {
                    stack.push(this.weighted ? edgeList[i].id : edgeList[i]);
                }
            }
        }
        return visited;
    }

    bfs(srcId) {
        let visited = [];
        let queue = [srcId];
        while (queue.length > 0 ){
            let currentVertexId = queue.shift();
            if(!visited.includes(currentVertexId)){
                visited.push(currentVertexId);
                let edgeList = this.adjMap.get(this.getVertex(currentVertexId));
                for(let i=0;i<edgeList.length;i++) {
                    queue.push(this.weighted ? edgeList[i].id : edgeList[i]);
                }
            }
        }
        return visited;
    }
}

let graph = new Graph(false, true);

graph.addVertex(0, "zero");
graph.addVertex(1, "one");
graph.addVertex(2, "two");
graph.addVertex(3, "three");

graph.addEdge(0, 1, 15);
graph.addEdge(1, 2, 5);
graph.addEdge(2, 3, 25);
// graph.addEdge(3, 0, 50);

// console.log(graph)

// console.log(util.inspect(graph, true, 5, true));

let result = graph.bfs(2);
// 0 - 1 - 2 - 3
console.log(result);

// result = graph.getVertex(3);

// console.log(result);