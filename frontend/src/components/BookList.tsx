import { useEffect, useState } from "react";
import { Book } from "../types/Book"
import { useNavigate } from "react-router-dom";
import '../App.css'
function BookList({selectedCategories} : {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10)
    const [pageNum, setPageNum ] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [ sortBy, setSortBy] = useState<string>('title_asc')
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProjects = async () => {
            const categoryParams = selectedCategories
            .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
            .join('&');

            const response = await fetch(`https://localhost:5000/Books/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`);

            const data = await response.json();
            setBooks(data.numBooks);
            setTotalItems(data.totalNumBooks)
            setTotalPages(Math.ceil(totalItems / pageSize))
        };

        fetchProjects();
    }, [pageSize, pageNum, totalItems, sortBy, selectedCategories]);



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

            <label>
                Sort By:
                <select value={sortBy} onChange={(e) => {
                    setSortBy(e.target.value);
                    setPageNum(1)
                }}>
                    <option value="title_asc">Title Asc (A-Z)</option>
                    <option value="title_desc">Title Desc (Z-A)</option>
                </select>
            </label>

            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
            
            {[...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === i + 1}>
                      {i + 1}
                    </button>
                  ))}


            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>


            <br /> 

            <label>
                Results per page: 
                <select value={pageSize} onChange={(p) => {

                    setPageSize(Number(p.target.value))
                    setPageNum(1)
                    }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                
                </select>
            </label>
        </>

    )
}

export default BookList;