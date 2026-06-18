import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Domestic orders typically arrive within 3-7 business days. International orders take 7-14 business days. Express shipping options are available at checkout."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship worldwide! Shipping costs and delivery times vary by location. You can calculate shipping at checkout."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy for unused items in original packaging. Custom and personalized items cannot be returned unless defective."
        },
        {
          q: "How do I initiate a return?",
          a: "Contact our customer service within 30 days of receiving your item. We'll provide you with a return label and instructions."
        },
        {
          q: "How long do refunds take?",
          a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item."
        }
      ]
    },
    {
      category: "Products & Quality",
      questions: [
        {
          q: "Are your products authentic?",
          a: "Yes, all our products are 100% authentic and come with certificates of authenticity for jewellery items."
        },
        {
          q: "What materials are used in your jewellery?",
          a: "We use genuine materials including 14k/18k gold, sterling silver, diamonds, and precious gemstones. All materials are ethically sourced."
        },
        {
          q: "Do you offer product warranties?",
          a: "Yes, we offer a 1-year warranty on all furniture and jewellery against manufacturing defects."
        }
      ]
    },
    {
      category: "Custom Orders",
      questions: [
        {
          q: "Can I request custom designs?",
          a: "Absolutely! Our design team works with clients to create custom pieces. Contact us to schedule a consultation."
        },
        {
          q: "How long do custom orders take?",
          a: "Custom jewellery takes 4-6 weeks, while custom furniture takes 6-8 weeks depending on complexity."
        },
        {
          q: "What is the deposit for custom orders?",
          a: "We require a 50% deposit to begin custom work, with the remaining balance due upon completion."
        }
      ]
    },
    {
      category: "Care & Maintenance",
      questions: [
        {
          q: "How should I care for my jewellery?",
          a: "Store jewellery in a soft cloth pouch, avoid exposure to chemicals, and clean regularly with a soft brush and mild soap."
        },
        {
          q: "How do I maintain wooden furniture?",
          a: "Keep furniture away from direct sunlight, clean with a soft cloth, and apply furniture polish every 3-6 months."
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <div className="faq-hero">
        <div className="faq-hero-overlay"></div>
        <div className="faq-hero-content">
          <span className="faq-hero-badge">Knowledge Base</span>
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Find answers to common questions about our products, services, and policies
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="faq-container">
        <div className="faq-grid">
          {faqs.map((category, catIdx) => (
            <div key={catIdx} className="faq-category">
              <div className="category-header">
                <div className="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <h2 className="category-title">{category.category}</h2>
              </div>
              <div className="faq-list">
                {category.questions.map((faq, idx) => {
                  const globalIndex = `${catIdx}-${idx}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`faq-item ${isOpen ? 'open' : ''}`}
                    >
                      <div
                        className="faq-question"
                        onClick={() => toggleQuestion(globalIndex)}
                      >
                        <h3 className="question-text">{faq.q}</h3>
                        <div className={`question-icon ${isOpen ? 'rotated' : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      {isOpen && (
                        <div className="faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="faq-cta">
          <div className="cta-content">
            <div className="cta-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21M16 7C16 9.2 14.2 11 12 11C9.8 11 8 9.2 8 7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7Z" stroke="#d40000" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3>Still Have Questions?</h3>
            <p>Can't find the answer you're looking for? Our support team is here to help.</p>
            <button className="cta-button" onClick={handleContactUs}>
              Contact Us
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

export default FAQ;