import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import stockService from '../services/stockService';
import StockChart from '../components/IndianStockChart';
import StockMetrics from '../components/IndianStockMetrics';
import CompanyInfo from '../components/IndianCompanyInfo';
import NewsSection from '../components/IndianNewsSection';
import WatchlistButton from '../components/WatchlistButton';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import ErrorMessage from '../components/ErrorMessage';

export default function StockDetails() {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('1M');
  const [priceHistory, setPriceHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ticker]);

  // Fetch stock data from backend
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔄 Fetching stock data for: ${ticker}`);
        
        // Fetch stock details from your backend
        const data = await stockService.getStock(ticker);
        
        console.log('✅ Stock data received:', data);
        setStockData(data);
        
      } catch (error) {
        console.error('❌ Failed to fetch stock data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchStockData();
    }
  }, [ticker]);

  // Fetch price history when timeframe changes
  useEffect(() => {
    const fetchPriceHistory = async () => {
      if (!stockData) return;

      try {
        setHistoryLoading(true);
        console.log(`📈 Fetching price history for ${ticker} - ${timeframe}`);
        
        const historyData = await stockService.getStockHistory(ticker, timeframe);
        setPriceHistory(historyData.history || []);
        
        console.log('✅ Price history received:', historyData.history?.length, 'data points');
      } catch (error) {
        console.error('❌ Failed to fetch price history:', error.message);
        // Don't set error for history, just log it
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchPriceHistory();
  }, [stockData, ticker, timeframe]);

  // Buy/Sell Handler Functions
  const handleBuyStock = (ticker) => {
    // Placeholder for buy functionality - will integrate with trading API later
    alert(`🛒 Buy order for ${ticker} will be processed with trading API integration. Current price: ₹${stockData?.currentPrice?.toFixed(2)}`);
  };

  const handleSellStock = (ticker) => {
    // Placeholder for sell functionality - will integrate with trading API later  
    alert(`💰 Sell order for ${ticker} will be processed with trading API integration. Current price: ₹${stockData?.currentPrice?.toFixed(2)}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <SkeletonLoader type="details" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <nav className="mb-6">
            <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm">
              ← Back to Dashboard
            </Link>
          </nav>
          <ErrorMessage 
            title="Stock Details Not Found"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (!stockData) return null;

  const isPositive = stockData.dayChange >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <FadeInAnimation>
          <nav className="mb-4 sm:mb-6">
            <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm transition-colors">
              ← Back to Indian Market Dashboard
            </Link>
          </nav>
        </FadeInAnimation>

        {/* Stock Header with Real Data and Buy/Sell Buttons */}
        <FadeInAnimation delay={100}>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                    {stockData.ticker}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      {stockData.exchange || 'NSE'}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {stockData.sector || 'Penny Stock'}
                    </span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl text-gray-600 mb-4 truncate">
                  {stockData.name}
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-0">
                    ₹{stockData.currentPrice?.toFixed(2) || 'N/A'}
                  </span>
                  <div className={`flex items-center text-base sm:text-lg font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 transition-transform ${isPositive ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {isPositive ? '+' : ''}₹{stockData.dayChange?.toFixed(2) || '0.00'} ({isPositive ? '+' : ''}{stockData.dayChangePercent?.toFixed(2) || '0.00'}%)
                  </div>
                </div>

                {/* Last Updated Indicator */}
                <div className="mt-2 text-xs text-gray-500">
                  Last updated: {stockData.lastUpdated ? new Date(stockData.lastUpdated).toLocaleString() : 'Unknown'}
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-4 lg:mt-0 flex-shrink-0 space-y-3">
                <WatchlistButton ticker={stockData.ticker} />
                
                {/* Buy and Sell Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleBuyStock(stockData.ticker)}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span className="text-lg">🛒</span>
                    <span>Buy Stock</span>
                  </button>
                  <button 
                    onClick={() => handleSellStock(stockData.ticker)}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span className="text-lg">💰</span>
                    <span>Sell Stock</span>
                  </button>
                </div>
                
                {/* Trading Info */}
                <div className="text-xs text-gray-500 text-center">
                  Click to place order • Trading API integration coming soon
                </div>
              </div>
            </div>
          </div>
        </FadeInAnimation>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Stock Chart with Real Price History */}
            <FadeInAnimation delay={200}>
              <StockChart 
                data={priceHistory}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                ticker={stockData.ticker}
                currency="₹"
                loading={historyLoading}
              />
            </FadeInAnimation>
            
            {/* Company Information */}
            <FadeInAnimation delay={300}>
              <CompanyInfo company={stockData} />
            </FadeInAnimation>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Stock Metrics with Real Data */}
            <FadeInAnimation delay={400}>
              <StockMetrics metrics={stockData} />
            </FadeInAnimation>
            
            {/* News Section */}
            <FadeInAnimation delay={500}>
              <NewsSection ticker={stockData.ticker} />
            </FadeInAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
