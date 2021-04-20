using MazeGenerator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazeGenerator.Services
{
    public class SquareMazeService : IMazeService
    {
        public string GenerationAlgorithm { get; set; }
        public IMaze Maze { get; set; }
        public SquareMazeService(string generationAlgorithm, int edgeLength)
        {
            GenerationAlgorithm = generationAlgorithm;
            Maze = new SquareMaze(edgeLength);
        }
        public IMaze GenerateMaze()
        {
            
            if (GenerationAlgorithm == "aldous")
            {
                Maze = GenerateAldous();
            }
            return Maze;
        }

        private IMaze GenerateAldous()
        {
            throw new NotImplementedException();
        }
    }
}
