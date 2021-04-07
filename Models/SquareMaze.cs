using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazeGenerator.Models
{
    public class SquareMaze : IMaze
    {
        public int[][] Graph { get; set; }
    }
}
