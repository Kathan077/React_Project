import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/Home1.css";
import Men from "./Men";
import NewArrivals from "./NewArrivals";
import OfficialCollabs from "./OfficialCollabs";
import CraftedWithIntent from "./CraftedWithIntent";
import Categories from "./Categories";

export default function Home1() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/product");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Men/>
   

      {/* Products Section */}
      <section className="category-section">
        <h2>Our Products</h2>
        <div className="gallery-grid">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((item) => {
              // Map API category to display-friendly label
              const labelMap = { men: "Men", women: "Women", sneaker: "Sneakers" };
              const displayLabel = labelMap[item.category] || item.category;
              return (
                <div className="gallery-card" key={item.id}>
                  <Link to={`/category/${item.category}`}>
                    <img src={item.img} alt={displayLabel} />
                  </Link>
                  <div className="gallery-info">
                    <h3>{displayLabel}</h3>
                    <p>Shop the latest collection</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      <NewArrivals/>
      <CraftedWithIntent/>
      <OfficialCollabs/>
      <Categories/>

    
    </div>
  );

}
