import React from "react";
import "./css/Men.css";
import NewArrivals from "./NewArrivals";
import Categories from "./Categories"; 
import CraftedWithIntent from "./CraftedWithIntent";
import OfficialCollabs from "./OfficialCollabs";
import ProductGallery from "./ProductGallery";

export default function Men() {
  return (
    <div className="men-hero">
      <div
        id="menCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >

        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#menCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#menCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#menCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/hulk_homepagey_cVUFywk.jpg?w=1500&dpr=1.3"
              className="d-block w-100 hero-img"
              alt="Men Fashion 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Home-Page-Banner_tMzAhBs.jpg?w=1500&dpr=1.3"
              className="d-block w-100 hero-img"
              alt="Men Fashion 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Baki_Hanma_-_Son_of_ogre_-Homepage_Banner.jpg?w=1500&dpr=1.3"
              className="d-block w-100 hero-img"
              alt="Men Fashion 3"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
