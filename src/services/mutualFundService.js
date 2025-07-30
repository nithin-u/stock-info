import api from './api';

class MutualFundService {
  // Get mutual funds with filters and pagination
  async getMutualFunds(params = {}) {
    try {
      const response = await api.get('/mutual-funds', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch mutual funds');
    }
  }

  // Get single mutual fund details
  async getMutualFund(schemeCode) {
    try {
      const response = await api.get(`/mutual-funds/${schemeCode}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || `Failed to fetch data for ${schemeCode}`);
    }
  }

  // Search mutual funds
  async searchMutualFunds(query, limit = 10) {
    try {
      const response = await api.get(`/mutual-funds/search/${encodeURIComponent(query)}`, {
        params: { limit }
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search mutual funds');
    }
  }

  // Get fund categories
  async getCategories() {
    try {
      const response = await api.get('/mutual-funds/categories');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  }

  // Get fund houses
  async getFundHouses() {
    try {
      const response = await api.get('/mutual-funds/fund-houses');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch fund houses');
    }
  }

  // Get top performing funds
  async getTopPerformers(period = '1Year', limit = 10) {
    try {
      const response = await api.get('/mutual-funds/top-performers', {
        params: { period, limit }
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch top performers');
    }
  }
}

export default new MutualFundService();
