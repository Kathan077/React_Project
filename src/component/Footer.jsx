import React from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
  
      <div className="footer-top">
 
        <div className="footer-col">
          <h4>NEED HELP</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">My Account</a></li>
          </ul>
          <p> COD Available</p>
          <p> 30 Days Easy Returns & Exchanges</p>
        </div>

      
        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Investor Relation</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Gift Vouchers</a></li>
            <li><a href="#">Community Initiatives</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>MORE INFO</h4>
          <ul>
            <li><a href="#">T&amp;C</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Get Notified</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>

       
        <div className="footer-col">
          <h4>STORE NEAR ME</h4>
          <ul>
            <li><a href="#">Mumbai</a></li>
            <li><a href="#">Pune</a></li>
            <li><a href="#">Bangalore</a></li>
            <li><a href="#">Hubballi</a></li>
            <li><a href="#" className="view-more">View More</a></li>
          </ul>
        </div>
      </div>

     
      <div className="footer-app">
        <p> EXPERIENCE THE SOULED STORE APP</p>
        <div className="app-buttons">
          <img src="https://tss-static-images.gumlet.io/icons/play-store.png" alt="Google Play" />
          <img src="https://tss-static-images.gumlet.io/icons/app-store.png" alt="App Store" />
        </div>
      </div>

  
      <div className="footer-social">
        <p>Follow Us:</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-snapchat-ghost"></i></a>
          <a href="#"><i className="fab fa-x-twitter"></i></a>
        </div>
      </div>

    
   
      
      
    </footer>
  );
}
