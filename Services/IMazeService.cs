using MazeGenerator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazeGenerator.Services
{
    public interface IMazeService
    {
        string GenerationAlgorithm { get; set; }
        IMaze GenerateMaze();
        IMaze Maze { get; set; }
    }
}