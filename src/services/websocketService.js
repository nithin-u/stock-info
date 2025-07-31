import { WS_URL, DEBUG_WEBSOCKET } from '../config/config.js';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = null;
    this.pingInterval = null;
  }

  // Connect to WebSocket server
  connect() {
    try {
      // Use dynamic URL from config instead of hardcoded localhost
      const wsUrl = WS_URL;
      
      if (DEBUG_WEBSOCKET) {
        console.log('🔄 Connecting to WebSocket server...', wsUrl);
      } else {
        console.log('🔄 Connecting to WebSocket server...');
      }
      
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('✅ WebSocket connected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Start ping/pong heartbeat
        this.startHeartbeat();
        
        // Notify all subscribers about connection
        this.notifySubscribers('connection', { status: 'connected' });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        if (DEBUG_WEBSOCKET) {
          console.log('🔌 WebSocket connection closed:', event.code, event.reason);
        } else {
          console.log('🔌 WebSocket connection closed');
        }
        this.isConnected = false;
        this.stopHeartbeat();
        
        // Notify subscribers about disconnection
        this.notifySubscribers('connection', { status: 'disconnected' });
        
        // Attempt to reconnect
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.notifySubscribers('error', { error: error.message });
      };

    } catch (error) {
      console.error('❌ Failed to create WebSocket connection:', error);
    }
  }

  // Handle incoming WebSocket messages
  handleMessage(data) {
    if (DEBUG_WEBSOCKET) {
      console.log('📨 WebSocket message received:', data.type);
    }
    
    switch (data.type) {
      case 'connection':
        console.log('🎉 Connection established:', data.message);
        break;
        
      case 'price_update':
        if (DEBUG_WEBSOCKET) {
          console.log('📈 Price update:', data.data.ticker, '₹' + data.data.currentPrice);
        }
        this.notifySubscribers('price_update', data.data);
        break;
        
      case 'subscription_success':
        if (DEBUG_WEBSOCKET) {
          console.log('✅ Subscription successful:', data.subscribedTickers);
        }
        this.notifySubscribers('subscription_success', data);
        break;
        
      case 'pong':
        // Server responded to ping
        if (DEBUG_WEBSOCKET) {
          console.log('🏓 Pong received from server');
        }
        break;
        
      case 'error':
        console.error('❌ Server error:', data.message);
        this.notifySubscribers('error', data);
        break;
        
      default:
        if (DEBUG_WEBSOCKET) {
          console.log('📋 Unknown message type:', data.type, data);
        }
    }
  }

  // Subscribe to stock price updates
  subscribeToTickers(tickers, callback) {
    if (!Array.isArray(tickers)) {
      tickers = [tickers];
    }

    // Store callback for each ticker
    tickers.forEach(ticker => {
      if (!this.subscribers.has(ticker)) {
        this.subscribers.set(ticker, new Set());
      }
      this.subscribers.get(ticker).add(callback);
    });

    // Send subscription request if connected
    if (this.isConnected) {
      this.sendMessage({
        type: 'subscribe',
        tickers: tickers
      });
    } else {
      console.warn('⚠️ WebSocket not connected, subscription will be sent when connected');
    }

    if (DEBUG_WEBSOCKET) {
      console.log('🔔 Subscribed to tickers:', tickers);
    }
  }

  // Unsubscribe from stock price updates
  unsubscribeFromTickers(tickers, callback) {
    if (!Array.isArray(tickers)) {
      tickers = [tickers];
    }

    tickers.forEach(ticker => {
      if (this.subscribers.has(ticker)) {
        this.subscribers.get(ticker).delete(callback);
        
        // Remove ticker if no more subscribers
        if (this.subscribers.get(ticker).size === 0) {
          this.subscribers.delete(ticker);
        }
      }
    });

    // Send unsubscription request if connected
    if (this.isConnected) {
      this.sendMessage({
        type: 'unsubscribe',
        tickers: tickers
      });
    }

    if (DEBUG_WEBSOCKET) {
      console.log('🔕 Unsubscribed from tickers:', tickers);
    }
  }

  // Send message to WebSocket server
  sendMessage(message) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
        if (DEBUG_WEBSOCKET && message.type !== 'ping') {
          console.log('📤 Sent WebSocket message:', message.type);
        }
      } catch (error) {
        console.error('❌ Error sending WebSocket message:', error);
      }
    } else {
      console.warn('⚠️ Cannot send message: WebSocket not connected');
    }
  }

  // Notify all subscribers of a specific event
  notifySubscribers(type, data) {
    if (type === 'price_update' && data.ticker) {
      // Notify subscribers of this specific ticker
      const tickerSubscribers = this.subscribers.get(data.ticker);
      if (tickerSubscribers) {
        tickerSubscribers.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error('❌ Error in subscriber callback:', error);
          }
        });
      }
    } else {
      // Notify all subscribers for connection events, errors, etc.
      this.subscribers.forEach(callbackSet => {
        callbackSet.forEach(callback => {
          try {
            callback({ type, data });
          } catch (error) {
            console.error('❌ Error in subscriber callback:', error);
          }
        });
      });
    }
  }

  // Start ping/pong heartbeat
  startHeartbeat() {
    this.pingInterval = setInterval(() => {
      if (this.isConnected) {
        this.sendMessage({ type: 'ping' });
      }
    }, 30000); // Ping every 30 seconds
  }

  // Stop heartbeat
  stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  // Attempt to reconnect
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('❌ Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff, max 30s

    if (DEBUG_WEBSOCKET) {
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`);
    }

    this.reconnectInterval = setTimeout(() => {
      this.connect();
    }, delay);
  }

  // Disconnect from WebSocket
  disconnect() {
    console.log('🔌 Manually disconnecting WebSocket...');
    
    if (this.reconnectInterval) {
      clearTimeout(this.reconnectInterval);
      this.reconnectInterval = null;
    }
    
    this.stopHeartbeat();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnected = false;
    this.subscribers.clear();
  }

  // Get connection status
  getStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      subscribedTickers: Array.from(this.subscribers.keys()),
      wsUrl: WS_URL // Added URL info for debugging
    };
  }
}

// Export singleton instance
export default new WebSocketService();
