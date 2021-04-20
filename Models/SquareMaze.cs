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
        public List<Vertex> Graph { get; set; }

        public SquareMaze(int edgeLength)
        {
            Graph = new List<Vertex>();
            EdgeLength = EdgeLength;

            for(int i = 0; i < EdgeLength; i++)
            {
                Vertex vertex = new Vertex(EdgeLength, i);

                Graph.Add(vertex);
            }
        }
    }
}
