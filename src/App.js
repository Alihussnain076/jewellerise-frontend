import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import './styles/global.css';

// Layout component that shows Navbar and Footer
const Layout = ({ children, cartCount, isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  
  // Pages where Navbar and Footer should NOT be shown
  const hideLayoutPages = ['/login', '/register', '/admin'];
  
  const shouldHideLayout = hideLayoutPages.includes(location.pathname);
  
  if (shouldHideLayout) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {children}
      <Footer />
    </>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      localStorage.setItem('sessionId', Math.random().toString(36).substr(2, 9));
    }
    fetchCartCount();
  }, []);

  // ✅ Function to fetch cart count
  const fetchCartCount = async () => {
    const sessionId = localStorage.getItem('sessionId');
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: { 'session-id': sessionId }
      });
      const data = await response.json();
      const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
      return total;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return 0;
    }
  };

  // ✅ Function to update cart count (can be called after add/remove)
  const updateCartCount = async () => {
    const count = await fetchCartCount();
    setCartCount(count);
    return count;
  };

  return (
    <Router>
      <Layout cartCount={cartCount} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          {/* ✅ Pass updateCartCount to Home and Shop pages */}
          <Route path="/" element={<Home onCartUpdate={updateCartCount} />} />
          <Route path="/shop" element={<Shop onCartUpdate={updateCartCount} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart onCartUpdate={updateCartCount} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;