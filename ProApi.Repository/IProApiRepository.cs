using System.Threading.Tasks;
using ProApi.Domain;

namespace ProApi.Repository
{
    public interface IProApiRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         void DeleteRange<T>(T[] entity) where T : class;
         Task<bool> SaveChangesAsync();

         //Events
         Task<Event[]> GetAllEventAsyncByTheme(string theme, bool includeSpeakers);
         Task<Event[]> GetAllEventAsync(bool includeSpeakers);
         Task<Event> GetEventAsyncById(int EventId, bool includeSpeakers);

         //Speakers
         Task<Speaker[]> GetAllSpeakerAsyncByName(string name, bool includeEvents);
         Task<Speaker> GetSpeakerAsync(int SpeakerId, bool includeEvents);
    }
}