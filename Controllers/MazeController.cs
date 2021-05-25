using MazeGenerator.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace MazeGenerator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MazeController : Controller
    {
        public DateTime Time { get; set; }

        private IMaze Maze { get; set; }

        // GET /maze
        [HttpGet]
        public ViewResult MazeForm()
        {
            return View();
        }

        // POST /maze
        [HttpPost]
        public ViewResult MazeForm(int edgeLength, string algorithm)
        {

            string json;

            IFormCollection request = Request.Form;

            

            //json = JsonConvert.SerializeObject(request, Formatting.Indented);

            int width = Convert.ToInt32(request["EdgeLength"]);
            string generationAlgorithm = request["GenerationAlgorithm"];

            Console.WriteLine(width.ToString(), generationAlgorithm);

            Maze = new SquareMaze(width);
            Maze.CreateMazeAldous();

            ViewData["Maze"] = Maze;

            return View("DisplayMaze");
        }
    }
}
