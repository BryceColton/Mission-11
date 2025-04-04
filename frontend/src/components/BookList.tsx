import { useEffect, useState } from "react";
import { Book } from "../types/Book"
import { useNavigate } from "react-router-dom";
import '../App.css'
import { fetchBooks } from "../api/Books.api";
import Pagination from "./Pagination";
function BookList({selectedCategories} : {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10)
    const [pageNum, setPageNum ] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [ sortBy, setSortBy] = useState<string>('title_asc')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        const loadProjects = async () => {

            try { 
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, sortBy, selectedCategories)
    
            setBooks(data.numBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize))
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setLoading(false);
        }
        };

        loadProjects();
    }, [pageSize, pageNum, sortBy, selectedCategories]);

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <>
            <h1>Books</h1>
            <br />
            {books.map((b) => (
                <div id="projectCard" className="card" key={b.bookId}>
                    <h3 className="card-title">{b.title}</h3>

                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Author: </strong>
                                {b.author}
                            </li>
                            <li>
                                <strong>Publisher: </strong>
                                {b.publisher}
                            </li>
                            <li>
                                <strong>ISBN: </strong>
                                {b.isbn}
                            </li>
                            <li>
                                <strong>Book Classification: </strong>
                                {b.classification}
                            </li>
                            <li>
                                <strong>Book Category: </strong>
                                {b.category}
                            </li>
                            <li>
                                <strong>Book Page Count: </strong>
                                {b.pageCount}
                            </li>
                            <li>
                                <strong>Book Price: </strong>
                                {b.price}
                            </li>
                        </ul>

                        <button className="btn btn-outline-primary" onClick={() => navigate(`/BuyPage/${b.title}/${b.bookId}/${b.price}`)}>Purchase</button>
                    </div>
                 
                </div>
            ))}

            <Pagination 
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);
            }}
            />

        </>

    )
}

export default BookList;