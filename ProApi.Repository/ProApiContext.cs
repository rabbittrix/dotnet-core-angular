using Microsoft.EntityFrameworkCore;
using ProApi.Domain;

namespace ProApi.Repository
{
    public class ProApiContext : DbContext    
    {
        public ProApiContext(DbContextOptions<ProApiContext> options): base (options){}
        public DbSet<Event> Events { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<SpeakerEvent> SpeakerEvents { get; set; }
        public DbSet<Lot> Lots { get; set; }
        public DbSet<SocialNetwork> SocialNetworks { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<SpeakerEvent>()
            .HasKey(PE => new {PE.EventId, PE.SpeakerId});
        }
    }
}