import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import "./css/Navbar.css";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  // Sum quantities from cart state
  const cart = useSelector((state)=> state || []);
  const cartCount = cart.reduce((sum, it)=> sum + (Number(it.quantity)||0), 0);

  // Check for logged in user
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-wrapper')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  // Fetch all products on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const [menRes, womenRes, sneakerRes] = await Promise.all([
          axios.get('http://localhost:5000/men'),
          axios.get('http://localhost:5000/women'),
          axios.get('http://localhost:5000/sneaker')
        ]);
        const combined = [
          ...menRes.data.map(p => ({...p, categoryType: 'men'})),
          ...womenRes.data.map(p => ({...p, categoryType: 'women'})),
          ...sneakerRes.data.map(p => ({...p, categoryType: 'sneaker'}))
        ];
        setAllProducts(combined);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchAllProducts();
  }, []);

  // Search products when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(product => 
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 6)); // Show max 6 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  const handleProductClick = (product) => {
    navigate(`/category/${product.categoryType}/${product.id}`);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      // Navigate to first result
      handleProductClick(searchResults[0]);
    }
  };

  return (
    <div>
      <nav className="navbar">
      
        <div className="navbar-left">
          <NavLink to="/category/men" className={({isActive})=>`nav-link${isActive? ' active':''}`}>MEN</NavLink>
          <NavLink to="/category/women" className={({isActive})=>`nav-link${isActive? ' active':''}`}>WOMEN</NavLink>
          <NavLink to="/category/sneaker" className={({isActive})=>`nav-link${isActive? ' active':''}`}>SNEAKERS</NavLink>
        </div>

      
        <div className="navbar-center">
          <Link to="/" className="logo">
            <img 
              src="https://tss-static-images.gumlet.io/non-member-logo2.gif" 
              alt="The Souled Store" 
            />
          </Link>
        </div>

      
        <div className="navbar-right">
          {/* Search Toggle */}
          <button 
            className="icon-btn search-toggle" 
            onClick={() => setShowSearch(!showSearch)}
            title="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Account */}
          {currentUser ? (
            <div className="user-menu-wrapper">
              <div className="user-display" onClick={() => setShowUserMenu(!showUserMenu)}>
                <button 
                  className="icon-btn user-btn" 
                  title={currentUser.name}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
                <span className="username">{currentUser.name.split(' ')[0]}</span>
              </div>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <div className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
                    <div className="user-details">
                      <div className="user-name">{currentUser.name}</div>
                      <div className="user-email">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="icon-btn" onClick={() => navigate('/login')} title="Login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          )}

          {/* Wishlist */}
          <button className="icon-btn" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Cart */}
          <Link to="/cart" className="cart-link" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Search Overlay */}
      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="search-form">
              <input 
                type="text" 
                placeholder="Search for products, categories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <button 
                type="button" 
                className="search-close" 
                onClick={() => setShowSearch(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </form>

            {/* Search Results */}
            {searchQuery && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  <>
                    <div className="search-results-header">
                      Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                    </div>
                    <div className="search-results-list">
                      {searchResults.map((product) => (
                        <div 
                          key={product.id} 
                          className="search-result-item"
                          onClick={() => handleProductClick(product)}
                        >
                          <img 
                            src={product.img || 'https://via.placeholder.com/60'} 
                            alt={product.title}
                            onError={(e) => e.target.src = 'https://via.placeholder.com/60?text=No+Image'}
                          />
                          <div className="search-result-info">
                            <div className="search-result-title">{product.title}</div>
                            <div className="search-result-category">{product.category || product.categoryType}</div>
                          </div>
                          <div className="search-result-price">{product.price}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="search-no-results">
                    <div className="no-results-icon">🔍</div>
                    <div className="no-results-text">No products found for "{searchQuery}"</div>
                    <div className="no-results-hint">Try different keywords</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
