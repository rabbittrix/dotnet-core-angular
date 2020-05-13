using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProApi.Domain;
using ProApi.Repository;

namespace ProApi.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase{

        private readonly IProApiRepository _repo;
        public EventController(IProApiRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
       public async Task<IActionResult> Get(){
           try
           {
               var results = await _repo.GetAllEventAsync(true);
               return Ok(results);
           }
           catch (System.Exception)
           {               
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
           }
       }

       [HttpGet("{EventId}")]
       public async Task<IActionResult> Get(int EventId){
           try
           {
               var results = await _repo.GetAllEventAsync(true);
               return Ok(results);
           }
           catch (System.Exception)
           {               
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
           }
       }

       [HttpGet("getByTheme/{theme}")]
       public async Task<IActionResult> Get(string theme){
           try
           {
               var results = await _repo.GetAllEventAsyncByTheme(theme, true);
               return Ok(results);
           }
           catch (System.Exception)
           {               
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
           }
       }

       [HttpPost]
       public async Task<IActionResult> Post(Event model){
           try
           {
               _repo.Add(model);
               if(await _repo.SaveChangeAsync()){
                   return Created($"/api/event/{model.Id}", model);
               }
           }
           catch (System.Exception)
           {               
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
           }
           return BadRequest();
       }

       [HttpPut("{EventId}")]
       public async Task<IActionResult> Put(int EventId, Event model){
           try
           {
               var event = await _repo.GetEventAsyncById(EventId, false);
               if(event == null) return NotFound();
               _repo.Update(model);
               if(await _repo.SaveChangeAsync()){
                   return Created($"/api/event/{model.Id}", model);
               }
           }
           catch (System.Exception)
           {               
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
           }
           return BadRequest();
       }

       [HttpDelete("{EventId}")]
        public async Task<IActionResult> Delete(int EventId)
        {
            try
            {
                var event = await _repo.GetEventAsyncById(EventId, false);
                if (event == null) return NotFound();

                _repo.Delete(event);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }
    }
}