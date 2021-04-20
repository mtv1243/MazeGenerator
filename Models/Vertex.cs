using System.Collections.Generic;

namespace MazeGenerator.Models
{
    public class Vertex
    {
        public int Id { get; set; }
        public List<int> Neighbors { get; set; }
        public List<int> Edges { get; set; }

        public Vertex(int edgeLength, int id)
        {
            Neighbors = new List<int>();
            Edges = new List<int>();
            Id = id;

            // north neighbor
            // is vert not on top row
            if (Id > (edgeLength - 1))
            {
                Neighbors.Add(Id - edgeLength);
            }

            // east neighbor
            // is vert not on right col
            // is id !== one less than multiple of edgeLength
            if (((Id + 1) % edgeLength) != 0)
            {
                Neighbors.Add(Id + 1);
            }

            // south neighbor
            // is vert on bottom row
            if (Id < edgeLength * (edgeLength - 1))
            {
                Neighbors.Add(Id + edgeLength);
            }

            // west neighbor
            // is vert on right col
            // is id multiple of edgeLength
            if ((Id % edgeLength) != 0)
            {
                Neighbors.Add(Id - 1);
            }
        }
    }
}