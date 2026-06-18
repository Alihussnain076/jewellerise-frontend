import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [navigate]);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const fetchCart = async () => {
    const sessionId = localStorage.getItem('sessionId');
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        headers: { 'session-id': sessionId }
      });
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotal = () => {
    const sum = cartItems.reduce((acc, item) => acc + (item.productId?.price * item.quantity || 0), 0);
    setTotal(sum);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.productId?._id,
        quantity: item.quantity,
        price: item.productId?.price,
        name: item.productId?.name
      })),
      total: total,
      customerInfo: formData
    };
    
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Clear cart
        const sessionId = localStorage.getItem('sessionId');
        await fetch('http://localhost:5000/api/cart/clear', {
          method: 'DELETE',
          headers: { 'session-id': sessionId }
        });
        
        alert('Order placed successfully! Check your email.');
        navigate('/');
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="empty-content">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.2 15.8 4.5 16.5 5.2 16.5H17M17 13H19M17 16C17 17.1 16.1 18 15 18C13.9 18 13 17.1 13 16M9 16C9 17.1 8.1 18 7 18C5.9 18 5 17.1 5 16" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some beautiful items before checkout</p>
          <button className="empty-checkout-btn" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Hero Section */}
      <div className="checkout-hero">
        <div className="checkout-hero-overlay"></div>
        <div className="checkout-hero-content">
          <span className="checkout-hero-badge">Secure Checkout</span>
          <h1 className="checkout-hero-title">Complete Your Order</h1>
          <p className="checkout-hero-subtitle">
            Please review your items and fill in the shipping details
          </p>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="checkout-container">
        <div className="checkout-grid">
          {/* Form Section */}
          <div className="checkout-form-wrapper">
            <div className="form-header">
              <div className="form-step">Step 1 of 2</div>
              <h2>Shipping Information</h2>
              <p>Enter your details to complete the order</p>
            </div>

            <form onSubmit={placeOrder} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Enter zip code"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="place-order-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-card">
            <div className="summary-header">
              <h3>Order Summary</h3>
              <span className="item-count">{cartItems.length} items</span>
            </div>

            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item._id} className="summary-item">
                  <img 
                    src={item.productId?.imageUrl} 
                    alt={item.productId?.name}
                    className="summary-item-image"
                  />
                  <div className="summary-item-details">
                    <h4>{item.productId?.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    ${((item.productId?.price || 0) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;