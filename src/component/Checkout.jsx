import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Checkout.css';

// Available Coupons
const COUPONS = {
  SAVE10: { discount: 10, minOrder: 500, type: 'percent', desc: '10% off on orders above ₹500' },
  SAVE20: { discount: 20, minOrder: 1500, type: 'percent', desc: '20% off on orders above ₹1500' },
  FIRST50: { discount: 50, minOrder: 300, type: 'flat', desc: 'Flat ₹50 off on orders above ₹300' },
  MEGA100: { discount: 100, minOrder: 2000, type: 'flat', desc: 'Flat ₹100 off on orders above ₹2000' },
  WELCOME: { discount: 15, minOrder: 1000, type: 'percent', desc: '15% off on orders above ₹1000' },
};

export default function Checkout() {
  const cart = useSelector((store) => store);
  const navigate = useNavigate();
  const location = useLocation();

  // Get coupon from Cart page if passed
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(location.state?.appliedCoupon || null);
  const [couponError, setCouponError] = useState('');

  const getNum = (val) => Number((val || '0').toString().replace(/[^0-9]/g, '')) || 0;
  const getQty = (item) => item.quantity ?? item.qty ?? 1;

  const subtotal = cart.reduce((acc, item) => acc + getNum(item.price) * getQty(item), 0);
  
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
  
  const discount = subtotal > 2000 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 999 ? 0 : 49;
  const gstRate = 0.18; // 18% GST
  const gst = Math.round((subtotal - discount - couponDiscount) * gstRate);
  const total = subtotal - discount - couponDiscount + gst + shipping;
  const itemCount = cart.reduce((acc, item) => acc + getQty(item), 0);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    payment: 'cod',
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

  const placeOrder = () => {
    // Basic validation
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.zip) {
      alert('Please fill all required address fields.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      navigate('/');
      return;
    }
    
    // Generate order number
    const orderNum = 'ORD' + Date.now().toString().slice(-8);
    
    // Navigate to Thank You page with order details
    navigate('/thankyou', {
      state: {
        orderNumber: orderNum,
        total: total,
        paymentMethod: form.payment,
        itemCount: itemCount,
        customerName: form.name
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div style={{padding: '60px', textAlign: 'center', gridColumn: '1 / -1'}}>
          <div style={{fontSize: '80px', marginBottom: '20px'}}>🛒</div>
          <h2 style={{color: '#111827', marginBottom: '12px'}}>Your cart is empty</h2>
          <p style={{color: '#6b7280', marginBottom: '24px'}}>Add some products before checking out</p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="co-left">
        <div className="co-header">
          <h2 className="co-title">Checkout</h2>
          <span className="co-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="co-section">
          <h3>📍 Shipping Details</h3>
          <div className="form-grid">
            <input 
              name="name" 
              placeholder="Full Name *" 
              value={form.name} 
              onChange={onChange}
              required
            />
            <input 
              name="phone" 
              placeholder="Phone Number *" 
              value={form.phone} 
              onChange={onChange}
              type="tel"
              required
            />
            <input 
              name="email" 
              placeholder="Email (optional)" 
              value={form.email} 
              onChange={onChange}
              type="email"
              className="col-span-2"
            />
            <input 
              name="address" 
              placeholder="Complete Address *" 
              value={form.address} 
              onChange={onChange} 
              className="col-span-2"
              required
            />
            <input 
              name="city" 
              placeholder="City *" 
              value={form.city} 
              onChange={onChange}
              required
            />
            <input 
              name="state" 
              placeholder="State *" 
              value={form.state} 
              onChange={onChange}
              required
            />
            <input 
              name="zip" 
              placeholder="PIN Code *" 
              value={form.zip} 
              onChange={onChange}
              type="text"
              maxLength="6"
              required
            />
          </div>
        </div>

        <div className="co-section">
          <h3>💳 Payment Method</h3>
          <div className="pay-options">
            <label className={form.payment==='cod' ? 'active' : ''}>
              <input type="radio" name="payment" value="cod" checked={form.payment==='cod'} onChange={onChange} />
              <div>
                <div className="pay-title">💰 Cash on Delivery</div>
                <div className="pay-desc">Pay when you receive the order</div>
              </div>
            </label>
            <label className={form.payment==='online' ? 'active' : ''}>
              <input type="radio" name="payment" value="online" checked={form.payment==='online'} onChange={onChange} />
              <div>
                <div className="pay-title">💳 Online Payment</div>
                <div className="pay-desc">Card / UPI / Netbanking / Wallets</div>
              </div>
            </label>
          </div>
        </div>

        <button className="btn-place" onClick={placeOrder}>
          <span>Place Order</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </button>
      </div>

      <aside className="co-right">
        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="co-items">
            {cart.map((item, idx) => (
              <div key={idx} className="co-item">
                <img 
                  src={item.img || 'https://via.placeholder.com/80'} 
                  alt={item.title || item.name}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=No+Image'}
                />
                <div className="co-item-info">
                  <div className="co-item-title">{item.title || item.name}</div>
                  {item.selectedSize && <div className="co-item-sub">Size: {item.selectedSize}</div>}
                  <div className="co-item-sub">Qty: {getQty(item)} × ₹{getNum(item.price)}</div>
                </div>
                <div className="co-item-price">₹{(getNum(item.price) * getQty(item)).toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
          <div className="sum-details">
            <div className="sum-row"><span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            {discount > 0 && (
              <div className="sum-row sum-discount"><span>Discount (10% off)</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>
            )}
            {couponDiscount > 0 && (
              <div className="sum-row sum-discount">
                <span>Coupon ({appliedCoupon})</span>
                <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="sum-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-text' : ''}>
                {shipping === 0 ? <><span className="free-badge">FREE</span> ₹0</> : `₹${shipping}`}
              </span>
            </div>
            <div className="sum-row"><span>GST (18%)</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
          </div>
          <div className="sum-total"><span>Total Amount</span><span>₹{total.toLocaleString('en-IN')}</span></div>

          {/* Coupon Section */}
          <div className="promo-section">
            <div className="promo-header">
              <span className="promo-icon">🎟️</span>
              <span className="promo-title">Apply Coupon</span>
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
        </div>
      </aside>
    </div>
  );
}
