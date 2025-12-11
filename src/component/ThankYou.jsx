import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/ThankYou.css';

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);

  // Get order details from navigation state
  const orderDetails = location.state || {
    orderNumber: 'ORD' + Date.now().toString().slice(-8),
    total: 0,
    paymentMethod: 'COD',
    itemCount: 0
  };

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="thankyou-page">
      <div className="thankyou-container">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="thankyou-content">
          <h1 className="thankyou-title">Order Placed Successfully!</h1>
          <p className="thankyou-subtitle">Thank you for shopping with us</p>

          {/* Order Details Card */}
          <div className="order-details-card">
            <div className="order-header">
              <h2>Order Details</h2>
            </div>
            
            <div className="order-info">
              <div className="order-row">
                <span className="order-label">Order Number</span>
                <span className="order-value">{orderDetails.orderNumber}</span>
              </div>
              <div className="order-row">
                <span className="order-label">Total Items</span>
                <span className="order-value">{orderDetails.itemCount} {orderDetails.itemCount === 1 ? 'item' : 'items'}</span>
              </div>
              <div className="order-row">
                <span className="order-label">Total Amount</span>
                <span className="order-value order-total">₹{orderDetails.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="order-row">
                <span className="order-label">Payment Method</span>
                <span className="order-value">{orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="whats-next">
            <h3>What's Next?</h3>
            <div className="next-steps">
              <div className="step">
                <div className="step-icon">📧</div>
                <div className="step-text">
                  <strong>Confirmation Email</strong>
                  <p>You'll receive an order confirmation email shortly</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">📦</div>
                <div className="step-text">
                  <strong>Order Processing</strong>
                  <p>We'll start preparing your order right away</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">🚚</div>
                <div className="step-text">
                  <strong>Delivery</strong>
                  <p>Your order will be delivered within 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="thankyou-actions">
            <button className="btn-primary" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
           
          </div>

          {/* Countdown */}
          <div className="redirect-notice">
            Redirecting to home page in <strong>{countdown}</strong> seconds...
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="confetti">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#dc2626', '#ef4444', '#fbbf24', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)]
            }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
