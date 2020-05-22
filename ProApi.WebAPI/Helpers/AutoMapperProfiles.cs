using System.Linq;
using AutoMapper;
using ProApi.Domain;
using ProApi.Domain.Identity;
//using ProApi.Domain.Identity;
using ProApi.WebAPI.Dtos;

namespace ProApi.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()     
        {
            CreateMap<Event, EventDto>()
                .ForMember(dest => dest.Speakers, opt => {
                    opt.MapFrom(src => src.SpeakerEvents.Select(
                        x => x.Speakers).ToList());
                }).ReverseMap(); 
                
            CreateMap<Speaker, SpeakerDto>()
                .ForMember(dest => dest.Events, opt =>{
                    opt.MapFrom(src => src.SpeakerEvents.Select(
                        x => x.Speakers).ToList());
                }).ReverseMap();

            CreateMap<Lot, LotDto>().ReverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}