import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';

export default function WatchlistButton({ ticker }) {
  const { 
    watchlists, 
    addStockToWatchlist, 
    removeStockFromWatchlist, 
    isStockInWatchlist,
    getWatchlistsContainingStock,
    createWatchlist
  } = useWatchlist();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  const watchlistsContainingStock = getWatchlistsContainingStock(ticker);
  const isInAnyWatchlist = watchlistsContainingStock.length > 0;

  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'pink', class: 'bg-pink-500' }
  ];

  const handleWatchlistToggle = (watchlistId) => {
    if (isStockInWatchlist(ticker, watchlistId)) {
      removeStockFromWatchlist(ticker, watchlistId);
    } else {
      addStockToWatchlist(ticker, watchlistId);
    }
  };

  const handleCreateWatchlist = (e) => {
    e.preventDefault();
    if (newWatchlistName.trim()) {
      const newWatchlistId = createWatchlist(newWatchlistName.trim(), selectedColor);
      addStockToWatchlist(ticker, newWatchlistId);
      setNewWatchlistName('');
      setShowCreateForm(false);
      setSelectedColor('blue');
      // Show success message
      alert(`Created "${newWatchlistName}" and added ${ticker}!`);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isInAnyWatchlist 
            ? 'bg-green-100 text-green-800 hover:bg-green-200 shadow-md' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
        }`}
      >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        {isInAnyWatchlist 
          ? `In ${watchlistsContainingStock.length} List${watchlistsContainingStock.length > 1 ? 's' : ''}` 
          : 'Add to Watchlist'
        }
        <svg className={`w-4 h-4 ml-2 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Menu - FIXED POSITIONING AND Z-INDEX */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999]">
          {/* Arrow pointer */}
          <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Add to Watchlist
            </h3>
            
            {/* Current Stock Info */}
            <div className="mb-4 p-2 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-900">{ticker}</p>
              <p className="text-xs text-gray-500">Select watchlists to add this stock</p>
            </div>
            
            {/* Existing Watchlists */}
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {Object.values(watchlists).map((watchlist) => {
                const isInThisList = isStockInWatchlist(ticker, watchlist.id);
                return (
                  <div key={watchlist.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        watchlist.color === 'blue' ? 'bg-blue-500' :
                        watchlist.color === 'green' ? 'bg-green-500' :
                        watchlist.color === 'red' ? 'bg-red-500' :
                        watchlist.color === 'purple' ? 'bg-purple-500' :
                        watchlist.color === 'orange' ? 'bg-orange-500' :
                        watchlist.color === 'pink' ? 'bg-pink-500' :
                        'bg-blue-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">{watchlist.name}</span>
                      <span className="text-xs text-gray-500">({watchlist.stocks.length})</span>
                    </div>
                    <button
                      onClick={() => handleWatchlistToggle(watchlist.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        isInThisList 
                          ? 'bg-green-500 border-green-500 text-white shadow-md' 
                          : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                      }`}
                    >
                      {isInThisList && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Create New Watchlist */}
            <div className="pt-4 border-t border-gray-200">
              {!showCreateForm ? (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Watchlist
                </button>
              ) : (
                <form onSubmit={handleCreateWatchlist} className="space-y-3">
                  <input
                    type="text"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    placeholder="Enter watchlist name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  
                  {/* Color Selection */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Color:</span>
                    <div className="flex space-x-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-5 h-5 rounded-full ${color.class} ${
                            selectedColor === color.name ? 'ring-2 ring-gray-400 ring-offset-1' : ''
                          } transition-all hover:scale-110`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Create & Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewWatchlistName('');
                        setSelectedColor('blue');
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop - IMPROVED */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => {
            setShowDropdown(false);
            setShowCreateForm(false);
            setNewWatchlistName('');
            setSelectedColor('blue');
          }}
        />
      )}
    </div>
  );
}
