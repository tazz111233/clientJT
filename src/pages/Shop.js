import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";

function Shop() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://backendjt-1.onrender.com/getAllProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
  
        console.log("📦 Full API Response:", data); // Debug full response
  
        setItems(data);
        setFilteredItems(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      setFilteredItems(items.filter((item) => item.category === categoryFromUrl));
    }
  }, [location.search, items]);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsSortOpen(false);

    // Always reset to all products before sorting
    let sortedItems = [...items];

    if (order === "all") {
      setFilteredItems(sortedItems); // Reset to all products
      return;
    }

    if (order === "lowToHigh") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (order === "top5") {
      sortedItems = [...items]
        .filter((item) => item.number !== undefined)
        .sort((a, b) => (b.number || 0) - (a.number || 0))
        .slice(0, 5);
    }

    setFilteredItems(sortedItems);
  }

  useEffect(() => {
    if (sortOrder === "top5") {
      handleSortChange("top5");
    }
  }, [items, sortOrder, handleSortChange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    setFilteredItems(category ? items.filter((item) => item.category === category) : items);
    navigate(`/shop?category=${category}`);
  };

  const handleCartClick = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length > 0) {
      navigate("/cart");
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div className="shop">
      <div className="filter-container">
        <div className="custom-dropdown">
          <button className="dropdown-button" onClick={() => setIsSortOpen(!isSortOpen)}>
            {sortOrder
              ? sortOrder === "lowToHigh"
                ? "Low to High"
                : sortOrder === "highToLow"
                ? "High to Low"
                : sortOrder === "top5"
                ? "Top 5 Ordered"
                : "All Products"
              : "Sort by"}
          </button>
          {isSortOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleSortChange("all")}>All Products</li>
              <li onClick={() => handleSortChange("lowToHigh")}>Low to High</li>
              <li onClick={() => handleSortChange("highToLow")}>High to Low</li>
              <li onClick={() => handleSortChange("top5")}>Top 5 Ordered</li>
            </ul>
          )}
        </div>

        <div className="custom-dropdown">
          <button className="dropdown-button" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
            {selectedCategory || "Filter by Category"}
          </button>
          {isCategoryOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleCategoryChange("")}>All</li>
              {categories.map((category) => (
                <li key={category} onClick={() => handleCategoryChange(category)}>
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="product-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <p>No products found</p>
        )}
      </div>

      <div className="hiddenDiv" onClick={handleCartClick}>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </div>
  );
}

export default Shop;
