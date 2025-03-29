using backendAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backendAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private BooksDbContext _booksContext;

        public BooksController(BooksDbContext temp) => _booksContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string? sortBy = null)
        {

            var query = _booksContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortBy.ToLower() == "title_asc")
                    query = query.OrderBy(b => b.Title);
                else if (sortBy.ToLower() == "title_desc")
                    query = query.OrderByDescending(b => b.Title);
            }

            var totalNumBooks = query.Count();


            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var someBook = new
            {
                numBooks = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someBook);
        }

    }
}
