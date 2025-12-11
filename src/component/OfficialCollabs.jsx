import React, { useState, useEffect } from "react";
import "./css/OfficialCollabs.css";

export default function OfficialCollabs() {
  const collabs = [
    { id: 1, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/fandom_tile.jpg?w=480&dpr=1.3", alt: "Demon Slayer" },
    { id: 2, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Venom2.jpg?w=480&dpr=1.3", alt: "Marvel" },
    { id: 3, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/dc-1.jpg?w=480&dpr=1.3", alt: "DC Comics" },
    { id: 4, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/one-piece.jpg?w=480&dpr=1.3", alt: "One Piece" },
    { id: 5, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/harry-potter.jpg?w=480&dpr=1.3", alt: "Harry Potter" },
    { id: 6, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/star_wars_shop_by_fandom.jpg?w=480&dpr=1.3", alt: "Star Wars" },
    { id: 7, image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/dc-1.jpg?w=480&dpr=1.3", alt: "DC Comics" },
    { id: 8, image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759736378_4861021.jpg?w=360&dpr=1.3", alt: "Harry Potter" },
  ];

  // Responsive slides count
  const getSlidesToShow = () => {
    if (window.innerWidth <= 600) return 1; // mobile
    if (window.innerWidth <= 900) return 2; // tablet
    return 3; // desktop
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [index, setIndex] = useState(0);

  const maxIndex = collabs.length - slidesToShow;

  // Update slides on window resize
  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div className="collabs-section">
      {/* Slider Title */}
      <h2 className="slider-title">Official Collaborations</h2>

      <div className="slider">
        <button className="slider-btn left" onClick={prevSlide}>
          &#10094;
        </button>

        <div
          className="slider-container"
          style={{
            transform: `translateX(-${index * (100 / slidesToShow)}%)`,
          }}
        >
          {collabs.map((item) => (
            <div key={item.id} className="slide">
              <img src={item.image} alt={item.alt} className="collab-img" />
            </div>
          ))}
        </div>

        <button className="slider-btn right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
}
