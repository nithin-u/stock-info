import api from './api';

class StockService {
  // Get penny stocks with filters and pagination
  async getPennyStocks(params = {}) {
    try {
      const response = await api.get('/stocks/penny', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch penny stocks');
    }
  }

  // Get single stock details
  async getStock(ticker) {
    try {
      const response = await api.get(`/stocks/${ticker}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || `Failed to fetch data for ${ticker}`);
    }
  }

  // Search stocks
  async searchStocks(query, limit = 10) {
    try {
      const response = await api.get(`/stocks/search/${encodeURIComponent(query)}`, {
        params: { limit }
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search stocks');
    }
  }

  // Get stock price history
  async getStockHistory(ticker, period = '1M') {
    try {
      const response = await api.get(`/stocks/${ticker}/history`, {
        params: { period }
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch stock history');
    }
  }

  // Get top gainers
  async getTopGainers(limit = 10) {
    try {
      const response = await api.get('/stocks/gainers', { params: { limit } });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch top gainers');
    }
  }

  // Get top losers
  async getTopLosers(limit = 10) {
    try {
      const response = await api.get('/stocks/losers', { params: { limit } });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch top losers');
    }
  }

  // Get all sectors
  async getSectors() {
    try {
      const response = await api.get('/stocks/sectors');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sectors');
    }
  }
}

export default new StockService();
