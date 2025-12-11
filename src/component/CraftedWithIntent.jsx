import React from "react";
import "./css/CraftedWithIntent.css";

export default function CraftedWithIntent() {
  const items = [
    {
      id: 1,
     
      image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Collection_Tile_1Artboard_1.jpg?w=480&dpr=1.3", 
    },
    {
      id: 2,
    
      image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Collection_Tile_1Artboard_2.jpg?w=480&dpr=1.3",
    },
    {
      id: 3,
    
      image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Collection_Tile_1Artboard_3.jpg?w=480&dpr=1.3", 
    },
  ];

  return (
    <div className="crafted-section">
      <h2 className="crafted-title">CRAFTED WITH INTENT</h2>
      <div className="crafted-container">
        {items.map((item) => (
          <div className="crafted-card" key={item.id}>
            <img src={item.image} alt={item.title} className="crafted-img" />
            <div className="crafted-overlay">
              <p className="crafted-sub">{item.subtitle}</p>
              <h3 className="crafted-text">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
