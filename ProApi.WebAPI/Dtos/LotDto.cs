using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProApi.WebAPI.Dtos
{
    public class LotDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string DateStart { get; set; }
        public string DateEnd { get; set; }
        public int Quantity { get; set; }
    }
}