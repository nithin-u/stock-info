import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeInAnimation from '../components/FadeInAnimation';
import IndianMarketOverview from '../components/IndianMarketOverview';
import stockService from '../services/stockService';
import mutualFundService from '../services/mutualFundService';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [topMutualFunds, setTopMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch homepage data
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Fetch top gainers, losers, and mutual funds in parallel
        const [gainersData, losersData, fundsData] = await Promise.all([
          stockService.getTopGainers(5),
          stockService.getTopLosers(5),
          mutualFundService.getTopPerformers('1Month', 5)
        ]);

        setTopGainers(gainersData);
        setTopLosers(losersData);
        setTopMutualFunds(fundsData);
        
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/penny-stocks?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <FadeInAnimation>
            <div className="text-center">
              {/* Website Brand */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">SI</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  Stock Info
                </h1>
              </div>
              
              {/* Website Description */}
              <p className="text-xl sm:text-2xl text-orange-100 max-w-4xl mx-auto mb-4 leading-relaxed">
                Your comprehensive platform for Indian stock market insights
              </p>
              <p className="text-lg text-orange-200 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover penny stocks, track mutual funds, monitor market indices, and build your investment portfolio with real-time data from NSE and BSE markets.
              </p>
              
              {/* Explore More Button */}
              <FadeInAnimation delay={300}>
                <button 
                  onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Explore More</span>
                  <svg className="ml-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </FadeInAnimation>
            </div>
          </FadeInAnimation>
        </div>
      </div>

      {/* Search Section */}
      <div id="search-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInAnimation>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Search Anything
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Find stocks, mutual funds, or market information instantly
              </p>
              
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for stocks, mutual funds, or companies..."
                      className="block w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="submit"
                        className="mr-2 px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
                
                {/* Quick Search Suggestions */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <span className="text-sm text-gray-500">Popular searches:</span>
                  {['IDEA', 'YESBANK', 'SBI Mutual Fund', 'NIFTY 50', 'Banking Stocks'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeInAnimation>
        </div>
      </div>

      {/* Live Market Overview */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndianMarketOverview />
        </div>
      </div>

      {/* Investment Options Section */}
      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <FadeInAnimation>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Explore Indian Stock Market
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your investment journey with our comprehensive market analysis tools
              </p>
            </div>
          </FadeInAnimation>

          {/* Investment Options Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-20">
            
            {/* Penny Stocks Card */}
            <FadeInAnimation delay={200}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Indian Penny Stocks</h3>
                      <div className="flex items-center text-blue-100">
                        <span className="text-3xl mr-3">🪙</span>
                        <span className="text-lg">Top 100+ NSE Stocks</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Discover high-potential penny stocks from NSE with market caps under ₹500 crores. 
                    Perfect for investors seeking growth opportunities in emerging companies with 
                    detailed analysis of financials, charts, and market trends.
                  </p>
                  
                  {/* Top Gainers/Losers Preview */}
                  {!loading && (topGainers.length > 0 || topLosers.length > 0) && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-sm font-semibold text-green-600 mb-2">Top Gainers</h4>
                        {topGainers.slice(0, 3).map(stock => (
                          <div key={stock.ticker} className="text-xs text-gray-600 mb-1">
                            {stock.ticker}: +{stock.dayChangePercent?.toFixed(2)}%
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-red-600 mb-2">Top Losers</h4>
                        {topLosers.slice(0, 3).map(stock => (
                          <div key={stock.ticker} className="text-xs text-gray-600 mb-1">
                            {stock.ticker}: {stock.dayChangePercent?.toFixed(2)}%
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Real-time price tracking and charts
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Company fundamentals and financial metrics
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Latest news and market sentiment analysis
                    </div>
                  </div>
                  
                  <Link 
                    to="/penny-stocks" 
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    Explore Penny Stocks
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeInAnimation>

            {/* Mutual Funds Card */}
            <FadeInAnimation delay={400}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Indian Mutual Funds</h3>
                      <div className="flex items-center text-green-100">
                        <span className="text-3xl mr-3">📊</span>
                        <span className="text-lg">2,500+ AMFI Registered Funds</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Explore comprehensive mutual fund analysis including equity, debt, and hybrid schemes. 
                    Track NAV performance, expense ratios, and fund manager strategies across all major 
                    Asset Management Companies in India.
                  </p>
                  
                  {/* Top Mutual Funds Preview */}
                  {!loading && topMutualFunds.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-green-600 mb-2">Top Performers (1M)</h4>
                      {topMutualFunds.slice(0, 3).map(fund => (
                        <div key={fund.schemeCode} className="text-xs text-gray-600 mb-1">
                          {fund.schemeName?.split(' ').slice(0, 4).join(' ')}...
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Daily NAV updates and performance tracking
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Detailed fund analysis and comparisons
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      SIP planning and investment recommendations
                    </div>
                  </div>
                  
                  <Link 
                    to="/mutual-funds" 
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200"
                  >
                    Explore Mutual Funds
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeInAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
