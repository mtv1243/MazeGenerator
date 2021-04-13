// const util = require("util");

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

    createMazeAldous() {
        // pick random vertex, add to maze
        let currentVert = this.adjList[Math.floor(Math.random() * this.adjList.length)];
        let maze = [currentVert.id];

        // while any cells are not in maze
        while (maze.length < this.adjList.length) {
            // choose random neighbor of currentVert and travel to it
            let r = Math.floor(Math.random() * currentVert.neighbors.length);
            let neighbor = currentVert.neighbors[r];

            // if neighbor not in maze, add it to maze and create edge
            if (maze.indexOf(neighbor) === -1) {
                this.createEdge(currentVert.id, neighbor);
                maze.push(neighbor);
            }
            // step to the neighbor, making it the new currentVert
            currentVert = this.adjList[neighbor];
        }
    }

    createMazeWilsons() {

        let maze = [];
        let options = [];

        // populate the options array with ints from 0 to length of adjacency list
        // this is a mutable stand-in for the adjacency list
        for (let i = 0; i < this.adjList.length; i++) {
            options[i] = i;
        }

        // choose random vertexId to start with, remove from options
        let randVert = Math.floor(Math.random() * options.length);
        maze.push(randVert);
        options.splice(randVert, 1);

        // performs the loop erased walk
        // while there are vertices not in the maze
        while (maze.length < this.adjList.length) {

            // select any vertex not in maze and perform random walk until you encounter a vertex in the maze
            let root = options[Math.floor(Math.random() * options.length)];
            let path = [root];

            // performs the walk
            while (true) {

                // get random neighbor of last in path
                let step = path[path.length - 1];

                let randNeighbor = this.adjList[step].neighbors[Math.floor(Math.random() * this.adjList[step].neighbors.length)];

                // is neighbor in maze?
                if (maze.indexOf(randNeighbor) !== -1) {

                    // add path to maze
                    path.forEach(el => {
                        maze.push(el);
                        options.splice(options.indexOf(el), 1);
                    });

                    // add randNeighbor to path AFTER path has been added to maze
                    // randNeighbor is already in maze according to the if statement above
                    path.push(randNeighbor);

                    // make the necessary edges along the path
                    for (let i = 0; i < path.length - 1; i++) {
                        this.createEdge(path[i], path[i + 1]);
                    }

                    break;
                }
                // is neighbor in path?
                if (path.indexOf(randNeighbor) !== -1) {
                    // if yes,
                    // remove all from path after neighbor
                    path.splice(path.indexOf(randNeighbor) + 1);

                    if (path.length <= 0) {
                        break;
                    }
                } else {
                    // step to the random neighbor for the next iteration of the walk
                    path.push(randNeighbor);
                }
            }
        }
    }

    visualize() {
        let binaryEdges = [];
        // for each vert in adjList
        for (let i = 0; i < this.totalVerts; i++) {

            // find potential neighbors
            // does not matter if they are valid neighbors, must have all four numbers
            let north = i - this.edgeLength;
            let east = i + 1;
            let south = i + this.edgeLength;
            let west = i - 1;
            let row = Math.floor(i / this.edgeLength);

            // get the edges of the current vert
            let currentEdges = this.adjList[i].edges;

            // create container of binary edges
            let currentBinaryEdges = [];

            // if row does not exist, create it
            if (!binaryEdges[row]) {
                binaryEdges[row] = [];
            }

            // does each neighbor exist in current edges?
            // check north
            if (currentEdges.indexOf(north) !== -1) {
                currentBinaryEdges.push(1);
            } else {
                currentBinaryEdges.push(0);
            }

            // check east
            if (currentEdges.indexOf(east) !== -1) {
                currentBinaryEdges.push(1);
            } else {
                currentBinaryEdges.push(0);
            }

            // check south
            if (currentEdges.indexOf(south) !== -1) {
                currentBinaryEdges.push(1);
            } else {
                currentBinaryEdges.push(0);
            }

            // check west
            if (currentEdges.indexOf(west) !== -1) {
                currentBinaryEdges.push(1);
            } else {
                currentBinaryEdges.push(0);
            }

            binaryEdges[row].push(currentBinaryEdges);
        }
        return binaryEdges;
    }
}

// let graph = new Graph(5);

// graph.createMazeDfsIter(0);
// graph.printEdges();

// console.log(util.inspect(graph,{ depth: null }));
// graph.printNeighbors();
// graph.createEdge(6, 7);
// console.log(graph.findVert(6));
// console.log(graph.findVert(7));