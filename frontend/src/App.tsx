
import './App.css'
import BooksPage from './pages/BooksPage'
import BuyPage from './pages/BuyPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminBooksPage from './pages/AdminBooksPage'

function App() {

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-bs-theme", newTheme);
  };
  

  return (
    <>
    <CartProvider>
      <Router>

          <div className="container mt-3">
                <button className="btn btn-secondary" onClick={toggleTheme}>
                  Toggle Dark Mode
                  </button>

                  </div>
                  <Routes>

                  <Route path="/" element={<BooksPage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route 
                  path="/BuyPage/:title/:bookId/:price" 
                  element={<BuyPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/adminBooks" element={<AdminBooksPage />} />

                  </Routes>


      </Router>
    </CartProvider>
     
    </>
  )
}

export default App
