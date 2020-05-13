namespace ProApi.Domain
{
    public class SpeakerEvent
    {
        public int SpeakerId { get; set; }
        public Speaker Speakers { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}