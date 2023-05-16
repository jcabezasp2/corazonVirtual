using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using aspnetapp.Models;
using aspnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace aspnetapp.Controllers
{
    [Route("images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly dataContext _context;


        public ImagesController(dataContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Upload an image
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /images
        ///
        /// </remarks>
        /// <returns>Route of uploaded image</returns>
        /// <response code="200">Returns the image route</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [HttpPost]
        public async Task<ActionResult<string>> PostImage([FromForm] Image image)
        {
            if (image.Img != null)
            {
                var img = image.Img;
                var extension = img.FileName.Split('.').Last(); 
                var imageName = $"{Guid.NewGuid()}.{extension}";
                var folder = ""; 

                if(extension == "fbx"){
                    folder = "images3d";
                }else if(extension == "png" || extension == "jpg" || extension == "jpeg"){
                    folder = "images";
                }else {
                    return StatusCode(415, "Unsupported Media Type");
                }

                var imagePath = $"{folder}/{imageName}";
                var imageFullPath = $"public/{imagePath}";
                if(!System.IO.Directory.Exists($"public/{folder}"))
                {
                    System.IO.Directory.CreateDirectory($"public/{folder}");
                } 
                using (var stream = System.IO.File.Create(imageFullPath))
                {
                    await img.CopyToAsync(stream);
                }
                
                return imagePath;
            }

            return BadRequest();
        }




    }
}