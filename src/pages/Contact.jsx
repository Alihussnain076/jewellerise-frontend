import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <span className="contact-hero-badge">Get in Touch</span>
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We're here to assist you with any questions or inquiries
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-header">
              <span className="info-badge">Connect With Us</span>
              <h2>Let's Talk</h2>
              <p>Have questions about our products or services? We're here to help! Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            <div className="info-details">
              <div className="info-card">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#d40000" strokeWidth="1.5"/>
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#d40000" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Visit Us</h4>
                  <p>DHA Phase 6, Sector X<br />Lahore, Punjab 54000<br />Pakistan</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.352 21.402C21.1467 21.5904 20.9043 21.7335 20.6407 21.8217C20.3772 21.91 20.0984 21.9414 19.822 21.914C16.1826 21.5218 12.7242 20.031 9.84658 17.627C7.43796 14.756 5.79108 11.266 5.11 7.5C5.08057 7.22659 5.1081 6.94995 5.1911 6.68785C5.27411 6.42575 5.4106 6.18419 5.5915 5.97885C5.7724 5.77351 5.99362 5.60896 6.24043 5.49592C6.48725 5.38288 6.75422 5.32396 7.024 5.32298H10.024C10.3537 5.32105 10.6732 5.43338 10.928 5.63984C11.1828 5.8463 11.3568 6.13319 11.419 6.45198L11.955 9.45198C12.0087 9.7542 11.9669 10.0656 11.8355 10.3426C11.7041 10.6196 11.4897 10.8472 11.223 10.992L9.822 11.803C10.4691 13.0224 11.3757 14.0877 12.477 14.926C13.4535 15.6579 14.588 16.1527 15.79 16.369L16.544 14.971C16.678 14.6919 16.8945 14.4666 17.1649 14.3278C17.4353 14.189 17.7458 14.1439 18.043 14.199L21.043 14.823C21.3647 14.8867 21.6528 15.0636 21.8585 15.3214C22.0642 15.5792 22.1743 15.9016 22.169 16.232C22.158 16.463 22.099 16.69 21.998 16.92H22Z" stroke="#d40000" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Call Us</h4>
                  <p>+92 300 1234567<br />+92 42 12345678</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 6L12 13L2 6M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="#d40000" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Email Us</h4>
                  <p>info@jewellerise.com<br />support@jewellerise.com</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="business-hours">
              <h4>Business Hours</h4>
              <div className="hours-list">
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
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <div className="form-header">
              <span className="form-badge">Send a Message</span>
              <h2>We'd Love to Hear From You</h2>
              <p>Fill out the form below and our team will respond within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {submitted && (
                <div className="success-message">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;