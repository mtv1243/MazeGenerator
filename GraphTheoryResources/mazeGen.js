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
}

let graph = new Graph(5);

console.log(util.inspect(graph,{ depth: null }));
// graph.printNeighbors();
// graph.createEdge(6, 7);
// console.log(graph.findVert(6));
// console.log(graph.findVert(7));