import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = ({ onCartUpdate }) => {  // ✅ Added onCartUpdate prop
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero images from public folder
  const heroImages = [
    '/image/firstimage1.jfif',
    '/image/secondimage2.jfif',
    '/image/thirdimage3.jfif'
  ];

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setFeaturedProducts(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // ✅ Updated addToCart function
  const addToCart = async (product) => {
    const sessionId = localStorage.getItem('sessionId');
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      
      if (response.ok) {
        // ✅ Update cart count instantly
        if (onCartUpdate) {
          await onCartUpdate();
        }
        // alert('Added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Section with Auto-Rotating Images */}
      <div className="hero-premium">
        <div className="hero-slides">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="hero-overlay"></div>
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">EST. 2024</div>
          <h1 className="hero-title">
            <span className="hero-title-line">Luxury Furniture</span>
            <span className="hero-title-line">& Fine Jewellery</span>
          </h1>
          <p className="hero-subtitle">
            Discover elegance that transforms your space and style
          </p>
          <Link to="/shop">
            <button className="hero-btn">
              <span>Shop Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Collections */}
      <div className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated Selection</span>
            <h2 className="section-title">Featured Collections</h2>
            <div className="section-divider"></div>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 6L13.5 9.5L17.5 10L14.5 12.5L15.5 16.5L12 14.5L8.5 16.5L9.5 12.5L6.5 10L10.5 9.5L12 6Z" fill="currentColor" opacity="0.8"/>
                </svg>
              </div>
              <h3>Premium Quality</h3>
              <p>Handcrafted with excellence</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M6 6H18M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 15H10M17 15H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="17" cy="12" r="1" fill="currentColor"/>
                  <circle cx="7" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>
              <h3>Free Shipping</h3>
              <p>On orders over $100</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7L9 18L4 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>30-Day Returns</h3>
              <p>Hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;