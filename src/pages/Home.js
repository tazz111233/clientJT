import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";

function Home() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      fetch("http://localhost:5001/get-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.role) {
            setRole(data.role);
            if (data.role === "admin") {
              navigate("/admin");
            }
          }
        })
        .catch((error) => console.error("Error fetching role:", error));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!role) {
    return <p>Loading...</p>;
  }

  const handleCartClick = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length > 0) {
      navigate("/cart");
    } else {
      alert("Your cart is empty!");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <div className="home">
      <Carousel />
      <h1>Welcome to Plink Bd</h1>
      <p>Welcome to Plink – Custom Made Cool!</p>

      <Link to="/shop" className="shop-now-button">
        Shop Now
      </Link>

      <div className="categories-container">
        {[
          { name: "Tops", img: "https://dummyimage.com/150x150/000/fff" },
          { name: "Bottoms", img: "https://dummyimage.com/150x150/000/fff" },
          { name: "Accessories", img: "https://dummyimage.com/150x150/000/fff" },
          { name: "Shoes", img: "https://dummyimage.com/150x150/000/fff" },
          { name: "Stationery", img: "https://dummyimage.com/150x150/000/fff" },
          { name: "Gift Items", img: "https://dummyimage.com/150x150/000/fff" },
        ].map((category) => (
          <div key={category.name} className="category-card" onClick={() => handleCategoryClick(category.name)}>
            <img src={category.img} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className="hiddenDiv" onClick={handleCartClick}>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </div>
  );
}

export default Home;
