import React from 'react';
import '../styles/ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {

  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    // Optionally add logic for adding an item to the cart here
    navigate('/cart', { state: { item: { name: product.name, price: product.price } } }); // Navigate to the cart page
  };
  const imageName = product.image.split('/').pop(); 
  console.log(product.image)

  return (
    <div className="product-card">
      <img src={`https://backendjt-1.onrender.com/images/${imageName}`} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button className="add-to-cart-button" onClick={handleAddToCartClick}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
