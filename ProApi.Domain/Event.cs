using System;
using System.Collections.Generic;

namespace ProApi.Domain
{
    public class Event
    {
        public int Id { get; set; }    
        public string Place { get; set; }   
        public DateTime DateEvent { get; set; }
        public string Theme { get; set; }
        public int QtdPerson { get; set; }
        public string ImageUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<Lot> Lots { get; set; }
        public List<SocialNetwork> SocialNetworks { get; set; }
        public List<SpeakerEvent> SpeakerEvents { get; set; }
    }
}