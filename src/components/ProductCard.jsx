import React, { useState } from 'react';
import CartAnimation from './CartAnimation';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProduct, setAnimationProduct] = useState(null);

  const handleAddToCart = async () => {
    // Trigger animation
    setAnimationProduct(product);
    setIsAnimating(true);
    
    // Call the actual add to cart function
    await onAddToCart(product);
    
    // Hide animation after completion
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationProduct(null);
    }, 3000);
  };

  return (
    <>
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            {product.description?.substring(0, 80)}...
          </p>
          <button 
            className="btn-primary" 
            style={{ width: '100%' }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Animation Overlay */}
      {isAnimating && animationProduct && (
        <CartAnimation 
          product={animationProduct} 
          onComplete={() => {
            setIsAnimating(false);
            setAnimationProduct(null);
          }}
        />
      )}
    </>
  );
};

export default ProductCard;