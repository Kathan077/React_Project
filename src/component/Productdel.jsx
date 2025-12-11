import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {useDispatch} from "react-redux"
import './css/ProductDetail.css';
import { myAction } from './redux/Action';

export default function Productdel() {
  const [product, setProduct] = useState({});
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { category, id } = useParams();
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(() => {
    setLoading(true);
    console.log('Fetching product:', { category, id });
    console.log('URL:', `http://localhost:5000/${category}/${id}`);
    
    fetch(`http://localhost:5000/${category}/${id}`)
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Product data received:', data);
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [category, id]);

  function AddToCart(){
    if(!size){
      alert('Please select a size');
      return;
    }
    const item = { ...product, selectedSize: size, qty }
    dispatch(myAction(item))
    navigate("/cart")
  }

  function BuyNow(){
    if(!size){
      alert('Please select a size');
      return;
    }
    const item = { ...product, selectedSize: size, qty }
    dispatch(myAction(item))
    navigate("/checkout")
  }


  if (loading) {
    return (
      <div className="pd-container">
        <div className="pd-left">
          <div className="pd-mainimg pd-skeleton"></div>
          <div className="pd-thumbs">
            {[1,2,3,4].map(i => <div key={i} className="pd-thumb pd-skeleton"></div>)}
          </div>
        </div>
        <div className="pd-right">
          <div className="pd-skeleton" style={{height: '40px', width: '70%', marginBottom: '20px'}}></div>
          <div className="pd-skeleton" style={{height: '60px', width: '50%', marginBottom: '20px'}}></div>
          <div className="pd-skeleton" style={{height: '100px', width: '100%'}}></div>
        </div>
      </div>
    );
  }

  // If no product data after loading
  if (!loading && !product?.id) {
    return (
      <div className="pd-container">
        <div style={{padding: '60px', textAlign: 'center'}}>
          <h2 style={{color: '#dc2626', marginBottom: '20px'}}>⚠️ Product Not Found</h2>
          <p style={{color: '#6b7280', marginBottom: '20px'}}>
            The product you're looking for doesn't exist or couldn't be loaded.
          </p>
          <p style={{color: '#6b7280', marginBottom: '30px'}}>
            URL: <code>http://localhost:5000/{category}/{id}</code>
          </p>
          <button 
            onClick={() => navigate(`/category/${category}`)}
            style={{
              padding: '12px 24px',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Back to {category}
          </button>
        </div>
      </div>
    );
  }

  console.log('Render - Product:', product);

  return (
    <div className="pd-container">
      {/* LEFT: Product Image */}
      <div className="pd-left">
        <div className="pd-mainimg">
          {product?.img ? (
            <img 
              src={product.img} 
              alt={product?.title || 'Product'} 
              loading="lazy"
              onError={(e) => {
                console.error('Image failed to load:', product.img);
                e.target.src = 'https://via.placeholder.com/400?text=No+Image';
              }}
            />
          ) : (
            <div style={{textAlign: 'center', padding: '40px', color: '#999'}}>No image available</div>
          )}
        </div>
      </div>


      {/* RIGHT: Info */}
      <div className="pd-right">
        <h1 className="pd-title">{product?.title || product?.name || 'Loading Product...'}</h1>
        <div className="pd-ratingrow">
          <span className="pd-badge">Best Seller</span>
          <span className="pd-reviews">4.6 ★ 1,248 ratings</span>
        </div>

        <div className="pd-price">
          <span className="pd-price-main">{product?.price || '₹0'}</span>
          <span className="pd-price-mrp">MRP ₹{Number((product?.price||'0').toString().replace(/[^0-9]/g,'')||0)+400}</span>
          <span className="pd-price-off">(Incl. of all taxes)</span>
        </div>
        
        {!product?.title && !product?.name && (
          <div style={{padding: '20px', background: '#fef2f2', borderRadius: '8px', color: '#dc2626', marginTop: '20px'}}>
            ⚠️ Product data not loading. Check console for errors.
          </div>
        )}

        <div className="pd-sizes">
          <div className="pd-sizes-head">Select Size</div>
          <div className="pd-size-grid">
            {['UK 6','UK 7','UK 8','UK 9','UK 10','UK 11'].map(s => (
              <button key={s} className={`pd-size ${size===s? 'selected':''}`} onClick={()=>setSize(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="pd-qtyrow">
          <label>Qty</label>
          <div className="pd-qty">
            <button onClick={()=> setQty(q => Math.max(1, q-1))}>-</button>
            <input value={qty} onChange={e=> setQty(Math.max(1, Number(e.target.value)||1))} />
            <button onClick={()=> setQty(q => q+1)}>+</button>
          </div>
        </div>

        <div className="pd-cta">
          <button className="btn-add" onClick={AddToCart}>Add to Cart</button>
          <button className="btn-buy" onClick={BuyNow}>Buy Now</button>
        </div>

        <div className="pd-meta">
          <div>Free shipping on orders over ₹999</div>
          <div>Easy 15-day returns</div>
          <div>Cash on Delivery available</div>
        </div>

        <div className="pd-desc">
          <h3>Description</h3>
          <p>{product?.desc || 'Premium merchandise inspired by your favorite fandoms.'}</p>
          <ul className="pd-key">
            <li>Comfort fit and durable build</li>
            <li>Officially inspired design</li>
            <li>Care: Hand wash cold, air dry</li>
          </ul>
        </div>
      </div>
    </div>
  );
}