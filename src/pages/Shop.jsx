import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import './Shop.css';

const Shop = ({ onCartUpdate }) => {  // ✅ Added onCartUpdate prop
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [search, setSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, category, type, priceRange, search]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (type !== 'all') {
      filtered = filtered.filter(p => p.type === type);
    }

    if (priceRange.min) {
      filtered = filtered.filter(p => p.price >= parseInt(priceRange.min));
    }

    if (priceRange.max) {
      filtered = filtered.filter(p => p.price <= parseInt(priceRange.max));
    }

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
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
        setToastMessage(`${product.name} added to cart!`);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const clearFilters = () => {
    setCategory('all');
    setType('all');
    setPriceRange({ min: '', max: '' });
    setSearch('');
  };

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="shop-hero-overlay"></div>
        <div className="shop-hero-content">
          <span className="shop-hero-badge">Exclusive Collection</span>
          <h1 className="shop-hero-title">Our Collection</h1>
          <p className="shop-hero-subtitle">Discover timeless elegance and exceptional craftsmanship</p>
        </div>
      </div>

      <div className="shop-container">
        {/* Filter Toggle for Mobile */}
        <button 
          className="filter-toggle-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span>🔍</span>
          Filters & Sorting
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'none' }}>
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={`shop-layout ${isFilterOpen ? 'filters-open' : ''}`}>
          {/* Filters Sidebar */}
          <aside className="shop-filters">
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">Clear All</button>
            </div>

            {/* Search */}
            <div className="filter-group">
              <label className="filter-label">
                <span>🔍</span> Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                className="filter-input search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="filter-group">
              <label className="filter-label">
                <span>📁</span> Category
              </label>
              <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="furniture">Furniture</option>
                <option value="jewellery">Jewellery</option>
              </select>
            </div>

            {/* Type */}
            <div className="filter-group">
              <label className="filter-label">
                <span>🏷️</span> Type
              </label>
              <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="ring">Rings</option>
                <option value="necklace">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="pendant">Pendants</option>
                <option value="bracelet">Bracelets</option>
                <option value="table">Tables</option>
                <option value="sofa">Sofas</option>
                <option value="chair">Chairs</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label className="filter-label">
                <span>💰</span> Price Range
              </label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  className="filter-input price-input"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <span className="price-sep">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="filter-input price-input"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>

            {/* Active Filters */}
            {(category !== 'all' || type !== 'all' || priceRange.min || priceRange.max || search) && (
              <div className="active-filters">
                <label className="filter-label">Active Filters</label>
                <div className="active-filters-list">
                  {category !== 'all' && (
                    <span className="active-filter" onClick={() => setCategory('all')}>
                      Category: {category} ✕
                    </span>
                  )}
                  {type !== 'all' && (
                    <span className="active-filter" onClick={() => setType('all')}>
                      Type: {type} ✕
                    </span>
                  )}
                  {priceRange.min && (
                    <span className="active-filter" onClick={() => setPriceRange({ ...priceRange, min: '' })}>
                      Min: ${priceRange.min} ✕
                    </span>
                  )}
                  {priceRange.max && (
                    <span className="active-filter" onClick={() => setPriceRange({ ...priceRange, max: '' })}>
                      Max: ${priceRange.max} ✕
                    </span>
                  )}
                  {search && (
                    <span className="active-filter" onClick={() => setSearch('')}>
                      Search: {search} ✕
                    </span>
                  )}
                </div>
              </div>
            )}
          </aside>

          {/* Products Grid */}
          <main className="shop-products">
            <div className="products-header">
              <span className="products-count">{filteredProducts.length} products found</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="reset-filters-btn">Reset All Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product, index) => (
                  <div key={product._id} className="product-item" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default Shop;