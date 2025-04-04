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
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string? sortBy = null, [FromQuery] List<string>? projectTypes = null)
        {

            var query = _booksContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortBy.ToLower() == "title_asc")
                    query = query.OrderBy(b => b.Title);
                else if (sortBy.ToLower() == "title_desc")
                    query = query.OrderByDescending(b => b.Title);
            }

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.Category));
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


        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookTypes = _booksContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }


        [HttpPost("AddBook")]
        public IActionResult AddProject([FromBody] Book newBook)
        {
            _booksContext.Books.Add(newBook);
            _booksContext.SaveChanges();
            return Ok(newBook);
        }


        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateProject(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _booksContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;


            _booksContext.Books.Update(existingBook);
            _booksContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteProject(int bookId)
        {
            var book = _booksContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _booksContext.Books.Remove(book);
            _booksContext.SaveChanges();

            return NoContent();
        }

    }
}
