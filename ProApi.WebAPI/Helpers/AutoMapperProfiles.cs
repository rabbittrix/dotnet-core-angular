using System.Linq;
using AutoMapper;
using ProApi.Domain;
//using ProApi.Domain.Identity;
using ProApi.WebAPI.Dtos;

namespace ProApi.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()     
        {
            CreateMap<Event, EventDto>()
                .ForMember(dest => dest.Speakes, opt => {
                    opt.MapFrom(src => src.SpeakesEvents.Select(
                        x => x.Speaker).ToList());
                }).reverseMap(); 
                
            CreateMap<Speaker, SpeakeDto>()
                .ForMember(dest => dest.Events, opt =>{
                    opt.MapFrom(src => src.SpeakesEvents.Select(
                        x => x.Speaker).ToList());
                }).reverseMap();

            CreateMap<Lot, LotDto>().reverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().reverseMap();
        }
    }
}