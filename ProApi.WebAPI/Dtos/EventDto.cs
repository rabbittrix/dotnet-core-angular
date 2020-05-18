using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProApi.WebAPI.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }    
        public string Place { get; set; }   
        public string DateEvent { get; set; }

        [Required(ErrorMessage="The theme must be filled")]
        public string Theme { get; set; }
        public int QtdPerson { get; set; }
        public string ImageUrl { get; set; }
        public string Phone { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public List<LotDto> Lots { get; set; }
        public List<SocialNetworkDto> SocialNetworks { get; set; }
        public List<SpeakerDto> Speakers { get; set; }
    }
}