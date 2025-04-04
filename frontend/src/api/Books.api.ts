import { Book } from "../types/Book";

interface FetchBooksResponse {
    numBooks: Book[];
    totalNumBooks: number;
}

const API_URL = 'https://thisoneshouldwork-backend-avc4fgdvcfh8fdc4.eastus2-01.azurewebsites.net/Books'

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortBy: string,
    selectedCategories: string[] = []

): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');
    
    
        const response = await fetch(`${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error('failed to fetch projects');
        }
    
        return await response.json();
    } catch(error) {
        console.error('Error fetching projects: ', error)
        throw error;
    }
    
}

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        })
        if (!response.ok) {
            throw new Error('Failed to add project');
        }
        return await response.json()
    } catch (error) {
        console.error('Error adding project', error)
        throw error;
    }
}


export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        })
        return await response.json()
    } catch (error) {
        console.error('Error updating project', error)
        throw error;
    }
}

export const deleteBook = async ( bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`,
            {
                method: 'DELETE'
            }
        );
        if(!response.ok) {
            throw new Error('Failed to delete book')
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}
