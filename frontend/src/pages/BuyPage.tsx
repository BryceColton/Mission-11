import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";



function BuyPage() {
    const navigate = useNavigate();
    const {title, id, price} = useParams();
    const {addToCart} = useCart();
    // const [donationAmount, setDonationAmount] = useState<number>(0);
    const [quantity] = useState<number>(1);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(id),
            bookTitle: title || "No Book Found",
            price: Number(price),
            quantity: quantity
        }
            addToCart(newItem);
            navigate('/cart');
         
        }

    return (
        <>
        <WelcomeBand />

        <h2>Purchase{title}</h2>

        <div>
            <input type="number" placeholder="Enter Donation Amount" 
            value={price} disabled/>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <button onClick={() => navigate(-1)}>Go Back</button>
        </>

    )
}

export default BuyPage;