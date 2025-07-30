import { useState, useEffect, useRef } from 'react';
import websocketService from '../services/websocketService';

export function useRealTimePrice(ticker) {
  const [priceData, setPriceData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const callbackRef = useRef(null);

  useEffect(() => {
    if (!ticker) return;

    // Create callback function for price updates
    const handlePriceUpdate = (data) => {
      if (data.type === 'connection') {
        setIsConnected(data.data.status === 'connected');
      } else if (data.ticker === ticker) {
        setPriceData({
          currentPrice: data.currentPrice,
          dayChange: data.dayChange,
          dayChangePercent: data.dayChangePercent,
          volume: data.volume,
          lastUpdated: data.timestamp
        });
      }
    };

    callbackRef.current = handlePriceUpdate;

    // Connect to WebSocket if not already connected
    if (!websocketService.isConnected) {
      websocketService.connect();
    }

    // Subscribe to price updates for this ticker
    websocketService.subscribeToTickers([ticker], handlePriceUpdate);

    // Cleanup function
    return () => {
      if (callbackRef.current) {
        websocketService.unsubscribeFromTickers([ticker], callbackRef.current);
      }
    };
  }, [ticker]);

  return {
    priceData,
    isConnected,
    lastUpdated: priceData?.lastUpdated
  };
}

// Hook for multiple tickers
export function useRealTimePrices(tickers) {
  const [pricesData, setPricesData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const callbackRef = useRef(null);

  useEffect(() => {
    if (!tickers || tickers.length === 0) return;

    // Create callback function for price updates
    const handlePriceUpdate = (data) => {
      if (data.type === 'connection') {
        setIsConnected(data.data.status === 'connected');
      } else if (tickers.includes(data.ticker)) {
        setPricesData(prev => ({
          ...prev,
          [data.ticker]: {
            currentPrice: data.currentPrice,
            dayChange: data.dayChange,
            dayChangePercent: data.dayChangePercent,
            volume: data.volume,
            lastUpdated: data.timestamp
          }
        }));
      }
    };

    callbackRef.current = handlePriceUpdate;

    // Connect to WebSocket if not already connected
    if (!websocketService.isConnected) {
      websocketService.connect();
    }

    // Subscribe to price updates for these tickers
    websocketService.subscribeToTickers(tickers, handlePriceUpdate);

    // Cleanup function
    return () => {
      if (callbackRef.current) {
        websocketService.unsubscribeFromTickers(tickers, callbackRef.current);
      }
    };
  }, [tickers.join(',')]); // Only re-run if tickers array changes

  return {
    pricesData,
    isConnected,
    subscribedTickers: tickers
  };
}
