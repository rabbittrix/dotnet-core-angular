using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProApi.Domain;
using ProApi.Repository;

namespace ProApi.Repository
{
  public class ProApiRepository : IProApiRepository
  {
    private readonly ProApiContext _context;
    
    public ProApiRepository(ProApiContext context){
      _context = context;
      _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    //Gerais
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

     public void Update<T>(T entity) where T : class
    {
      _context.Update(entity);
    }    

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

    public async Task<bool> SaveChangeAsync()
    {
      return (await _context.SaveChangesAsync()) > 0;
    }  

    //Event
    public async Task<Event[]> GetAllEventAsync(bool includeSpeakers = false)
    {
      IQueryable<Event> query = _context.Events
        .Include(c => c.Lots)
        .Include(c => c.SocialNetworks);

        if(includeSpeakers){
          query = query
          .Include(sp => sp.SpeakerEvents)
          .ThenInclude(sp => sp.Speakers);
        }
        query = query.AsNoTracking()
        .OrderBy(c => c.Id);
        return await query.ToArrayAsync();
    }

    public async Task<Event[]> GetAllEventAsyncByTheme(string theme, bool includeSpeakers)
    {
      IQueryable<Event> query = _context.Events
        .Include(c => c.Lots)
        .Include(c => c.SocialNetworks);

        if(includeSpeakers){
          query = query
          .Include(sp => sp.SpeakerEvents)
          .ThenInclude(sp => sp.Speakers);
        }
        query = query.AsNoTracking()
          .OrderByDescending(c => c.DateEvent)
          .Where(c => c.Theme.ToLower().Contains(theme.ToLower()));
          
        return await query.ToArrayAsync();
    }

    public async Task<Event> GetEventAsyncById(int EventId, bool includeSpeakers)
    {
      IQueryable<Event> query = _context.Events
        .Include(c => c.Lots)
        .Include(c => c.SocialNetworks);

        if(includeSpeakers){
          query = query
          .Include(sp => sp.SpeakerEvents)
          .ThenInclude(sp => sp.Speakers);
        }
        query = query.AsNoTracking()
          .OrderBy(c => c.Id)
          .Where(c => c.Id == EventId);
        return await query.FirstOrDefaultAsync();
    }    
    
    //Speaker     
    public async Task<Speaker> GetSpeakerAsync(int SpeakerId, bool includeEvents = false)
    {
      IQueryable<Speaker> query = _context.Speakers
        .Include(c => c.SocialNetworks);

        if(includeEvents){
          query = query
          .Include(sp => sp.SpeakerEvents)
          .ThenInclude(e => e.Event);
        }
        query = query.AsNoTracking()
        .OrderBy(s => s.Name)
        .Where(s => s.Id == SpeakerId);
        return await query.FirstOrDefaultAsync();
    }

    public async Task<Speaker[]> GetAllSpeakerAsyncByName(string name, bool includeEvents = false)
    {
      IQueryable<Speaker> query = _context.Speakers
        .Include(c => c.SocialNetworks);

        if(includeEvents){
          query = query
          .Include(sp => sp.SpeakerEvents)
          .ThenInclude(e => e.Event);
        }
        query = query.AsNoTracking()
        .Where(s => s.Name.ToLower().Contains(name.ToLower()));
        return await query.ToArrayAsync();
    }

  }
}