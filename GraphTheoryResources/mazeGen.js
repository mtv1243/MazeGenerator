const util = require("util");

class Vertex {
    constructor(id, edgeLength) {
        this.id = id;
        this.neighbors = [];
        this.edges = [];
        this.edgeLength = edgeLength;
        this.totalVerts = edgeLength * edgeLength;

        // south neighbor
        // is vert not on bottom row
        if( this.id < edgeLength * (edgeLength-1) ) {
            this.neighbors.push(id + edgeLength);
        }
        
        // north neighbor
        // is vert not on top row
        if( this.id > (edgeLength - 1) ) {
            this.neighbors.push(id - edgeLength);
        }

        // east neighbor
        // is vert not on right col
        // is id !== one less than a multiple of edgeLength
        if( ((this.id + 1) % edgeLength) !== 0 ) {
            this.neighbors.push(id + 1);
        }

        // west neighbor
        // is vert not on left col
        // is id a multiple of edgeLength
        if( (this.id % edgeLength) !== 0 ) {
            this.neighbors.push(id - 1);
        }
    }

}

class Graph {
    constructor(edgeLength=2){
        this.edgeLength = edgeLength;
        this.totalVerts = edgeLength * edgeLength;
        this.adjList = [];

        for(let i = 0; i < this.totalVerts; i++) {
            let vert = new Vertex(i, edgeLength);
            this.adjList.push(vert);
        }
    }

    findVert(id) {
        return this.adjList[id] ? this.adjList[id] : -1;
    }

    printNeighbors() {
        this.adjList.forEach((vert) => {
            console.log(vert.id, vert.neighbors);
        })
    }

    createEdge(vert1, vert2) {
        if(!this.findVert(vert1) || !this.findVert(vert2)) {
            return console.log("one or both verts do not exist");
        }

        this.adjList[vert1].edges.push(vert2);
        this.adjList[vert2].edges.push(vert1);
    }

    // depth first search iterative maze generation
    createMazeDfsIter(src = 0) {

        let stack = [src];
        let visited = [src];

        // while there are items in stack
        while (stack.length > 0) {
            // pop off last vert added to stack
            // this is LIFO
            let currentVertId = stack.pop();
            let currentVert = this.adjList[currentVertId];
            let hasValidNeighbors = false;

            // if a neighbor has not been visited, change hasValidNeighbors to true
            currentVert.neighbors.forEach(n => {
                if (!visited.includes(n)) {
                    hasValidNeighbors = true;
                }
            })

            // if currentVert has 1 or more unvisited neighbors
            if (hasValidNeighbors) {

                // add current to stack
                stack.push(currentVert.id);

                // find unvisited neighbors of current, hold in new array
                let validNeighbors = currentVert.neighbors.filter(n => !visited.includes(n));

                // grab random valid neighbor
                let nextVert = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];

                // create edge between current and random valid neighbor
                this.createEdge(currentVertId, nextVert);

                // push nextVert to stack and mark as visited, making it the new currentVert
                stack.push(nextVert);
                visited.push(nextVert);
            }
        }

    }
}

let graph = new Graph(5);

graph.createMazeDfsIter(0);
graph.printEdges();

// console.log(util.inspect(graph,{ depth: null }));
// graph.printNeighbors();
// graph.createEdge(6, 7);
// console.log(graph.findVert(6));
// console.log(graph.findVert(7));