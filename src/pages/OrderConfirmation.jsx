import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    // Clear cart after order confirmation
    const clearCart = async () => {
      const sessionId = localStorage.getItem('sessionId');
      await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
        headers: { 'session-id': sessionId }
      });
    };
    clearCart();
  }, []);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
      <h1 style={{ color: 'var(--dark-green)', marginBottom: '20px' }}>Order Confirmed!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Thank you for your purchase!</p>
      <p style={{ color: '#666', marginBottom: '30px' }}>Your order has been received and is being processed.</p>
      
      {order && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', maxWidth: '500px', margin: '0 auto 30px' }}>
          <h3>Order Summary</h3>
          <p><strong>Order Total:</strong> ${order.total.toFixed(2)}</p>
          <p><strong>Shipping to:</strong> {order.customerInfo.address}, {order.customerInfo.city}</p>
          <p><strong>Confirmation Email:</strong> {order.customerInfo.email}</p>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/">
          <button className="btn-primary">Return to Home</button>
        </Link>
        <Link to="/shop">
          <button className="btn-secondary">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;