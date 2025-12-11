import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ProductGallery.css";

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
      setDisplayedProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle sorting
  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (!order) {
      setDisplayedProducts([...products]); // Reset to default
      return;
    }

    const sorted = [...products].sort((a, b) => {
      const priceA = Number(a.price.replace(/[₹,]/g, ""));
      const priceB = Number(b.price.replace(/[₹,]/g, ""));
      return order === "low" ? priceA - priceB : priceB - priceA;
    });

    setDisplayedProducts(sorted);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Products</h1>

      {/* Sort bar */}
      <div className="sort-bar">
        <label htmlFor="sort">Sort by Price:</label>
        <select id="sort" value={sortOrder} onChange={handleSort}>
          <option value="">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="gallery-grid">
        {displayedProducts.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          displayedProducts.map((item) => (
            <div className="gallery-card" key={item.id}>
              <div className="gallery-img">
                <img src={item.img} alt={item.title} />
                <span className="gallery-tag">{item.desc}</span>
              </div>
              <div className="gallery-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <h4>{item.price}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
