class Graph {
    constructor() {
        this.adjList = [];
    }

    addVertex(){
        // add a vert
        this.adjList.push([]);
        // return the new vert's id
        return this.adjList.length-1;
    }
    addEdge(vert1, vert2){
        this.adjList[vert1].push(vert2);
        this.adjList[vert2].push(vert1);
    }
    // depth first search sometimes called dft for depth first traverse (same difference)
    dfs(src){
        let visited = [];
        // start at the source
        // this will hold all the edges of the currentVert variable
        let stack = [src];

        // while there are verts to visit...
        while(stack.length > 0) {
            // popping off the last one makes this LIFO
            // 0 > 1 > 2 > 3 > 4
            let currentVert = stack.pop();
            // has the current vert NOT been visited?
            if(!visited.includes(currentVert)) {
                // add the current vert to the visited array
                visited.push(currentVert);

                // collect the verts connected to the currect vert
                // looks at the values in the vert in the adjList
                let edges = this.adjList[currentVert];
                
                // iterate through the edges of the currentVert
                // add the edges to the stack of verts to check
                for(let i=0;i<edges.length;i++){
                    stack.push(edges[i]);
                }
            }
        }

        return visited;
    }

    bfs(src){
        let visited = [];
        let queue = [src];
        while(queue.length > 0) {
            // remove vert from the beginning of queue
            let currentVert = queue.shift();

            // has the array NOT been visited?
            if(!visited.includes(currentVert)) {
                // add the current vert to the visited array
                visited.push(currentVert);

                // collect the edges of the currect vert
                let edges = this.adjList[currentVert];
                
                // add the edges to the stack
                for(let i=0;i<edges.length;i++){
                    queue.push(edges[i]);
                }
            }
        }

        return visited;

    }
    // make these for homework
    // removeEdge(){}
    // removeVertex(){}
}

let graph = new Graph();
let zeroId = graph.addVertex();
let oneId = graph.addVertex();
let twoId = graph.addVertex();
let threeId = graph.addVertex();
let fourId = graph.addVertex();

graph.addEdge(zeroId, oneId);
graph.addEdge(oneId, twoId);
graph.addEdge(twoId, threeId);
graph.addEdge(threeId, fourId);

// 0 > 1 > 2 > 3 > 4

let result = graph.bfs(1);

console.log(result);