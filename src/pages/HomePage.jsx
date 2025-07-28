import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import IndianMarketFilters from '../components/IndianMarketFilters';
import IndianStockCard from '../components/IndianStockCard';
import IndianMarketOverview from '../components/IndianMarketOverview';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import ErrorMessage from '../components/ErrorMessage';
import { useDebounce } from '../hooks/useDebounce';

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Penny Stocks');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Mock Indian market data - NSE Penny Stocks
  const mockIndianStocks = [
    {
      ticker: 'IDEA',
      name: 'Vodafone Idea Limited',
      price: 7.20,
      change: -0.15,
      changePercent: -2.04,
      category: 'Penny Stocks',
      sector: 'Telecommunications',
      marketCap: '₹51,837 Cr',
      volume: '78.01 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'IOB',
      name: 'Indian Overseas Bank',
      price: 38.45,
      change: -1.26,
      changePercent: -3.18,
      category: 'Penny Stocks',
      sector: 'Banking',
      marketCap: '₹21,456 Cr',
      volume: '2.34 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'YESBANK',
      name: 'Yes Bank Limited',
      price: 19.60,
      change: 0.45,
      changePercent: 2.35,
      category: 'Penny Stocks',
      sector: 'Banking',
      marketCap: '₹61,523 Cr',
      volume: '5.67 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'SUZLON',
      name: 'Suzlon Energy Limited',
      price: 68.75,
      change: 2.15,
      changePercent: 3.23,
      category: 'Penny Stocks',
      sector: 'Renewable Energy',
      marketCap: '₹9,234 Cr',
      volume: '1.23 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'RPOWER',
      name: 'Reliance Power Limited',
      price: 15.30,
      change: -0.85,
      changePercent: -5.27,
      category: 'Penny Stocks',
      sector: 'Power',
      marketCap: '₹3,456 Cr',
      volume: '8.90 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'JPASSOCIAT',
      name: 'Jaiprakash Associates Ltd',
      price: 4.85,
      change: 0.25,
      changePercent: 5.43,
      category: 'Penny Stocks',
      sector: 'Construction',
      marketCap: '₹2,890 Cr',
      volume: '12.45 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'ZEEL',
      name: 'Zee Entertainment Enterprises',
      price: 142.30,
      change: -2.45,
      changePercent: -1.69,
      category: 'Penny Stocks',
      sector: 'Media & Entertainment',
      marketCap: '₹13,678 Cr',
      volume: '4.23 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'SAIL',
      name: 'Steel Authority of India',
      price: 87.65,
      change: 1.75,
      changePercent: 2.04,
      category: 'Penny Stocks',
      sector: 'Steel',
      marketCap: '₹36,789 Cr',
      volume: '7.89 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'COALINDIA',
      name: 'Coal India Limited',
      price: 245.80,
      change: 3.20,
      changePercent: 1.32,
      category: 'Penny Stocks',
      sector: 'Mining',
      marketCap: '₹1,52,345 Cr',
      volume: '3.45 Cr',
      exchange: 'NSE'
    },
    {
      ticker: 'ONGC',
      name: 'Oil and Natural Gas Corporation',
      price: 198.45,
      change: -1.85,
      changePercent: -0.92,
      category: 'Penny Stocks',
      sector: 'Oil & Gas',
      marketCap: '₹2,49,678 Cr',
      volume: '5.67 Cr',
      exchange: 'NSE'
    }
  ];

  // Mock Indian Mutual Funds data
  const mockMutualFunds = [
    {
      ticker: 'SBI-BLUECHIP',
      name: 'SBI Bluechip Fund',
      nav: 67.89,
      price: 67.89, // For consistent interface
      change: 1.23,
      changePercent: 1.85,
      category: 'Mutual Funds',
      fundType: 'Large Cap',
      sector: 'Large Cap', // For consistent interface
      marketCap: '₹45,678 Cr', // Using AUM
      aum: '₹45,678 Cr',
      volume: '1.75%', // Using expense ratio
      expense: '1.75%',
      exchange: 'AMFI'
    },
    {
      ticker: 'HDFC-TOP100',
      name: 'HDFC Top 100 Fund',
      nav: 789.45,
      price: 789.45,
      change: -2.34,
      changePercent: -0.30,
      category: 'Mutual Funds',
      fundType: 'Large Cap',
      sector: 'Large Cap',
      marketCap: '₹67,890 Cr',
      aum: '₹67,890 Cr',
      volume: '1.95%',
      expense: '1.95%',
      exchange: 'AMFI'
    },
    {
      ticker: 'ICICI-MIDCAP',
      name: 'ICICI Prudential Mid Cap Fund',
      nav: 234.56,
      price: 234.56,
      change: 4.67,
      changePercent: 2.03,
      category: 'Mutual Funds',
      fundType: 'Mid Cap',
      sector: 'Mid Cap',
      marketCap: '₹23,456 Cr',
      aum: '₹23,456 Cr',
      volume: '2.25%',
      expense: '2.25%',
      exchange: 'AMFI'
    },
    {
      ticker: 'AXIS-SMALLCAP',
      name: 'Axis Small Cap Fund',
      nav: 56.78,
      price: 56.78,
      change: 0.89,
      changePercent: 1.59,
      category: 'Mutual Funds',
      fundType: 'Small Cap',
      sector: 'Small Cap',
      marketCap: '₹12,345 Cr',
      aum: '₹12,345 Cr',
      volume: '2.15%',
      expense: '2.15%',
      exchange: 'AMFI'
    },
    {
      ticker: 'UTI-EQUITY',
      name: 'UTI Equity Fund',
      nav: 345.67,
      price: 345.67,
      change: -1.23,
      changePercent: -0.35,
      category: 'Mutual Funds',
      fundType: 'Large Cap',
      sector: 'Large Cap',
      marketCap: '₹34,567 Cr',
      aum: '₹34,567 Cr',
      volume: '1.85%',
      expense: '1.85%',
      exchange: 'AMFI'
    }
  ];

  // Simulate API call for Indian market data
  useEffect(() => {
    const fetchIndianMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate occasional error (uncomment to test error handling)
        // if (Math.random() < 0.1) {
        //   throw new Error('Failed to fetch Indian market data');
        // }
        
        setStocks(mockIndianStocks);
        setMutualFunds(mockMutualFunds);
        
        // Set initial display based on selected category
        if (selectedCategory === 'Penny Stocks') {
          setFilteredStocks(mockIndianStocks);
        } else if (selectedCategory === 'Mutual Funds') {
          setFilteredStocks(mockMutualFunds);
        } else {
          // Filter by category for other types
          const filteredByCategory = mockIndianStocks.filter(stock => 
            stock.sector.toLowerCase().includes(selectedCategory.toLowerCase().replace(' cap', ''))
          );
          setFilteredStocks(filteredByCategory);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIndianMarketData();
  }, []);

  // Filter logic for Indian market with debounced search
  useEffect(() => {
    let allData;
    
    if (selectedCategory === 'Penny Stocks') {
      allData = stocks;
    } else if (selectedCategory === 'Mutual Funds') {
      allData = mutualFunds;
    } else {
      // Filter by cap type (Small Cap, Mid Cap, Large Cap)
      allData = selectedCategory === 'Small Cap' || selectedCategory === 'Mid Cap' || selectedCategory === 'Large Cap'
        ? [...stocks, ...mutualFunds].filter(item => 
            item.sector?.toLowerCase().includes(selectedCategory.toLowerCase().replace(' cap', '')) ||
            item.fundType?.toLowerCase().includes(selectedCategory.toLowerCase().replace(' cap', ''))
          )
        : stocks;
    }
    
    let filtered = allData;

    if (debouncedSearchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.ticker.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.sector?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    setFilteredStocks(filtered);
  }, [stocks, mutualFunds, selectedCategory, debouncedSearchTerm]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage 
            title="Failed to load Indian market data"
            message={error}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Indian Market Theme */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <FadeInAnimation>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                🇮🇳 Indian Stock Market Dashboard
              </h1>
              <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-8">
                Track top NSE penny stocks and mutual funds with real-time data, 
                comprehensive analysis, and Indian market insights.
              </p>
            </div>
          </FadeInAnimation>
          
          {/* Indian Market Overview */}
          <FadeInAnimation delay={200}>
            <IndianMarketOverview />
          </FadeInAnimation>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Category Filters */}
        <FadeInAnimation delay={300}>
          <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search NSE stocks, mutual funds, or sectors..."
            />
            <IndianMarketFilters 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </FadeInAnimation>

        {/* Results Header */}
        <FadeInAnimation delay={400}>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">
                {selectedCategory === 'Penny Stocks' ? '🪙' : 
                 selectedCategory === 'Mutual Funds' ? '📊' : '📈'}
              </span>
              {selectedCategory} - NSE/AMFI
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Loading Indian market data...
                </span>
              ) : (
                <>
                  Showing <span className="font-semibold text-orange-600">{filteredStocks.length}</span> {selectedCategory.toLowerCase()}
                  {debouncedSearchTerm && (
                    <span> matching <span className="font-semibold text-blue-600">"{debouncedSearchTerm}"</span></span>
                  )}
                </>
              )}
            </p>
          </div>
        </FadeInAnimation>

        {/* Indian Market Stats */}
        <FadeInAnimation delay={450}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🪙</div>
              <div className="text-2xl font-bold text-gray-900">{stocks.length}+</div>
              <div className="text-sm text-gray-600">Penny Stocks</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-2xl font-bold text-gray-900">{mutualFunds.length}+</div>
              <div className="text-sm text-gray-600">Mutual Funds</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-gray-900">Live</div>
              <div className="text-sm text-gray-600">Market Data</div>
            </div>
          </div>
        </FadeInAnimation>


        {/* Stock/MF Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <FadeInAnimation delay={500}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredStocks.map((item, index) => (
                <FadeInAnimation key={item.ticker} delay={index * 50}>
                  <IndianStockCard stock={item} />
                </FadeInAnimation>
              ))}
            </div>
          </FadeInAnimation>
        )}

        {/* No Results Message */}
        {filteredStocks.length === 0 && !loading && !error && (
          <FadeInAnimation>
            <div className="text-center py-12 sm:py-20">
              <div className="text-gray-400 text-5xl sm:text-6xl mb-4">
                {selectedCategory === 'Mutual Funds' ? '📊' : '📈'}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {selectedCategory.toLowerCase()} found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or explore different categories.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Penny Stocks');
                  }}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setSelectedCategory('Mutual Funds')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Browse Mutual Funds
                </button>
              </div>
            </div>
          </FadeInAnimation>
        )}

        {/* Market Disclaimer */}
        <FadeInAnimation delay={600}>
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Disclaimer</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This platform is for educational and informational purposes only. All stock prices, mutual fund NAVs, 
                  and market data shown are for demonstration purposes. Please consult with a qualified financial advisor 
                  before making any investment decisions. Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </div>
        </FadeInAnimation>
      </div>
    </div>
  );
}
