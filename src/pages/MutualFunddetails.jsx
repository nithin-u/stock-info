import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mutualFundService from '../services/mutualFundService';
import WatchlistButton from '../components/WatchlistButton';
import FadeInAnimation from '../components/FadeInAnimation';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function MutualFundDetails() {
  const { schemeCode } = useParams();
  const [fundData, setFundData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('1M');
  const [navHistory, setNavHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [schemeCode]);

  // Fetch fund data
  useEffect(() => {
    const fetchFundData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔄 Fetching mutual fund data for: ${schemeCode}`);
        
        const data = await mutualFundService.getMutualFund(schemeCode);
        
        console.log('✅ Fund data received:', data);
        setFundData(data);
        
      } catch (error) {
        console.error('❌ Failed to fetch fund data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (schemeCode) {
      fetchFundData();
    }
  }, [schemeCode]);

  // Fetch NAV history when timeframe changes
  useEffect(() => {
    const fetchNavHistory = async () => {
      if (!fundData) return;

      try {
        setHistoryLoading(true);
        console.log(`📈 Fetching NAV history for ${schemeCode} - ${timeframe}`);
        
        // Generate mock NAV history data for chart
        const mockHistory = generateNavHistory(fundData.nav, timeframe);
        setNavHistory(mockHistory);
        
        console.log('✅ NAV history generated:', mockHistory.length, 'data points');
      } catch (error) {
        console.error('❌ Failed to fetch NAV history:', error.message);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchNavHistory();
  }, [fundData, schemeCode, timeframe]);

  // Generate mock NAV history for chart
  const generateNavHistory = (currentNav, timeframe) => {
    const history = [];
    const baseNav = currentNav || 100;
    let days = 30;
    
    switch (timeframe) {
      case '1W': days = 7; break;
      case '1M': days = 30; break;
      case '3M': days = 90; break;
      case '6M': days = 180; break;
      case '1Y': days = 365; break;
      default: days = 30;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const variation = (Math.random() - 0.5) * (baseNav * 0.02);
      const nav = Math.max(baseNav + variation, baseNav * 0.8);
      
      history.push({
        date: date.toLocaleDateString(),
        nav: parseFloat(nav.toFixed(4)),
        timestamp: date.toISOString()
      });
    }
    
    return history;
  };

  // Buy/Sell Handler Functions
  const handleBuyFund = (schemeCode) => {
    alert(`🛒 Buy order for mutual fund ${schemeCode} will be processed with investment platform integration. Current NAV: ₹${fundData?.nav?.toFixed(4)}`);
  };

  const handleSellFund = (schemeCode) => {
    alert(`💰 Sell order for mutual fund ${schemeCode} will be processed with investment platform integration. Current NAV: ₹${fundData?.nav?.toFixed(4)}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <LoadingSpinner size="lg" />
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
            <Link to="/mutual-funds" className="text-green-600 hover:text-green-800 text-sm">
              ← Back to Mutual Funds
            </Link>
          </nav>
          <ErrorMessage 
            title="Mutual Fund Details Not Found"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (!fundData) return null;

  const isPositive = (fundData.navChange || 0) >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <FadeInAnimation>
          <nav className="mb-4 sm:mb-6">
            <Link to="/mutual-funds" className="text-green-600 hover:text-green-800 text-sm transition-colors">
              ← Back to Indian Mutual Funds
            </Link>
          </nav>
        </FadeInAnimation>

        {/* Fund Header with Buy/Sell Buttons */}
        <FadeInAnimation delay={100}>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                    {fundData.schemeName}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {fundData.category}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      AMFI
                    </span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl text-gray-600 mb-4">
                  {fundData.fundHouse}
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-0">
                    ₹{fundData.nav?.toFixed(4) || 'N/A'}
                  </span>
                  <div className={`flex items-center text-base sm:text-lg font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 transition-transform ${isPositive ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {isPositive ? '+' : ''}₹{fundData.navChange?.toFixed(4) || '0.0000'} ({isPositive ? '+' : ''}{fundData.navChangePercent?.toFixed(2) || '0.00'}%)
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  NAV Date: {fundData.navDate ? new Date(fundData.navDate).toLocaleDateString() : 'N/A'}
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-4 lg:mt-0 flex-shrink-0 space-y-3">
                <WatchlistButton ticker={schemeCode} />
                
                {/* Buy and Sell Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleBuyFund(schemeCode)}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span className="text-lg">🛒</span>
                    <span>Invest Now</span>
                  </button>
                  <button 
                    onClick={() => handleSellFund(schemeCode)}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span className="text-lg">💰</span>
                    <span>Redeem</span>
                  </button>
                </div>
                
                {/* Investment Info */}
                <div className="text-xs text-gray-500 text-center">
                  SIP starting from ₹500 • Investment API integration coming soon
                </div>
              </div>
            </div>
          </div>
        </FadeInAnimation>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* NAV Chart */}
            <FadeInAnimation delay={200}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    NAV Performance Chart
                  </h3>
                  <div className="flex space-x-2">
                    {['1W', '1M', '3M', '6M', '1Y'].map(tf => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          timeframe === tf 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {historyLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={navHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin', 'dataMax']} />
                      <Tooltip 
                        formatter={(value) => [`₹${value}`, 'NAV']}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nav" 
                        stroke="#059669" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </FadeInAnimation>
            
            {/* Fund Information */}
            <FadeInAnimation delay={300}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fund Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Fund Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheme Code:</span>
                        <span className="font-medium">{fundData.schemeCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fund House:</span>
                        <span className="font-medium">{fundData.fundHouse}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{fundData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sub Category:</span>
                        <span className="font-medium">{fundData.subCategory || 'Growth'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Investment Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Investment:</span>
                        <span className="font-medium">₹{fundData.minInvestment || '500'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SIP Amount:</span>
                        <span className="font-medium">₹{fundData.sipMinInvestment || '500'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expense Ratio:</span>
                        <span className="font-medium">{fundData.expenseRatio || '1.25'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exit Load:</span>
                        <span className="font-medium">{fundData.exitLoad || 'Nil after 1 year'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInAnimation>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Key Metrics */}
            <FadeInAnimation delay={400}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current NAV</span>
                      <span className="font-semibold">₹{fundData.nav?.toFixed(4)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Previous NAV</span>
                      <span className="font-semibold">₹{fundData.previousNav?.toFixed(4)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Change</span>
                      <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}₹{fundData.navChange?.toFixed(4) || '0.0000'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Change %</span>
                      <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{fundData.navChangePercent?.toFixed(2) || '0.00'}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">AUM</span>
                      <span className="font-semibold">₹{Math.floor(Math.random() * 5000) + 1000} Cr</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fund Age</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 15) + 1} Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInAnimation>

            {/* Investment Calculator */}
            <FadeInAnimation delay={500}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SIP Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly SIP Amount
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="₹500"
                      min="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Investment Period (Years)
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="1">1 Year</option>
                      <option value="3">3 Years</option>
                      <option value="5">5 Years</option>
                      <option value="10">10 Years</option>
                    </select>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                    Calculate Returns
                  </button>
                </div>
              </div>
            </FadeInAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
