import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const fetchCart = async () => {
    const sessionId = localStorage.getItem('sessionId');
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: { 'session-id': sessionId }
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotal = () => {
    const sum = cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const sessionId = localStorage.getItem('sessionId');
    try {
      await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      fetchCart();
      onCartUpdate();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (itemId) => {
    const sessionId = localStorage.getItem('sessionId');
    try {
      await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'session-id': sessionId }
      });
      fetchCart();
      onCartUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.2 15.8 4.5 16.5 5.2 16.5H17M17 13H19M17 16C17 17.1 16.1 18 15 18C13.9 18 13 17.1 13 16M9 16C9 17.1 8.1 18 7 18C5.9 18 5 17.1 5 16" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Add some beautiful items to your cart!</p>
          <Link to="/shop">
            <button className="empty-cart-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Hero Section */}
      <div className="cart-hero">
        <div className="cart-hero-overlay"></div>
        <div className="cart-hero-content">
          <span className="cart-hero-badge">Your Selection</span>
          <h1 className="cart-hero-title">Shopping Cart</h1>
          <p className="cart-hero-subtitle">
            Review and manage your selected items
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="cart-container">
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-product">
                  <img 
                    src={item.productId.imageUrl} 
                    alt={item.productId.name} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3>{item.productId.name}</h3>
                    <p>{item.productId.description.substring(0, 80)}...</p>
                    <div className="cart-item-price-mobile">
                      ${item.productId.price}
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeItem(item._id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                
                <div className="cart-item-total">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
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
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
            <Link to="/shop">
              <button className="continue-shop-btn">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;