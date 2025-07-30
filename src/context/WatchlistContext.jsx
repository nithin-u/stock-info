import { createContext, useContext, useEffect, useState } from 'react';
import watchlistService from '../services/watchlistService';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [watchlists, setWatchlists] = useState({});
  const [activeWatchlistId, setActiveWatchlistId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch watchlists when user is authenticated
  useEffect(() => {
    const fetchWatchlists = async () => {
      if (!isAuthenticated || !user) {
        setWatchlists({});
        setActiveWatchlistId(null);
        return;
      }

      try {
        setLoading(true);
        console.log('🔄 Fetching user watchlists...');
        
        const userWatchlists = await watchlistService.getWatchlists();
        
        // Convert array to object for easier access
        const watchlistsObj = {};
        userWatchlists.forEach(watchlist => {
          watchlistsObj[watchlist._id] = {
            id: watchlist._id,
            name: watchlist.name,
            description: watchlist.description,
            color: watchlist.color,
            isDefault: watchlist.isDefault,
            stocks: watchlist.stocks.map(stock => stock.ticker),
            mutualFunds: watchlist.mutualFunds.map(fund => fund.schemeCode),
            totalItems: watchlist.totalItems,
            createdAt: watchlist.createdAt
          };
        });

        setWatchlists(watchlistsObj);
        
        // Set active watchlist to default or first one
        const defaultWatchlist = userWatchlists.find(w => w.isDefault);
        const firstWatchlist = userWatchlists[0];
        
        if (defaultWatchlist) {
          setActiveWatchlistId(defaultWatchlist._id);
        } else if (firstWatchlist) {
          setActiveWatchlistId(firstWatchlist._id);
        }
        
        console.log('✅ Watchlists loaded:', userWatchlists.length);
        
      } catch (error) {
        console.error('❌ Failed to fetch watchlists:', error.message);
        // Fallback to localStorage for offline functionality
        const localWatchlists = localStorage.getItem('watchlists');
        if (localWatchlists) {
          setWatchlists(JSON.parse(localWatchlists));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, [isAuthenticated, user]);

  // Create new watchlist
  const createWatchlist = async (name, color = 'blue') => {
    if (!isAuthenticated) {
      console.warn('User not authenticated');
      return null;
    }

    try {
      console.log(`🔄 Creating watchlist: ${name}`);
      
      const newWatchlist = await watchlistService.createWatchlist({
        name,
        color,
        description: `${name} watchlist`
      });

      const watchlistObj = {
        id: newWatchlist._id,
        name: newWatchlist.name,
        description: newWatchlist.description,
        color: newWatchlist.color,
        isDefault: newWatchlist.isDefault,
        stocks: [],
        mutualFunds: [],
        totalItems: 0,
        createdAt: newWatchlist.createdAt
      };

      setWatchlists(prev => ({
        ...prev,
        [newWatchlist._id]: watchlistObj
      }));

      console.log('✅ Watchlist created successfully');
      return newWatchlist._id;
      
    } catch (error) {
      console.error('❌ Failed to create watchlist:', error.message);
      throw error;
    }
  };

  // Delete watchlist
  const deleteWatchlist = async (watchlistId) => {
    if (!isAuthenticated) {
      console.warn('User not authenticated');
      return false;
    }

    try {
      console.log(`🔄 Deleting watchlist: ${watchlistId}`);
      
      await watchlistService.deleteWatchlist(watchlistId);

      setWatchlists(prev => {
        const updated = { ...prev };
        delete updated[watchlistId];
        return updated;
      });

      // Update active watchlist if deleted
      if (activeWatchlistId === watchlistId) {
        const remainingWatchlists = Object.keys(watchlists).filter(id => id !== watchlistId);
        setActiveWatchlistId(remainingWatchlists[0] || null);
      }

      console.log('✅ Watchlist deleted successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to delete watchlist:', error.message);
      throw error;
    }
  };

  // Rename watchlist
  const renameWatchlist = async (watchlistId, newName) => {
    if (!isAuthenticated) {
      console.warn('User not authenticated');
      return false;
    }

    try {
      console.log(`🔄 Renaming watchlist: ${watchlistId} to ${newName}`);
      
      const updatedWatchlist = await watchlistService.updateWatchlist(watchlistId, {
        name: newName
      });

      setWatchlists(prev => ({
        ...prev,
        [watchlistId]: {
          ...prev[watchlistId],
          name: updatedWatchlist.name
        }
      }));

      console.log('✅ Watchlist renamed successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to rename watchlist:', error.message);
      throw error;
    }
  };

  // Add stock to watchlist
  const addStockToWatchlist = async (ticker, watchlistId) => {
    if (!isAuthenticated) {
      console.warn('User not authenticated');
      return false;
    }

    const targetWatchlistId = watchlistId || activeWatchlistId;
    if (!targetWatchlistId) {
      console.warn('No watchlist selected');
      return false;
    }

    try {
      console.log(`🔄 Adding ${ticker} to watchlist: ${targetWatchlistId}`);
      
      await watchlistService.addStockToWatchlist(targetWatchlistId, {
        ticker,
        notes: `Added ${ticker} to watchlist`
      });

      // Update local state
      setWatchlists(prev => ({
        ...prev,
        [targetWatchlistId]: {
          ...prev[targetWatchlistId],
          stocks: [...(prev[targetWatchlistId]?.stocks || []), ticker],
          totalItems: (prev[targetWatchlistId]?.totalItems || 0) + 1
        }
      }));

      console.log('✅ Stock added to watchlist successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to add stock to watchlist:', error.message);
      throw error;
    }
  };

  // Remove stock from watchlist
  const removeStockFromWatchlist = async (ticker, watchlistId) => {
    if (!isAuthenticated) {
      console.warn('User not authenticated');
      return false;
    }

    const targetWatchlistId = watchlistId || activeWatchlistId;
    if (!targetWatchlistId) {
      console.warn('No watchlist selected');
      return false;
    }

    try {
      console.log(`🔄 Removing ${ticker} from watchlist: ${targetWatchlistId}`);
      
      await watchlistService.removeStockFromWatchlist(targetWatchlistId, ticker);

      // Update local state
      setWatchlists(prev => ({
        ...prev,
        [targetWatchlistId]: {
          ...prev[targetWatchlistId],
          stocks: (prev[targetWatchlistId]?.stocks || []).filter(t => t !== ticker),
          totalItems: Math.max((prev[targetWatchlistId]?.totalItems || 1) - 1, 0)
        }
      }));

      console.log('✅ Stock removed from watchlist successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to remove stock from watchlist:', error.message);
      throw error;
    }
  };

  // Check if stock is in any watchlist
  const isStockInWatchlist = (ticker, watchlistId) => {
    if (watchlistId) {
      return watchlists[watchlistId]?.stocks?.includes(ticker) || false;
    }
    
    // Check all watchlists
    return Object.values(watchlists).some(watchlist => 
      watchlist.stocks?.includes(ticker)
    );
  };

  // Get watchlists containing a specific stock
  const getWatchlistsContainingStock = (ticker) => {
    return Object.values(watchlists).filter(watchlist =>
      watchlist.stocks?.includes(ticker)
    );
  };

  const value = {
    watchlists,
    activeWatchlistId,
    setActiveWatchlistId,
    loading,
    createWatchlist,
    deleteWatchlist,
    renameWatchlist,
    addStockToWatchlist,
    removeStockFromWatchlist,
    isStockInWatchlist,
    getWatchlistsContainingStock
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
