import api from './api';

class WatchlistService {
  // Get all user watchlists
  async getWatchlists() {
    try {
      const response = await api.get('/watchlists');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch watchlists');
    }
  }

  // Get single watchlist with populated data
  async getWatchlist(watchlistId) {
    try {
      const response = await api.get(`/watchlists/${watchlistId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch watchlist');
    }
  }

  // Create new watchlist
  async createWatchlist(watchlistData) {
    try {
      const response = await api.post('/watchlists', watchlistData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create watchlist');
    }
  }

  // Update watchlist
  async updateWatchlist(watchlistId, watchlistData) {
    try {
      const response = await api.put(`/watchlists/${watchlistId}`, watchlistData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update watchlist');
    }
  }

  // Delete watchlist
  async deleteWatchlist(watchlistId) {
    try {
      await api.delete(`/watchlists/${watchlistId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete watchlist');
    }
  }

  // Add stock to watchlist
  async addStockToWatchlist(watchlistId, stockData) {
    try {
      const response = await api.post(`/watchlists/${watchlistId}/stocks`, stockData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add stock to watchlist');
    }
  }

  // Remove stock from watchlist
  async removeStockFromWatchlist(watchlistId, ticker) {
    try {
      const response = await api.delete(`/watchlists/${watchlistId}/stocks/${ticker}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove stock from watchlist');
    }
  }
}

export default new WatchlistService();
