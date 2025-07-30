import api from './api';

class MarketService {
  // Get market indices
  async getMarketIndices() {
    try {
      const response = await api.get('/market/indices');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch market indices');
    }
  }

  // Get market status
  async getMarketStatus() {
    try {
      const response = await api.get('/market/status');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch market status');
    }
  }
}

export default new MarketService();
