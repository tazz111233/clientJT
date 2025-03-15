import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddPro.css'; // Import your CSS styles

const AddPro = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [nstock, setNstock] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]); // State to store products
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch existing products on component mount
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://backendjt-1.onrender.com/getAllProducts');
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error('Failed to fetch products.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the function on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('stock', stock);

    try {
      const response = await axios.post('https://backendjt-1.onrender.com/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');
        setName('');
        setPrice('');
        setCategory('');
        setStock('');
        setImage(null);
        // Fetch products again to include the new one
        fetchProducts();
      } else {
        setErrorMessage('Failed to add product.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error adding product: ' + error.message);
      setSuccessMessage('');
    }
  };

  const updateStock = async (productName, newStock) => {
    try {
      const response = await axios.patch(`https://backendjt-1.onrender.com/products/name/${productName}`, {
        stock: newStock, // Corrected to use 'newStock'
      });
  
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.name === productName ? { ...product, stock: newStock } : product
          )
        );
        setSuccessMessage('Stock updated successfully!');
        alert('Stock updated successfully!'); // Success alert added
      } else {
        setErrorMessage('Failed to update stock.');
      }
    } catch (error) {
      console.error('Error updating stock:', error.response ? error.response.data : error.message);
      setErrorMessage('An error occurred while updating stock.'); // Optional error message
    }
  };
  
  

  return (
    <div className="add-product">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" onChange={(e) => setStock(e.target.value)} value={stock} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Add Product</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h2>Existing Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={product.stock}
                    onChange={(e) => setNstock(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => updateStock(product.name, nstock)}>Update Stock</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddPro;
