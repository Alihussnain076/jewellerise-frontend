import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  const services = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
          <path d="M12 6L13.5 9.5L17.5 10L14.5 12.5L15.5 16.5L12 14.5L8.5 16.5L9.5 12.5L6.5 10L10.5 9.5L12 6Z" fill="#d40000" opacity="0.8"/>
        </svg>
      ),
      title: "Custom Design",
      description: "Work with our expert designers to create unique, personalized pieces that reflect your style and vision.",
      features: ["3D Design Preview", "Material Selection", "Personal Consultation"]
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#d40000" strokeWidth="1.5"/>
          <path d="M16 16L19 19M8 8L5 5" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "Repair & Restoration",
      description: "Expert care for your valuable furniture and jewellery items to restore them to their original glory.",
      features: ["Professional Assessment", "Quality Materials", "Warranty on Repairs"]
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="7" width="20" height="14" rx="2" stroke="#d40000" strokeWidth="1.5"/>
          <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21M3 7H21" stroke="#d40000" strokeWidth="1.5"/>
          <path d="M12 12H12.01" stroke="#d40000" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Gift Wrapping",
      description: "Luxury gift packaging for special occasions with personalized messages and premium materials.",
      features: ["Eco-friendly Materials", "Custom Ribbons", "Gift Cards Available"]
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#d40000" strokeWidth="1.5"/>
          <path d="M12 9V15M9 12H15" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 3L18 5M8 3L6 5" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "White Glove Delivery",
      description: "Premium delivery service including installation and setup in your home or office.",
      features: ["Free Installation", "Packaging Removal", "Scheduled Delivery"]
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="3" stroke="#d40000" strokeWidth="1.5"/>
        </svg>
      ),
      title: "Jewellery Cleaning",
      description: "Professional cleaning and maintenance service for all your precious jewellery pieces.",
      features: ["Ultrasonic Cleaning", "Polish & Shine", "Stone Tightening"]
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7L17 17M7 17L17 7" stroke="#d40000" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="9" stroke="#d40000" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="4" stroke="#d40000" strokeWidth="1.5"/>
        </svg>
      ),
      title: "Size Adjustment",
      description: "Professional resizing services for rings, bracelets, and other jewellery items.",
      features: ["Precision Work", "Quick Turnaround", "Quality Guarantee"]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <span className="services-hero-badge">What We Offer</span>
          <h1 className="services-hero-title">Our Premium Services</h1>
          <p className="services-hero-subtitle">
            Discover our range of professional services designed to provide you with the ultimate luxury experience
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature">
                    <span className="feature-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="#d40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="services-cta">
          <div className="cta-content">
            <h2>Need a Custom Service?</h2>
            <p>Contact us for personalized service quotes and consultations</p>
            <button className="cta-button" onClick={handleGetInTouch}>
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;