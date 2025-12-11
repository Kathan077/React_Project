import React, { useState } from "react";
import "./css/NewArrivals.css";

export default function NewArrivals() {
  // Hardcoded product data
  const products = [
    { id: 1, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759729366_6796954.jpg?w=360&dpr=1.3", title: "Demon Slayer T-Shirt", desc: "Anime Collection", price: "₹799" },
    { id: 2, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759737572_4701663.jpg?w=360&dpr=1.3", title: "Marvel Hoodie", desc: "Superhero Collection", price: "₹1299" },
    { id: 3, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759737157_6838127.jpg?w=360&dpr=1.3", title: "DC Comics Sweatshirt", desc: "Comics Collection", price: "₹1099" },
    { id: 4, img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759554605_2258441.jpg?w=360&dpr=1.3", title: "One Piece Cap", desc: "Anime Collection", price: "₹499" },
   
  ];

  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...products].sort((a, b) => {
      const priceA = Number(a.price.replace(/[₹,]/g, ""));
      const priceB = Number(b.price.replace(/[₹,]/g, ""));
      if (order === "low") return priceA - priceB;
      if (order === "high") return priceB - priceA;
      return 0;
    });

    setSortedProducts(sorted);
  };

  return (
    <div className="bodycare-container">
      <h1 className="bodycare-title">NEW ARRIVALS</h1>

      <div className="sort-container">
        <label htmlFor="sort">Sort by Price:</label>
        <select id="sort" value={sortOrder} onChange={handleSort}>
          <option value="">Select</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {sortedProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="product-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{item.title}</h3>
              <p className="product-category">{item.desc}</p>
              <h4 className="product-price">{item.price}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
