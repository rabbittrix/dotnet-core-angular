using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProApi.Repository;

namespace ProApi.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProApiController : Controller
    {
       public readonly ProApiContext _context;
       public ProApiController(ProApiContext context){
           _context = context;
       }

       [HttpGet]
       public async Task<IActionResult> Get(){
           try
           {
               var results = await _context.Events.ToListAsync();
               return Ok(results);
           }
           catch (System.Exception)
           {               
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
           }
       }

       // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var results = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);
                
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
            }  
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
    
}