import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DecAction, IncAction, DelAction } from "./redux/Action";
import "./css/Cart.css";
import { useNavigate } from "react-router-dom";

// Available Coupons
const COUPONS = {
  SAVE10: { discount: 10, minOrder: 500, type: 'percent', desc: '10% off on orders above ₹500' },
  SAVE20: { discount: 20, minOrder: 1500, type: 'percent', desc: '20% off on orders above ₹1500' },
  FIRST50: { discount: 50, minOrder: 300, type: 'flat', desc: 'Flat ₹50 off on orders above ₹300' },
  MEGA100: { discount: 100, minOrder: 2000, type: 'flat', desc: 'Flat ₹100 off on orders above ₹2000' },
  WELCOME: { discount: 15, minOrder: 1000, type: 'percent', desc: '15% off on orders above ₹1000' },
};

export default function Cart() {
  const data = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  console.log("Cart Data:", data); // Debug log

  const getNum = (val) => {
    if (!val) return 0;
    const numStr = val.toString().replace(/[^0-9]/g, "");
    return Number(numStr) || 0;
  };
  
  const getQty = (item) => item.quantity ?? item.qty ?? 1;

  const subtotal = data.reduce((acc, item) => acc + getNum(item.price) * getQty(item), 0);
  
  // Calculate coupon discount
  let couponDiscount = 0;
  if (appliedCoupon) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon.type === 'percent') {
      couponDiscount = Math.round((subtotal * coupon.discount) / 100);
    } else {
      couponDiscount = coupon.discount;
    }
  }
  
  const discount = subtotal > 2000 ? Math.round(subtotal * 0.1) : 0; // 10% off on orders above ₹2000
  const shipping = subtotal > 999 ? 0 : 49;
  const gstRate = 0.18; // 18% GST
  const gst = Math.round((subtotal - discount - couponDiscount) * gstRate);
  const total = subtotal - discount - couponDiscount + gst + shipping;
  const itemCount = data.reduce((acc, item) => acc + getQty(item), 0);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
      return;
    }
    
    setAppliedCoupon(code);
    setCouponError('');
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <span className="cart-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        {data.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <button className="btn-shop" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        ) : (
          <div className="cart-list">
            {data.map((el, i) => {
              const itemPrice = getNum(el.price);
              const itemQty = getQty(el);
              const lineTotal = itemPrice * itemQty;
              
              console.log(`Item ${i}:`, { 
                title: el.title || el.name,
                img: el.img,
                price: el.price,
                itemPrice,
                quantity: el.quantity,
                itemQty,
                lineTotal
              });

              return (
                <div key={i} className="cart-item">
                  <div className="ci-imgwrap">
                    <img 
                      src={el.img || el.images?.[0] || 'https://via.placeholder.com/140'} 
                      alt={el.title || el.name || 'Product'} 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/140?text=No+Image'}
                    />
                  </div>

                  <div className="ci-info">
                    <div className="ci-top">
                      <h3 className="ci-title">{el.title || el.name || 'Product'}</h3>
                      <button className="ci-remove" onClick={() => dispatch(DelAction(i))}>Remove</button>
                    </div>
                    <div className="ci-desc">{el.desc || 'Premium Quality Product'}</div>
                    {el.selectedSize && (
                      <div className="ci-size">Size: <strong>{el.selectedSize}</strong></div>
                    )}
                    <div className="ci-price-row">
                      <span className="ci-price-label">Price:</span>
                      <span className="ci-price">₹{itemPrice}</span>
                    </div>

                    <div className="ci-controls">
                      <div className="ci-qty">
                        <button onClick={() => dispatch(DecAction(i))}>-</button>
                        <span>{itemQty}</span>
                        <button onClick={() => dispatch(IncAction(i))}>+</button>
                      </div>
                      <div className="ci-line-total">₹{lineTotal.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <aside className="cart-right">
        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="sum-details">
            <div className="sum-row"><span>Subtotal ({data.length} {data.length === 1 ? 'item' : 'items'})</span><span>₹{subtotal}</span></div>
            {discount > 0 && (
              <div className="sum-row sum-discount"><span>Discount (10% off)</span><span>-₹{discount}</span></div>
            )}
            {couponDiscount > 0 && (
              <div className="sum-row sum-discount">
                <span>Coupon ({appliedCoupon})</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}
            <div className="sum-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? (
                  <><span className="free-badge">FREE</span> ₹0</>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>
            <div className="sum-row"><span>GST (18%)</span><span>₹{gst}</span></div>
          </div>
          <div className="sum-total"><span>Total Amount</span><span>₹{total.toLocaleString('en-IN')}</span></div>

          {subtotal < 999 && subtotal > 0 && (
            <div className="shipping-notice">
              Add ₹{999 - subtotal} more to get FREE shipping! 🚚
            </div>
          )}

          <button className="btn-checkout" disabled={data.length === 0} onClick={()=> navigate('/checkout', { state: { appliedCoupon, couponDiscount } })}>Proceed to Checkout</button>

          {/* Coupon Section */}
          <div className="promo-section">
            <div className="promo-header">
              <span className="promo-icon">🎟️</span>
              <span className="promo-title">Have a Coupon?</span>
            </div>
            
            {appliedCoupon ? (
              <div className="applied-coupon">
                <div className="applied-info">
                  <span className="applied-code">✓ {appliedCoupon}</span>
                  <span className="applied-desc">{COUPONS[appliedCoupon].desc}</span>
                </div>
                <button className="btn-remove" onClick={removeCoupon}>Remove</button>
              </div>
            ) : (
              <>
                <div className="promo">
                  <input 
                    placeholder="Enter promo code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                  />
                  <button className="btn-apply" onClick={applyCoupon}>Apply</button>
                </div>
                {couponError && <div className="coupon-error">{couponError}</div>}
                
                <div className="available-coupons">
                  <div className="ac-title">Available Coupons:</div>
                  {Object.entries(COUPONS).map(([code, coupon]) => (
                    <div key={code} className="coupon-card" onClick={() => { setCouponCode(code); setCouponError(''); }}>
                      <div className="coupon-left">
                        <div className="coupon-code">{code}</div>
                        <div className="coupon-desc">{coupon.desc}</div>
                      </div>
                      <button className="btn-copy">Apply</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="payment-methods">
            <div className="pm-title">We Accept</div>
            <div className="pm-icons">
              <span>💳</span>
              <span>📱</span>
              <span>💰</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}