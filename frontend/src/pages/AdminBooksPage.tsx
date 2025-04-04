import { useEffect, useState } from "react";
import { Book } from '../types/Book'
import { deleteBook, fetchBooks } from "../api/Books.api";
import Pagination from "../components/Pagination";
import NewProjectForm from "../components/NewBookForm";
import EditProjectForm from "../components/EditBookForm";

const AdminProjectsPage = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10)
    const [pageNum, setPageNum ] = useState<number>(1)
    const [ sortBy, setSortBy] = useState<string>('title_asc')
    const [totalPages, setTotalPages] = useState<number>(0)
    const [showForm, setShowForm] = useState(false)
    const [editingProject, setEditingProject] = useState<Book | null>(null)

useEffect(() => {
    const loadProjects = async () => {
        try {
            const data = await fetchBooks(pageSize, pageNum, sortBy, [])
            setBooks(data.numBooks)
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize))
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false);
        }
    }

    loadProjects();
}, [pageSize, pageNum])

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this project')
        if (!confirmDelete) return;

        try {
            await deleteBook(bookId);
            setBooks(books.filter((p) => p.bookId !== bookId))
        } catch (error) {
            alert('Failed to delete project. Please try again.')
    } 
    }


    if (loading) return <p>Loading projects...</p>
    if (error) return <p className='text-red-500'>Error: {error}</p>


    return ( 
        <div>
            <h1>Admin - Projects</h1>

            {!showForm && (
                <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add Project</button>
            )}

            {showForm && (
                <NewProjectForm onSuccess={() => {
                    setShowForm(false); 
                    fetchBooks(pageSize, pageNum, sortBy, []).then((data) => 
                        setBooks(data.numBooks)
                );
            }}
            onCancel={() => setShowForm(false)}
             /> 
             )}

             {editingProject && (
                <EditProjectForm book={editingProject} onSuccess={(() => {
                    setEditingProject(null);
                    fetchBooks(pageSize, pageNum, sortBy, []).then((data) => setBooks(data.numBooks));
                })} onCancel={() => setEditingProject(null)}               />
             )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((p) => (
                            <tr key={p.bookId}>
                                <td>{p.bookId}</td>
                                <td>{p.title}</td>
                                <td>{p.author}</td>
                                <td>{p.publisher}</td>
                                <td>{p.isbn}</td>
                                <td>{p.classification}</td>
                                <td>{p.category}</td>
                                <td>{p.pageCount}</td>
                                <td>{p.price}</td>

                                <td>
                                    <button className="btn btn-primary btn-sm w-100 mb-1" 
                                    onClick={() =>
                                     setEditingProject(p)}
                                     >
                                        Edit
                                        </button>
                                    <button 
                                    className="btn btn-danger btn-sm w-100"
                                    onClick={() => handleDelete(p.bookId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            
                        ))
                    }
                </tbody>
            </table>
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

        </div>
    )
};

export default AdminProjectsPage;