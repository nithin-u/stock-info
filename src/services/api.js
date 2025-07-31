import axios from 'axios';
import { API_BASE_URL, DEBUG_API } from '../config/config.js';

if (DEBUG_API) {
  console.log('🌐 API Service initialized with URL:', API_BASE_URL);
}

// Create axios instance with dynamic configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      if (DEBUG_API) {
        console.log('🔑 Token attached to request');
      }
    } else if (DEBUG_API) {
      console.log('⚠️ No token found for request');
    }
    
    if (DEBUG_API) {
      console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
      console.log('📋 Request headers:', {
        'Content-Type': config.headers['Content-Type'],
        'Authorization': config.headers.Authorization ? '✅ Present' : '❌ Missing'
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (DEBUG_API) {
      console.log('📥 API Response:', response.status, response.config.url);
      console.log('✅ Response data preview:', {
        success: response.data?.success,
        hasData: !!response.data?.data,
        hasToken: !!response.data?.token
      });
    }
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      data: error.response?.data
    });
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.warn('🚨 Authentication failed - clearing stored auth data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login/signup pages
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
        console.log('🔄 Redirecting to login page...');
        window.location.href = '/login';
      }
    }
    
    // Handle CORS errors
    if (error.code === 'ERR_NETWORK') {
      console.error('🌐 Network Error - Possible CORS issue or backend not running');
      console.error('🔍 Check backend server and CORS configuration');
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout - Backend might be slow or unresponsive');
    }
    
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
