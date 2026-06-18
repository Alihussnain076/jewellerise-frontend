import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  // Handle Get Directions
  const handleGetDirections = () => {
    const address = encodeURIComponent('DHA Phase 6, Sector X, Lahore, Punjab 54000, Pakistan');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  // Handle Book Appointment
  const handleBookAppointment = () => {
    navigate('/contact');
  };

  // Handle Contact Us
  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-hero-badge">Our Story</span>
          <h1 className="about-hero-title">About Jewellerise</h1>
          <p className="about-hero-subtitle">Where luxury meets craftsmanship</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-container">
        {/* Brand Story */}
        <div className="about-section brand-story">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-badge">Who We Are</span>
              <h2 className="section-title">A Legacy of <span className="red-text">Luxury</span></h2>
              <div className="section-divider"></div>
              <p className="about-description">
                Founded in 2024 by <strong className="founder-name">Ali Husnain</strong>, Jewellerise brings together the finest 
                in furniture and jewellery craftsmanship. Our mission is to provide luxury items that elevate 
                your lifestyle and bring elegance to every moment.
              </p>
              <p className="about-description">
                Each piece in our collection is carefully selected for its quality, design, and ability to 
                transform spaces and styles. We believe in sustainable luxury and work with artisans who 
                share our values of excellence and precision.
              </p>
              <p className="about-description">
                From handcrafted wooden furniture to exquisite diamond jewellery, every item tells a story 
                of dedication, artistry, and timeless beauty. Welcome to a world where every detail matters.
              </p>
            </div>
            <div className="about-image">
              <div className="about-image-inner">
                <div className="image-shine"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="about-section founder-section">
          <div className="founder-card">
            <div className="founder-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
                <path d="M12 6L13.5 9.5L17.5 10L14.5 12.5L15.5 16.5L12 14.5L8.5 16.5L9.5 12.5L6.5 10L10.5 9.5L12 6Z" fill="#d40000" opacity="0.8"/>
              </svg>
            </div>
            <h3>Meet Our Founder</h3>
            <h2 className="founder-name-large">Ali Husnain</h2>
            <p className="founder-quote">
              "Luxury is not about expensive things, it's about exceptional quality and timeless design."
            </p>
            <div className="founder-details">
              <div className="founder-detail">
                <span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <span>Luxury Brand Specialist</span>
              </div>
              <div className="founder-detail">
                <span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <span>10+ Years Experience</span>
              </div>
              <div className="founder-detail">
                <span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <span>Award Winning Designer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-section stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
              <div className="stat-line"></div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Premium Products</div>
              <div className="stat-line"></div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Customer Rating</div>
              <div className="stat-line"></div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
              <div className="stat-line"></div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="about-section location-section">
          <div className="location-card">
            <div className="location-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#d40000" strokeWidth="1.5"/>
                <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#d40000" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3>Visit Our Showroom</h3>
            <p className="location-address">
              DHA Phase 6, Sector X<br />
              Lahore, Punjab 54000<br />
              Pakistan
            </p>
            <div className="location-hours">
              <div className="hour-item">
                <span>Monday - Friday:</span>
                <span>10:00 AM - 8:00 PM</span>
              </div>
              <div className="hour-item">
                <span>Saturday:</span>
                <span>11:00 AM - 6:00 PM</span>
              </div>
              <div className="hour-item">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
            <button className="location-btn" onClick={handleGetDirections}>
              Get Directions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-section values-section">
          <div className="values-header">
            <span className="section-badge">Our Principles</span>
            <h2 className="section-title">What We Stand For</h2>
            <div className="section-divider center"></div>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <h4>Exceptional Quality</h4>
              <p>Every piece undergoes rigorous quality checks</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H21M6 6H18M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="#d40000" strokeWidth="1.5"/>
                </svg>
              </div>
              <h4>Sustainable Luxury</h4>
              <p>Ethically sourced materials and eco-friendly practices</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7L9 18L4 13" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="19" cy="5" r="2" stroke="#d40000" strokeWidth="1.5"/>
                </svg>
              </div>
              <h4>Artisan Craftsmanship</h4>
              <p>Handcrafted by master artisans</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21M16 7C16 9.2 14.2 11 12 11C9.8 11 8 9.2 8 7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7Z" stroke="#d40000" strokeWidth="1.5"/>
                </svg>
              </div>
              <h4>Client First</h4>
              <p>Personalized service and support</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-section cta-section">
          <div className="cta-content">
            <h3>Experience Luxury Firsthand</h3>
            <p>Visit our showroom or schedule a private consultation</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={handleBookAppointment}>
                Book Appointment
              </button>
              <button className="btn-secondary" onClick={handleContactUs}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;