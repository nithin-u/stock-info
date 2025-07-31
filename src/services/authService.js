import api from './api';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, data } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);  // Fixed: changed 'authToken' to 'token'
      localStorage.setItem('user', JSON.stringify(data));  // Fixed: changed 'userData' to 'user'
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Login user
  async login(email, password) {
    try {
      console.log('🔐 AuthService: Attempting login...');
      const response = await api.post('/auth/login', { email, password });
      const { token, data } = response.data;
      
      console.log('✅ Login response received, storing token...');
      
      // Store token and user data
      localStorage.setItem('token', token);  // Fixed: changed 'authToken' to 'token'
      localStorage.setItem('user', JSON.stringify(data));  // Fixed: changed 'userData' to 'user'
      
      console.log('🔑 Token stored:', !!token);
      console.log('👤 User data stored:', !!data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Logout user
  async logout() {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error.message);
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');  // Fixed: changed 'authToken' to 'token'
      localStorage.removeItem('user');  // Fixed: changed 'userData' to 'user'
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/updatedetails', userData);
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data.data));  // Fixed: changed 'userData' to 'user'
      
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Update password
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('/auth/updatepassword', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update password');
    }
  }

  // Check if user is logged in
  isAuthenticated() {
    const token = localStorage.getItem('token');  // Fixed: changed 'authToken' to 'token'
    const userData = localStorage.getItem('user');  // Fixed: changed 'userData' to 'user'
    return !!(token && userData);
  }

  // Get stored user data
  getUserData() {
    const userData = localStorage.getItem('user');  // Fixed: changed 'userData' to 'user'
    return userData ? JSON.parse(userData) : null;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('token');  // Fixed: changed 'authToken' to 'token'
  }
}

export default new AuthService();
