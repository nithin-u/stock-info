import { createContext, useContext, useEffect, useState } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlists, setWatchlists] = useState(() => {
    const saved = localStorage.getItem('watchlists');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing watchlists:', error);
      }
    }
    // Default watchlists
    return {
      'my-favorites': {
        id: 'my-favorites',
        name: 'My Favorites',
        stocks: [],
        createdAt: new Date().toISOString(),
        color: 'blue'
      }
    };
  });

  const [activeWatchlistId, setActiveWatchlistId] = useState(() => {
    return localStorage.getItem('activeWatchlistId') || 'my-favorites';
  });

  // Save to localStorage whenever watchlists change
  useEffect(() => {
    localStorage.setItem('watchlists', JSON.stringify(watchlists));
  }, [watchlists]);

  useEffect(() => {
    localStorage.setItem('activeWatchlistId', activeWatchlistId);
  }, [activeWatchlistId]);

  // Create a new watchlist
  const createWatchlist = (name, color = 'blue') => {
    const id = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const newWatchlist = {
      id,
      name,
      stocks: [],
      createdAt: new Date().toISOString(),
      color
    };
    
    setWatchlists(prev => ({
      ...prev,
      [id]: newWatchlist
    }));
    
    return id;
  };

  // Delete a watchlist
  const deleteWatchlist = (watchlistId) => {
    if (watchlistId === 'my-favorites') return; // Prevent deleting default list
    
    setWatchlists(prev => {
      const newWatchlists = { ...prev };
      delete newWatchlists[watchlistId];
      return newWatchlists;
    });
    
    // If deleted watchlist was active, switch to default
    if (activeWatchlistId === watchlistId) {
      setActiveWatchlistId('my-favorites');
    }
  };

  // Rename a watchlist
  const renameWatchlist = (watchlistId, newName) => {
    setWatchlists(prev => ({
      ...prev,
      [watchlistId]: {
        ...prev[watchlistId],
        name: newName
      }
    }));
  };

  // Add stock to specific watchlist
  const addStockToWatchlist = (ticker, watchlistId) => {
    setWatchlists(prev => {
      const watchlist = prev[watchlistId];
      if (!watchlist) return prev;
      
      const updatedStocks = [...new Set([...watchlist.stocks, ticker])];
      
      return {
        ...prev,
        [watchlistId]: {
          ...watchlist,
          stocks: updatedStocks
        }
      };
    });
  };

  // Remove stock from specific watchlist
  const removeStockFromWatchlist = (ticker, watchlistId) => {
    setWatchlists(prev => {
      const watchlist = prev[watchlistId];
      if (!watchlist) return prev;
      
      return {
        ...prev,
        [watchlistId]: {
          ...watchlist,
          stocks: watchlist.stocks.filter(stock => stock !== ticker)
        }
      };
    });
  };

  // Check if stock is in specific watchlist
  const isStockInWatchlist = (ticker, watchlistId) => {
    const watchlist = watchlists[watchlistId];
    return watchlist ? watchlist.stocks.includes(ticker) : false;
  };

  // Get all watchlists containing a specific stock
  const getWatchlistsContainingStock = (ticker) => {
    return Object.values(watchlists).filter(watchlist => 
      watchlist.stocks.includes(ticker)
    );
  };

  // Legacy methods for backward compatibility
  const addStock = (ticker) => addStockToWatchlist(ticker, activeWatchlistId);
  const removeStock = (ticker) => removeStockFromWatchlist(ticker, activeWatchlistId);
  const inWatchlist = (ticker) => isStockInWatchlist(ticker, activeWatchlistId);
  const watchlist = watchlists[activeWatchlistId]?.stocks || [];

  const value = {
    // New multi-watchlist methods
    watchlists,
    activeWatchlistId,
    setActiveWatchlistId,
    createWatchlist,
    deleteWatchlist,
    renameWatchlist,
    addStockToWatchlist,
    removeStockFromWatchlist,
    isStockInWatchlist,
    getWatchlistsContainingStock,
    
    // Legacy methods for backward compatibility
    watchlist,
    addStock,
    removeStock,
    inWatchlist
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
