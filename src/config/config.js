// Smart Dynamic Configuration for Stock Info India
// This file automatically detects environment and sets appropriate URLs

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Fallback configuration (in case env vars are missing)
const fallbackConfig = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    BACKEND_URL: 'http://localhost:5000',
    WS_URL: 'ws://localhost:5000'
  },
  production: {
    API_BASE_URL: 'https://stock-info-backend.onrender.com/api',
    BACKEND_URL: 'https://stock-info-backend.onrender.com',
    WS_URL: 'wss://stock-info-backend.onrender.com'
  }
};

// Get current environment config
const currentFallback = isDevelopment ? fallbackConfig.development : fallbackConfig.production;

// Configuration with environment variable override
export const CONFIG = {
  // API URLs - Environment variables take priority, fallback to defaults
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || currentFallback.API_BASE_URL,
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || currentFallback.BACKEND_URL,
  WS_URL: import.meta.env.VITE_WS_URL || currentFallback.WS_URL,
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Stock Info India',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  NODE_ENV: import.meta.env.VITE_NODE_ENV || (isDevelopment ? 'development' : 'production'),
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  DEBUG_WEBSOCKET: import.meta.env.VITE_DEBUG_WEBSOCKET === 'true',
  DEBUG_API: import.meta.env.VITE_DEBUG_API === 'true',
  
  // Environment Detection
  isDevelopment,
  isProduction
};

// Debug logging (only in development)
if (CONFIG.ENABLE_DEBUG) {
  console.log('🌍 Environment:', CONFIG.NODE_ENV);
  console.log('🔗 API Base URL:', CONFIG.API_BASE_URL);
  console.log('🔗 Backend URL:', CONFIG.BACKEND_URL);
  console.log('🔌 WebSocket URL:', CONFIG.WS_URL);
  console.log('📱 App Name:', CONFIG.APP_NAME);
  console.log('📊 Analytics Enabled:', CONFIG.ENABLE_ANALYTICS);
  console.log('🐛 Debug Mode:', CONFIG.ENABLE_DEBUG);
}

// Export individual values for easy importing
export const { 
  API_BASE_URL, 
  BACKEND_URL, 
  WS_URL, 
  APP_NAME, 
  APP_VERSION,
  ENABLE_ANALYTICS,
  ENABLE_DEBUG,
  DEBUG_WEBSOCKET,
  DEBUG_API
} = CONFIG;

export default CONFIG;
