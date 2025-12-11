import React from "react";
import { Link } from "react-router-dom";  
import "./css/Categories.css";

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "T-SHIRTS",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/tshirts_Akc5X8g.jpg?w=480&dpr=1.3",

    },
    {
      id: 2,
      title: "SWEATSHIRTS AND MORE",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/jacket_rhvK3w7.jpg?w=480&dpr=1.3",
     
    },
    {
      id: 3,
      title: "SHIRTS",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/shirts_R3ynauB.jpg?w=480&dpr=1.3",
  
    },
    {
      id: 4,
      title: "SNEAKERS",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/sneaker_w6lymZg.jpg?w=480&dpr=1.3",

    },
    {
      id: 5,
      title: "JEANS",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/pants_1_JIJcfiD.jpg?w=480&dpr=1.3",
   
    },
    {
      id: 6,
      title: "POLOS",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Big_Polos_0gcAFzO.jpg?w=480&dpr=1.3",
    
    },
    {
      id: 7,
      title: "JOGGERS",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/shirts_1_U7v6zRI.jpg?w=480&dpr=1.3",
  
    },
    {
      id: 8,
      title: "ACTIVEWEAR",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_2_IjsLgZW.jpg?w=480&dpr=1.3",
    
    },
  ];

  return (
    <div className="categories-section">
      <h2 className="categories-title">CATEGORIES</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            {/* 👇 yahan <a> ki jagah <Link> use karo */}
            <Link to={category.link} className="category-link">
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                />
              </div>
              <h3 className="category-name">{category.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
