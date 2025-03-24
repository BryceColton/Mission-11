using System.ComponentModel.DataAnnotations;

namespace backendAPI.Data
{
    public class Book
    {
        [Key]
        public int BookId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Publisher { get; set; }

        [Required]
        public string ISBN { get; set; }

        [Required]
        public string Classification { get; set; } // Or Category

        [Required]
        public int PageCount { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
