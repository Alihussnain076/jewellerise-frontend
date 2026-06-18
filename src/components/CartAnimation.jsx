import React, { useEffect, useState } from 'react';
import './CartAnimation.css';

const CartAnimation = ({ product, onComplete }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Auto-hide notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!product) return null;

  return (
    <div className="cart-animation-container">
      {/* Floating Product */}
      <div className="floating-product" style={{
        backgroundImage: `url(${product.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div className="product-glow"></div>
      </div>

      {/* Sparkles */}
      <div className="sparkle-container">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const distance = 80 + Math.random() * 60;
          const colors = ['gold', 'red', 'silver'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <div
              key={i}
              className={`sparkle ${color}`}
              style={{
                '--tx': `${Math.cos(angle) * distance}px`,
                '--ty': `${Math.sin(angle) * distance}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>

      {/* VIP Notification */}
      {showNotification && (
        <div className="vip-notification">
          <div className="vip-icon"></div>
          <div className="vip-text">
            <h3>✦ VIP Item Added ✦</h3>
            <p>{product.name} added to your cart</p>
          </div>
          <button className="vip-close" onClick={() => setShowNotification(false)}>✕</button>
        </div>
      )}
    </div>
  );
};

export default CartAnimation;