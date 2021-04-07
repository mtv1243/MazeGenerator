using MazeGenerator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazeGenerator.Services
{
    public interface IMazeService
    {
        int Height { get; set; }
        int Width { get; set; }
        int StartingPoint { get; set; }
        IMaze GenerateMaze();
    }
}
/*
 
 */