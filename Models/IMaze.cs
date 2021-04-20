using System.Collections.Generic;

namespace MazeGenerator.Models
{
    public interface IMaze
    {
        int EdgeLength { get; set; }
        int StartingPoint { get; set; }
        List<Vertex> Graph { get; set; }
    }
}