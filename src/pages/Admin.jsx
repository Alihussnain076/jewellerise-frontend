import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('jewellery');
  const [type, setType] = useState('ring');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    
    const productData = {
      name: name,
      price: Number(price),
      category: category,
      type: type,
      imageUrl: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500",
      description: description
    };
    
    try {
      const res = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      if (res.ok) {
        setMessage('Product added successfully!');
        setName('');
        setPrice('');
        setDescription('');
        fetchProducts();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to add product');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="login-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21M16 7C16 9.2 14.2 11 12 11C9.8 11 8 9.2 8 7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7Z" stroke="#d40000" strokeWidth="1.5"/>
            </svg>
          </div>
          <h2>Admin Access</h2>
          <p>Enter credentials to continue</p>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && password === 'admin123' && setIsAuthenticated(true)}
            className="login-input"
          />
          <button 
            onClick={() => {
              if (password === 'admin123') {
                setIsAuthenticated(true);
              } else {
                alert('Wrong password!');
              }
            }}
            className="login-btn"
          >
            Access Dashboard
          </button>
          <p className="login-hint">Default Password: admin123</p>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
            </svg>
            <span>Admin Console</span>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="logout-admin-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        {message && (
          <div className={`admin-message ${message.includes('success') ? 'success' : 'error'}`}>
            <span>{message.includes('✅') ? '✓' : '!'}</span>
            {message}
          </div>
        )}
        
        {/* Add Product Form */}
        <div className="admin-card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2>Add New Product</h2>
          </div>
          <form onSubmit={addProduct} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="Enter product name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  placeholder="Enter price" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="jewellery">Jewellery</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="ring">Ring</option>
                  <option value="necklace">Necklace</option>
                  <option value="earrings">Earrings</option>
                  <option value="pendant">Pendant</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="table">Table</option>
                  <option value="sofa">Sofa</option>
                  <option value="chair">Chair</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Enter product description" 
                rows="3" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>
            
            <button type="submit" className="submit-product-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Product
            </button>
          </form>
        </div>
        
        {/* Products List */}
        <div className="admin-card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 7L9 18L4 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2>Products ({products.length})</h2>
          </div>
          <div className="products-table">
            <div className="table-header">
              <span>Product</span>
              <span>Category</span>
              <span>Type</span>
              <span>Price</span>
              <span>Action</span>
            </div>
            {products.map(p => (
              <div key={p._id} className="table-row">
                <div className="product-name-cell">
                  <strong>{p.name}</strong>
                  <small>{p.description?.substring(0, 50)}...</small>
                </div>
                <span>{p.category}</span>
                <span>{p.type}</span>
                <span className="price-cell">${p.price}</span>
                <button 
                  onClick={() => deleteProduct(p._id)} 
                  className="delete-product-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;