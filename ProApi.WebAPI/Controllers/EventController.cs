using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ProApi.Domain;
using ProApi.Repository;
using ProApi.WebAPI.Dtos;

namespace ProApi.WebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class EventController : ControllerBase
  {
    private readonly IProApiRepository _repo;
    public readonly IMapper _mapper;
    public EventController(IProApiRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var events = await _repo.GetAllEventAsync(true);
        var results = _mapper.Map<EventDto[]>(events);
        return Ok(results);
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
      }
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload()
    {
      try
      {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources", "Images");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

        if (file.Length > 0)
        {
          var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
          var fullPath = Path.Combine(pathToSave, filename.Replace("\"", " ").Trim());

          using (var stream = new FileStream(fullPath, FileMode.Create))
          {
            file.CopyTo(stream);
          }
        }

        return Ok();
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, $"Database Failed {ex.Message}");
      }

      return BadRequest("Error trying to upload");
    }

    [HttpGet("{EventId}")]
    public async Task<IActionResult> Get(int EventId)
    {
      try
      {
        var GetEventAsyncById = await _repo.GetEventAsyncById(EventId, true);
        var results = _mapper.Map<EventDto>(GetEventAsyncById);
        return Ok(results);
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
      }
    }

    [HttpGet("getByTheme/{theme}")]
    public async Task<IActionResult> Get(string theme)
    {
      try
      {
        var events = await _repo.GetAllEventAsyncByTheme(theme, true);
        var results = _mapper.Map<EventDto[]>(events);
        return Ok(results);
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
      }
    }

    [HttpPost]
    public async Task<IActionResult> Post(EventDto model)
    {
      try
      {
        var GetEventAsyncById = _mapper.Map<Event>(model);
        _repo.Add(GetEventAsyncById);
        if (await _repo.SaveChangesAsync())
        {
          return Created($"/api/event/{model.Id}", _mapper.Map<EventDto>(GetEventAsyncById));
        }
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failed");
      }
      return BadRequest();
    }

    [HttpPut("{EventId}")]
    public async Task<IActionResult> Put(int EventId, EventDto model)
    {
      try
      {
        var GetEventAsyncById = await _repo.GetEventAsyncById(EventId, false);
        if (GetEventAsyncById == null) return NotFound();

        var idLots = new List<int>();
        var idSocialNetworks = new List<int>();

        model.Lots.ForEach(item => idLots.Add(item.Id));
        model.SocialNetworks.ForEach(item => idSocialNetworks.Add(item.Id));

        var lots = evento.Lots.Where(
            lot => !idLots.Contains(lot.Id)
        ).ToArray();

        var socialNetworks = evento.SocialNetworks.Where(
            rede => !idLoes.Contains(rede.Id)
        ).ToArray();

        if (lots.Length > 0) _repo.DeleteRange(lotes);
        if (socialNetworks.Length > 0) _repo.DeleteRange(socialNetworks);

        _mapper.Map(model, GetEventAsyncById);
        _repo.Update(GetEventAsyncById);
        if (await _repo.SaveChangesAsync())
        {
          return Created($"/api/event/{model.Id}", _mapper.Map<EventDto>(GetEventAsyncById));
        }
      }
      catch (System.Exception ex)
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
        var GetEventAsyncById = await _repo.GetEventAsyncById(EventId, false);
        if (GetEventAsyncById == null) return NotFound();

        _repo.Delete(GetEventAsyncById);

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