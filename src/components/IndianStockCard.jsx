import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRealTimePrice } from '../hooks/useRealTimePrice';
import WatchlistButton from './WatchlistButton';

export default function IndianStockCard({ stock }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get real-time price data for this stock
  const { priceData, isConnected } = useRealTimePrice(stock.ticker);
  
  // Use real-time data if available, otherwise use prop data
  const currentPrice = priceData?.currentPrice || stock.price || stock.currentPrice;
  const dayChange = priceData?.dayChange || stock.change || stock.dayChange || 0;
  const dayChangePercent = priceData?.dayChangePercent || stock.changePercent || stock.dayChangePercent || 0;
  const volume = priceData?.volume || stock.volume;
  const lastUpdated = priceData?.lastUpdated;

  const isPositive = dayChange >= 0;
  const isMutualFund = stock.isMutualFund || stock.exchange === 'AMFI';

  return (
    <div 
      className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isHovered ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Live Status Indicator */}
      <div className="relative">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">
              {stock.exchange || 'NSE'}
            </span>
            {isConnected && !isMutualFund && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
            )}
          </div>
          <WatchlistButton ticker={stock.ticker} size="sm" />
        </div>

        {/* Stock Header */}
        <div className="px-4 pb-2">
          <Link
            to={isMutualFund ? `/mutual-fund/${stock.ticker}` : `/stock/${stock.ticker}`}
            className="block"
          >
            <h3 className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-1">
              {stock.ticker}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {stock.name}
            </p>
          </Link>
        </div>
      </div>

      {/* Price Section */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{currentPrice?.toFixed(2) || 'N/A'}
            </span>
            {lastUpdated && (
              <div className="text-xs text-gray-500 mt-1">
                Updated: {new Date(lastUpdated).toLocaleTimeString()}
              </div>
            )}
          </div>
          
          <div className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <div className="flex items-center text-sm font-medium">
              <svg 
                className={`w-4 h-4 mr-1 transition-transform ${
                  isPositive ? 'rotate-0' : 'rotate-180'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {isPositive ? '+' : ''}₹{dayChange?.toFixed(2) || '0.00'}
            </div>
            <div className="text-sm font-medium">
              ({isPositive ? '+' : ''}{dayChangePercent?.toFixed(2) || '0.00'}%)
            </div>
          </div>
        </div>
      </div>

      {/* Stock Details */}
      <div className="p-4 pt-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-500">Sector:</span>
            <p className="font-medium text-gray-900 line-clamp-1">
              {stock.sector || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-gray-500">
              {isMutualFund ? 'Fund House:' : 'Market Cap:'}
            </span>
            <p className="font-medium text-gray-900 line-clamp-1">
              {isMutualFund ? stock.fundHouse : stock.marketCap || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-gray-500">
              {isMutualFund ? 'Expense Ratio:' : 'Volume:'}
            </span>
            <p className="font-medium text-gray-900">
              {isMutualFund ? stock.volume : (volume || 'N/A')}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Category:</span>
            <p className="font-medium text-gray-900 line-clamp-1">
              {isMutualFund ? stock.sector : (stock.category || 'Penny Stock')}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <Link
          to={isMutualFund ? `/mutual-fund/${stock.ticker}` : `/stock/${stock.ticker}`}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
        >
          View Details
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
