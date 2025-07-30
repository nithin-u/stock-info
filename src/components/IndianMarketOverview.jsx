import { useState, useEffect } from 'react';
import { useRealTimePrices } from '../hooks/useRealTimePrice';
import marketService from '../services/marketService';
import FadeInAnimation from './FadeInAnimation';
import LoadingSpinner from './LoadingSpinner';

export default function IndianMarketOverview() {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketStatus, setMarketStatus] = useState(null);

  // Get real-time updates for major indices
  const indexTickers = ['NIFTY50', 'SENSEX', 'BANKNIFTY', 'NIFTYIT'];
  const { pricesData, isConnected } = useRealTimePrices(indexTickers);

  // Fetch initial market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        
        // Fetch market indices and status
        const [indicesData, statusData] = await Promise.all([
          marketService.getMarketIndices(),
          marketService.getMarketStatus()
        ]);

        setIndices(indicesData);
        setMarketStatus(statusData);
        
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // Update indices with real-time data
  const getUpdatedIndices = () => {
    if (!indices.length) return [];
    
    return indices.map(index => {
      const realtimeData = pricesData[index.symbol] || pricesData[index.name];
      
      if (realtimeData) {
        return {
          ...index,
          value: realtimeData.currentPrice,
          change: realtimeData.dayChange,
          changePercent: realtimeData.dayChangePercent,
          lastUpdated: realtimeData.lastUpdated
        };
      }
      
      return index;
    });
  };

  const updatedIndices = getUpdatedIndices();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-40">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Market Data</h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with Market Status */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Indian Market Overview</h2>
          <div className="flex items-center space-x-3">
            {isConnected && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-green-100 text-sm font-medium">LIVE</span>
              </div>
            )}
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              marketStatus?.isOpen 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {marketStatus?.isOpen ? 'Market Open' : 'Market Closed'}
            </div>
          </div>
        </div>
        
        {marketStatus && (
          <div className="mt-2 text-orange-100 text-sm">
            Market Hours: {marketStatus.marketOpenTime} - {marketStatus.marketCloseTime} IST
          </div>
        )}
      </div>

      {/* Indices Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {updatedIndices.map((index, i) => {
            const isPositive = (index.change || 0) >= 0;
            
            return (
              <FadeInAnimation key={index.name} delay={i * 100}>
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {index.name}
                    </h3>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                      isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isPositive ? '↗' : '↘'}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-gray-900">
                      {index.value?.toLocaleString('en-IN', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      }) || 'N/A'}
                    </div>
                    
                    <div className={`flex items-center text-xs font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className="mr-1">
                        {isPositive ? '+' : ''}{index.change?.toFixed(2) || '0.00'}
                      </span>
                      <span>
                        ({isPositive ? '+' : ''}{index.changePercent?.toFixed(2) || '0.00'}%)
                      </span>
                    </div>
                    
                    {index.lastUpdated && (
                      <div className="text-xs text-gray-500">
                        Updated: {new Date(index.lastUpdated).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              </FadeInAnimation>
            );
          })}
        </div>
      </div>

      {/* Market Summary */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Last updated: {new Date().toLocaleTimeString()} IST
          </span>
          <span className="text-gray-600">
            Data sourced from NSE & BSE
          </span>
        </div>
      </div>
    </div>
  );
}
