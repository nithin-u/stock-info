import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  const handleDropdownClose = () => {
    setIsUserMenuOpen(false);
  };

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isUserMenuOpen, isMobileMenuOpen]);

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">SI</span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Stock Info India
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-orange-600 bg-orange-50 shadow-sm' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/penny-stocks" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/penny-stocks') 
                    ? 'text-orange-600 bg-orange-50 shadow-sm' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Penny Stocks
              </Link>
              <Link 
                to="/mutual-funds" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/mutual-funds') 
                    ? 'text-orange-600 bg-orange-50 shadow-sm' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Mutual Funds
              </Link>
              <Link 
                to="/watchlist" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/watchlist') 
                    ? 'text-orange-600 bg-orange-50 shadow-sm' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Watchlist
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/about') 
                    ? 'text-orange-600 bg-orange-50 shadow-sm' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                About
              </Link>

              {/* FIXED Desktop User Menu - Proper Positioning */}
              <div className="relative ml-4">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                    {user?.name || 'User'}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : 'rotate-0'
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* FIXED Desktop User Dropdown Menu - POSITIONED BELOW NAVBAR */}
                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-gray-200 z-[9999]"
                    style={{ 
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      marginTop: '8px',
                      zIndex: 9999
                    }}
                  >
                    {/* Arrow pointing up to the button */}
                    <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-200 transform rotate-45"></div>
                    
                    {/* ADDED Cancel/Close Button */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={handleDropdownClose}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Close menu"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* User Info Header - Enhanced */}
                    <div className="px-4 py-4 border-b-2 border-gray-100 bg-gradient-to-r from-orange-50 to-green-50 rounded-t-xl">
                      <div className="flex items-center space-x-3 pr-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {user?.name || 'Demo User'}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.email || 'demo@stockinfo.com'}
                          </p>
                          {user?.accountType && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white mt-1">
                              {user.accountType === 'demo' ? 'Demo Account' : 'Registered User'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items - Enhanced with borders */}
                    <div className="py-2">
                      <Link
                        to="/watchlist"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border-b border-gray-100"
                        onClick={handleDropdownClose}
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">My Watchlists</div>
                          <div className="text-xs text-gray-500">Manage your tracked stocks</div>
                        </div>
                      </Link>
                      
                      <Link
                        to="/about"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100"
                        onClick={handleDropdownClose}
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">About Platform</div>
                          <div className="text-xs text-gray-500">Learn more about Stock Info</div>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Sign Out - Styled like mobile version */}
                    <div className="px-4 py-3">
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <div className="w-8 h-8 bg-red-700 bg-opacity-30 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Sign Out</div>
                          <div className="text-xs text-red-100">End your session</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white relative z-[9999]">
              {/* Mobile User Info Section */}
              <div className="px-3 py-3 border-b border-gray-200 bg-gray-50 rounded-lg mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || 'Demo User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'demo@stockinfo.com'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                🏠 Home
              </Link>
              <Link 
                to="/penny-stocks" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/penny-stocks') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                🪙 Penny Stocks
              </Link>
              <Link 
                to="/mutual-funds" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/mutual-funds') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                📊 Mutual Funds
              </Link>
              <Link 
                to="/watchlist" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/watchlist') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                ⭐ Watchlist
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                ℹ️ About
              </Link>
              
              {/* Mobile Sign Out Button */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-lg"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    🚪 Sign out
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Backdrop for dropdowns with blur effect */}
      {(isUserMenuOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-[99] bg-black bg-opacity-30 backdrop-blur-sm" 
          onClick={() => {
            handleDropdownClose();
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}
