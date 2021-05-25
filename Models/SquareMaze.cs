using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazeGenerator.Models
{
    public class SquareMaze : IMaze
    {
        public int EdgeLength { get; set; }
        public int StartingPoint { get; set; }
        public Algorithm GenerationAlgorithm { get; set; }
        public List<Vertex> Graph { get; set; }

        public SquareMaze(int edgeLength)
        {
            Graph = new List<Vertex>();
            EdgeLength = edgeLength;

            for (int i = 0; i < EdgeLength * EdgeLength; i++)
            {
                Vertex vertex = new Vertex(EdgeLength, i);

                Graph.Add(vertex);
            }
        }

        public void CreateEdge(int vert1, int vert2)
        {
            Graph[vert1].Edges.Add(vert2);
            Graph[vert2].Edges.Add(vert1);
        }

        public void CreateMazeAldous()
        {
            // create random number between 0 and # of vertices in graph
            Random r = new Random();
            int randomIndex = r.Next(0, Graph.Count);
            Console.WriteLine($"randomIndex: {randomIndex}");

            // grab the random vertex from the graph
            Vertex currentVertex = Graph[randomIndex];
            
            // create maze variable
            List<int> maze = new List<int>();

            // add the random vertex to the maze
            maze.Add(currentVertex.Id);

            // while there are vetices not in the maze
            while(maze.Count < Graph.Count)
            {
                // choose random neighbor of current vertex and travel to it
                int neighborIndex = r.Next(0, currentVertex.Neighbors.Count);
                int neighbor = currentVertex.Neighbors[neighborIndex];

                // if neighbor is not in the maze, add it to the maze and create an edge
                if( maze.Contains(neighbor) == false )
                {
                    this.CreateEdge(currentVertex.Id, neighbor);
                    maze.Add(neighbor);
                }

                // step to the neighbor and repeat
                currentVertex = Graph[neighbor];
            }
        }

        public List<List<List<int>>> Visualize()
        {
            List<List<List<int>>> binaryEdges = new List<List<List<int>>>();

            // for each vertex in the graph
            for (int i = 0; i < Graph.Count; i++)
            {
                // find potential neighbors
                int north = i - EdgeLength;
                int east = i + 1;
                int south = i + EdgeLength;
                int west = i - 1;
                int row = i / EdgeLength;

                // get edges of current vertex
                List<int> currentEdges = Graph[i].Edges;

                // create container of binary edges
                List<int> currentBinaryEdges = new List<int>();

                // if row does not exit create it
                //if (binaryEdges.Count < row)
                if (row >= binaryEdges.Count)
                {
                    List<List<int>> emptyRow = new List<List<int>>();
                    binaryEdges.Add(emptyRow);
                }

                // does each neighbor exist in current edges?
                // check north
                if (currentEdges.Contains(north))
                {
                    currentBinaryEdges.Add(1);
                } else
                {
                    currentBinaryEdges.Add(0);
                }

                // check east
                if (currentEdges.Contains(east))
                {
                    currentBinaryEdges.Add(1);
                }
                else
                {
                    currentBinaryEdges.Add(0);
                }

                // check south
                if (currentEdges.Contains(south))
                {
                    currentBinaryEdges.Add(1);
                }
                else
                {
                    currentBinaryEdges.Add(0);
                }

                // check west
                if (currentEdges.Contains(west))
                {
                    currentBinaryEdges.Add(1);
                }
                else
                {
                    currentBinaryEdges.Add(0);
                }

                // add currentEdges to binaryEdges
                binaryEdges[row].Add(currentBinaryEdges);
            }
            return binaryEdges;
        }

        public void PrintEdges()
        {
            for(int i = 0; i < Graph.Count; i++)
            {
                Console.WriteLine($"vert:{i}, [{Graph[i].Edges}]");
            }
        }
    }
}
