import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import IndianStockCard from '../components/IndianStockCard';
import FadeInAnimation from '../components/FadeInAnimation';

export default function Watchlist() {
  const { 
    watchlists, 
    activeWatchlistId, 
    setActiveWatchlistId,
    createWatchlist,
    deleteWatchlist,
    renameWatchlist,
    removeStockFromWatchlist
  } = useWatchlist();
  
  const [watchlistStocks, setWatchlistStocks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [editingWatchlistId, setEditingWatchlistId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(false);

  const activeWatchlist = watchlists[activeWatchlistId];

  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'pink', class: 'bg-pink-500' }
  ];

  // IMPROVED MOCK DATA WITH MORE STOCKS
  const allMockStocks = [
    // Indian Stocks
    {
      ticker: 'IDEA',
      name: 'Vodafone Idea Limited',
      price: 7.20,
      change: -0.15,
      changePercent: -2.04,
      category: 'Penny Stocks',
      sector: 'Telecommunications',
      marketCap: '₹51,837 Cr',
      volume: '78.01 Cr',
      exchange: 'NSE',
      currency: '₹'
    },
    {
      ticker: 'YESBANK',
      name: 'Yes Bank Limited',
      price: 19.60,
      change: 0.45,
      changePercent: 2.35,
      category: 'Penny Stocks',
      sector: 'Banking',
      marketCap: '₹61,523 Cr',
      volume: '5.67 Cr',
      exchange: 'NSE',
      currency: '₹'
    },
    {
      ticker: 'SUZLON',
      name: 'Suzlon Energy Limited',
      price: 68.75,
      change: 2.15,
      changePercent: 3.23,
      category: 'Penny Stocks',
      sector: 'Renewable Energy',
      marketCap: '₹9,234 Cr',
      volume: '1.23 Cr',
      exchange: 'NSE',
      currency: '₹'
    },
    {
      ticker: 'RPOWER',
      name: 'Reliance Power Limited',
      price: 15.30,
      change: -0.85,
      changePercent: -5.27,
      category: 'Penny Stocks',
      sector: 'Power',
      marketCap: '₹3,456 Cr',
      volume: '8.90 Cr',
      exchange: 'NSE',
      currency: '₹'
    },
    {
      ticker: 'JPASSOCIAT',
      name: 'Jaiprakash Associates Ltd',
      price: 4.85,
      change: 0.25,
      changePercent: 5.43,
      category: 'Penny Stocks',
      sector: 'Construction',
      marketCap: '₹2,890 Cr',
      volume: '12.45 Cr',
      exchange: 'NSE',
      currency: '₹'
    },
    // US Stocks (for backward compatibility)
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.34,
      changePercent: 1.35,
      sector: 'Technology',
      marketCap: '$2.8T',
      volume: '45.2M',
      exchange: 'NASDAQ',
      currency: '$'
    },
    {
      ticker: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: -5.20,
      changePercent: -2.05,
      sector: 'Technology',
      marketCap: '$789B',
      volume: '23.1M',
      exchange: 'NASDAQ',
      currency: '$'
    }
  ];

  // IMPROVED DATA LOADING WITH DEBUG
  useEffect(() => {
    console.log('🔄 Watchlist effect triggered');
    console.log('📋 Active watchlist:', activeWatchlist);
    console.log('📊 All mock stocks:', allMockStocks.length);
    
    if (activeWatchlist && activeWatchlist.stocks) {
      setLoading(true);
      
      // Add small delay to simulate loading and ensure state updates properly
      setTimeout(() => {
        const filteredStocks = allMockStocks.filter(stock => {
          const isIncluded = activeWatchlist.stocks.includes(stock.ticker);
          console.log(`🎯 ${stock.ticker}: ${isIncluded ? 'INCLUDED' : 'NOT INCLUDED'}`);
          return isIncluded;
        });
        
        console.log('✅ Filtered stocks:', filteredStocks.length, filteredStocks.map(s => s.ticker));
        setWatchlistStocks(filteredStocks);
        setLoading(false);
      }, 300);
    } else {
      console.log('❌ No active watchlist or no stocks array');
      setWatchlistStocks([]);
      setLoading(false);
    }
  }, [activeWatchlist, activeWatchlistId]); // Add activeWatchlistId as dependency

  const handleCreateWatchlist = (e) => {
    e.preventDefault();
    if (newWatchlistName.trim()) {
      const newId = createWatchlist(newWatchlistName.trim(), selectedColor);
      setActiveWatchlistId(newId);
      setNewWatchlistName('');
      setShowCreateForm(false);
      setSelectedColor('blue');
      // Show success message
      alert(`Created watchlist "${newWatchlistName.trim()}" successfully!`);
    }
  };

  const handleRenameWatchlist = (watchlistId) => {
    if (editingName.trim()) {
      renameWatchlist(watchlistId, editingName.trim());
      setEditingWatchlistId(null);
      setEditingName('');
    }
  };

  const handleDeleteWatchlist = (watchlistId) => {
    if (window.confirm('Are you sure you want to delete this watchlist?')) {
      deleteWatchlist(watchlistId);
    }
  };

  const handleRemoveStock = (ticker) => {
    if (window.confirm(`Remove ${ticker} from ${activeWatchlist.name}?`)) {
      removeStockFromWatchlist(ticker, activeWatchlistId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeInAnimation>
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Watchlists</h1>
                <p className="text-gray-600">
                  Manage your stock watchlists and track your favorite investments
                </p>
              </div>
              
              <button
                onClick={() => setShowCreateForm(true)}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New List
              </button>
            </div>

            {/* DEBUG INFO - TEMPORARY */}
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">🔍 Debug Info:</h4>
              <p className="text-sm text-yellow-700">Active List: {activeWatchlist?.name || 'None'}</p>
              <p className="text-sm text-yellow-700">Stocks in List: {activeWatchlist?.stocks?.length || 0}</p>
              <p className="text-sm text-yellow-700">Displayed Stocks: {watchlistStocks.length}</p>
              <p className="text-sm text-yellow-700">Loading: {loading ? 'Yes' : 'No'}</p>
              {activeWatchlist?.stocks && (
                <p className="text-sm text-yellow-700">Stock Tickers: {activeWatchlist.stocks.join(', ')}</p>
              )}
            </div>

            {/* Watchlist Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {Object.values(watchlists).map((watchlist) => (
                  <div key={watchlist.id} className="flex items-center group">
                    <button
                      onClick={() => {
                        console.log('🔄 Switching to watchlist:', watchlist.name);
                        setActiveWatchlistId(watchlist.id);
                      }}
                      className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeWatchlistId === watchlist.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          watchlist.color === 'blue' ? 'bg-blue-500' :
                          watchlist.color === 'green' ? 'bg-green-500' :
                          watchlist.color === 'red' ? 'bg-red-500' :
                          watchlist.color === 'purple' ? 'bg-purple-500' :
                          watchlist.color === 'orange' ? 'bg-orange-500' :
                          watchlist.color === 'pink' ? 'bg-pink-500' :
                          'bg-blue-500'
                        }`}></div>
                        {editingWatchlistId === watchlist.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onBlur={() => handleRenameWatchlist(watchlist.id)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleRenameWatchlist(watchlist.id);
                              }
                            }}
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <span
                            onDoubleClick={() => {
                              setEditingWatchlistId(watchlist.id);
                              setEditingName(watchlist.name);
                            }}
                          >
                            {watchlist.name}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">({watchlist.stocks?.length || 0})</span>
                      </div>
                    </button>
                    
                    {/* Watchlist Actions */}
                    {watchlist.id !== 'my-favorites' && (
                      <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteWatchlist(watchlist.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Delete watchlist"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </FadeInAnimation>

        {/* Create New Watchlist Form */}
        {showCreateForm && (
          <FadeInAnimation>
            <div className="mb-8 bg-white rounded-lg shadow-md p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Watchlist</h3>
              <form onSubmit={handleCreateWatchlist} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Watchlist Name
                  </label>
                  <input
                    type="text"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    placeholder="e.g., Tech Stocks, Dividend Champions, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <div className="flex space-x-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full ${color.class} ${
                          selectedColor === color.name ? 'ring-4 ring-gray-300 ring-offset-2' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Watchlist
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewWatchlistName('');
                      setSelectedColor('blue');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </FadeInAnimation>
        )}

        {/* Active Watchlist Content */}
        {activeWatchlist ? (
          <FadeInAnimation delay={200}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    activeWatchlist.color === 'blue' ? 'bg-blue-500' :
                    activeWatchlist.color === 'green' ? 'bg-green-500' :
                    activeWatchlist.color === 'red' ? 'bg-red-500' :
                    activeWatchlist.color === 'purple' ? 'bg-purple-500' :
                    activeWatchlist.color === 'orange' ? 'bg-orange-500' :
                    activeWatchlist.color === 'pink' ? 'bg-pink-500' :
                    'bg-blue-500'
                  }`}></div>
                  {activeWatchlist.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {watchlistStocks.length} stock{watchlistStocks.length !== 1 ? 's' : ''}
                </span>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading stocks...</p>
                </div>
              ) : watchlistStocks.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Your {activeWatchlist.name.toLowerCase()} is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add stocks to this watchlist from the dashboard to track them easily.
                  </p>
                  <Link 
                    to="/" 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Browse Indian Stocks
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {watchlistStocks.map((stock, index) => (
                    <FadeInAnimation key={stock.ticker} delay={index * 50}>
                      <div className="relative group">
                        <IndianStockCard stock={stock} />
                        
                        {/* Remove from watchlist button */}
                        <button
                          onClick={() => handleRemoveStock(stock.ticker)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center"
                          title={`Remove from ${activeWatchlist.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </FadeInAnimation>
                  ))}
                </div>
              )}
            </div>
          </FadeInAnimation>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No active watchlist</h3>
            <p className="text-gray-600 mb-6">Create a new watchlist to start tracking stocks.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your First Watchlist
            </button>
          </div>
        )}

        {/* Summary Stats */}
        {Object.keys(watchlists).length > 0 && (
          <FadeInAnimation delay={400}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{Object.keys(watchlists).length}</div>
                <div className="text-sm text-gray-600">Total Lists</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(watchlists).reduce((total, list) => total + (list.stocks?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Stocks</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {watchlistStocks.filter(stock => stock.exchange === 'NSE').length}
                </div>
                <div className="text-sm text-gray-600">Indian Stocks</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {watchlistStocks.filter(stock => stock.exchange === 'NASDAQ' || stock.exchange === 'NYSE').length}
                </div>
                <div className="text-sm text-gray-600">US Stocks</div>
              </div>
            </div>
          </FadeInAnimation>
        )}
      </div>
    </div>
  );
}
