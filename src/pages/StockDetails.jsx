import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import IndianStockChart from '../components/IndianStockChart';
import IndianStockMetrics from '../components/IndianStockMetrics';
import IndianCompanyInfo from '../components/IndianCompanyInfo';
import IndianNewsSection from '../components/IndianNewsSection';
import WatchlistButton from '../components/WatchlistButton';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import ErrorMessage from '../components/ErrorMessage';

export default function StockDetails() {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('1D');

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ticker]);

  // Complete mock Indian stock data for all 10 stocks
  const mockIndianStockData = {
    'IDEA': {
      ticker: 'IDEA',
      name: 'Vodafone Idea Limited',
      price: 7.20,
      change: -0.15,
      changePercent: -2.04,
      sector: 'Telecommunications',
      industry: 'Wireless Telecommunications',
      marketCap: '₹51,837 Cr',
      volume: '78.01 Cr',
      avgVolume: '85.2 Cr',
      pe: -12.5,
      eps: -0.58,
      dividend: '0.00',
      yield: '0.00%',
      high52: 12.35,
      low52: 5.80,
      description: 'Vodafone Idea Limited provides telecommunications services in India. The company offers voice and data services on 2G, 3G, and 4G platforms; and broadband services.',
      employees: '9,500',
      founded: '2018',
      headquarters: 'Mumbai, Maharashtra',
      website: 'www.vi.com',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 8.50 },
        { date: '2024-02-01', price: 9.20 },
        { date: '2024-03-01', price: 8.90 },
        { date: '2024-04-01', price: 7.80 },
        { date: '2024-05-01', price: 7.40 },
        { date: '2024-06-01', price: 7.20 }
      ]
    },
    'YESBANK': {
      ticker: 'YESBANK',
      name: 'Yes Bank Limited',
      price: 19.60,
      change: 0.45,
      changePercent: 2.35,
      sector: 'Banking',
      industry: 'Private Sector Bank',
      marketCap: '₹61,523 Cr',
      volume: '5.67 Cr',
      avgVolume: '8.2 Cr',
      pe: 18.7,
      eps: 1.05,
      dividend: '0.00',
      yield: '0.00%',
      high52: 25.40,
      low52: 15.80,
      description: 'Yes Bank Limited provides banking and financial services in India. The company operates through Treasury, Corporate/Wholesale Banking, Retail Banking, and Other Banking segments.',
      employees: '22,000',
      founded: '2004',
      headquarters: 'Mumbai, Maharashtra',
      website: 'www.yesbank.in',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 16.50 },
        { date: '2024-02-01', price: 18.20 },
        { date: '2024-03-01', price: 17.90 },
        { date: '2024-04-01', price: 19.80 },
        { date: '2024-05-01', price: 20.40 },
        { date: '2024-06-01', price: 19.60 }
      ]
    },
    'SUZLON': {
      ticker: 'SUZLON',
      name: 'Suzlon Energy Limited',
      price: 68.75,
      change: 2.15,
      changePercent: 3.23,
      sector: 'Renewable Energy',
      industry: 'Wind Energy Equipment',
      marketCap: '₹9,234 Cr',
      volume: '1.23 Cr',
      avgVolume: '2.1 Cr',
      pe: 45.2,
      eps: 1.52,
      dividend: '0.00',
      yield: '0.00%',
      high52: 85.40,
      low52: 25.80,
      description: 'Suzlon Energy Limited provides renewable energy solutions. The company designs, manufactures, and installs wind turbine generators for generating electricity from wind.',
      employees: '4,500',
      founded: '1995',
      headquarters: 'Pune, Maharashtra',
      website: 'www.suzlon.com',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 45.50 },
        { date: '2024-02-01', price: 52.20 },
        { date: '2024-03-01', price: 61.90 },
        { date: '2024-04-01', price: 58.80 },
        { date: '2024-05-01', price: 65.40 },
        { date: '2024-06-01', price: 68.75 }
      ]
    },
    'RPOWER': {
      ticker: 'RPOWER',
      name: 'Reliance Power Limited',
      price: 15.30,
      change: -0.85,
      changePercent: -5.27,
      sector: 'Power',
      industry: 'Thermal Power Generation',
      marketCap: '₹3,456 Cr',
      volume: '8.90 Cr',
      avgVolume: '12.5 Cr',
      pe: -8.5,
      eps: -1.80,
      dividend: '0.00',
      yield: '0.00%',
      high52: 28.40,
      low52: 12.80,
      description: 'Reliance Power Limited is engaged in generation and supply of electricity. The company develops, constructs, owns, operates and maintains power projects in India.',
      employees: '2,800',
      founded: '2007',
      headquarters: 'Mumbai, Maharashtra',
      website: 'www.reliancepower.co.in',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 18.50 },
        { date: '2024-02-01', price: 16.20 },
        { date: '2024-03-01', price: 14.90 },
        { date: '2024-04-01', price: 17.80 },
        { date: '2024-05-01', price: 16.40 },
        { date: '2024-06-01', price: 15.30 }
      ]
    },
    'JPASSOCIAT': {
      ticker: 'JPASSOCIAT',
      name: 'Jaiprakash Associates Ltd',
      price: 4.85,
      change: 0.25,
      changePercent: 5.43,
      sector: 'Construction',
      industry: 'Infrastructure Development',
      marketCap: '₹2,890 Cr',
      volume: '12.45 Cr',
      avgVolume: '15.2 Cr',
      pe: -2.5,
      eps: -1.94,
      dividend: '0.00',
      yield: '0.00%',
      high52: 8.40,
      low52: 3.80,
      description: 'Jaiprakash Associates Limited is engaged in engineering and construction, real estate development, hospitality, and sports businesses in India.',
      employees: '15,000',
      founded: '1958',
      headquarters: 'Noida, Uttar Pradesh',
      website: 'www.jpinfratech.in',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 3.85 },
        { date: '2024-02-01', price: 4.20 },
        { date: '2024-03-01', price: 4.50 },
        { date: '2024-04-01', price: 4.80 },
        { date: '2024-05-01', price: 4.60 },
        { date: '2024-06-01', price: 4.85 }
      ]
    },
    // ========= MISSING 5 STOCKS ADDED BELOW =========
    'ZEEL': {
      ticker: 'ZEEL',
      name: 'Zee Entertainment Enterprises',
      price: 142.30,
      change: -2.45,
      changePercent: -1.69,
      sector: 'Media & Entertainment',
      industry: 'Television Broadcasting',
      marketCap: '₹13,678 Cr',
      volume: '4.23 Cr',
      avgVolume: '6.8 Cr',
      pe: 25.8,
      eps: 5.51,
      dividend: '0.00',
      yield: '0.00%',
      high52: 165.80,
      low52: 118.25,
      description: 'Zee Entertainment Enterprises Limited is an Indian media and entertainment company. It operates television channels, movies, music, live entertainment, and digital content.',
      employees: '6,800',
      founded: '1992',
      headquarters: 'Mumbai, Maharashtra',
      website: 'www.zeeentertainment.com',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 155.80 },
        { date: '2024-02-01', price: 148.60 },
        { date: '2024-03-01', price: 152.90 },
        { date: '2024-04-01', price: 138.75 },
        { date: '2024-05-01', price: 145.20 },
        { date: '2024-06-01', price: 142.30 }
      ]
    },
    'SAIL': {
      ticker: 'SAIL',
      name: 'Steel Authority of India',
      price: 87.65,
      change: 1.75,
      changePercent: 2.04,
      sector: 'Steel',
      industry: 'Steel Production',
      marketCap: '₹36,789 Cr',
      volume: '7.89 Cr',
      avgVolume: '12.4 Cr',
      pe: 15.6,
      eps: 5.62,
      dividend: '2.50',
      yield: '2.85%',
      high52: 105.40,
      low52: 68.25,
      description: 'Steel Authority of India Limited is an Indian public sector steel-making company based in New Delhi. It is a public sector undertaking under the Ministry of Steel.',
      employees: '65,000',
      founded: '1954',
      headquarters: 'New Delhi, Delhi',
      website: 'www.sail.co.in',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 78.50 },
        { date: '2024-02-01', price: 82.30 },
        { date: '2024-03-01', price: 89.45 },
        { date: '2024-04-01', price: 85.90 },
        { date: '2024-05-01', price: 88.75 },
        { date: '2024-06-01', price: 87.65 }
      ]
    },
    'COALINDIA': {
      ticker: 'COALINDIA',
      name: 'Coal India Limited',
      price: 245.80,
      change: 3.20,
      changePercent: 1.32,
      sector: 'Mining',
      industry: 'Coal Mining',
      marketCap: '₹1,52,345 Cr',
      volume: '3.45 Cr',
      avgVolume: '5.2 Cr',
      pe: 12.8,
      eps: 19.20,
      dividend: '15.75',
      yield: '6.41%',
      high52: 285.40,
      low52: 198.60,
      description: 'Coal India Limited is an Indian state-controlled coal mining and refining corporation. It is the largest coal-producing company in the world and a Maharatna company.',
      employees: '2,62,000',
      founded: '1975',
      headquarters: 'Kolkata, West Bengal',
      website: 'www.coalindia.in',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 225.50 },
        { date: '2024-02-01', price: 235.80 },
        { date: '2024-03-01', price: 258.90 },
        { date: '2024-04-01', price: 242.75 },
        { date: '2024-05-01', price: 248.60 },
        { date: '2024-06-01', price: 245.80 }
      ]
    },
    'ONGC': {
      ticker: 'ONGC',
      name: 'Oil and Natural Gas Corporation',
      price: 198.45,
      change: -1.85,
      changePercent: -0.92,
      sector: 'Oil & Gas',
      industry: 'Oil & Gas Exploration',
      marketCap: '₹2,49,678 Cr',
      volume: '5.67 Cr',
      avgVolume: '8.9 Cr',
      pe: 8.4,
      eps: 23.62,
      dividend: '8.50',
      yield: '4.28%',
      high52: 228.90,
      low52: 165.25,
      description: 'Oil and Natural Gas Corporation Limited is an Indian multinational oil and gas company. It is a public sector undertaking under the ownership of Ministry of Petroleum and Natural Gas.',
      employees: '32,000',
      founded: '1956',
      headquarters: 'New Delhi, Delhi',
      website: 'www.ongcindia.com',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 215.80 },
        { date: '2024-02-01', price: 208.45 },
        { date: '2024-03-01', price: 195.60 },
        { date: '2024-04-01', price: 202.30 },
        { date: '2024-05-01', price: 205.75 },
        { date: '2024-06-01', price: 198.45 }
      ]
    },
    'IOB': {
      ticker: 'IOB',
      name: 'Indian Overseas Bank',
      price: 38.45,
      change: -1.26,
      changePercent: -3.18,
      sector: 'Banking',
      industry: 'Public Sector Bank',
      marketCap: '₹21,456 Cr',
      volume: '2.34 Cr',
      avgVolume: '4.1 Cr',
      pe: 14.2,
      eps: 2.71,
      dividend: '0.00',
      yield: '0.00%',
      high52: 48.75,
      low52: 28.90,
      description: 'Indian Overseas Bank is an Indian public sector bank. It serves over 25 million customers through more than 3,270 domestic branches and six overseas branches.',
      employees: '28,500',
      founded: '1937',
      headquarters: 'Chennai, Tamil Nadu',
      website: 'www.iob.in',
      exchange: 'NSE',
      currency: '₹',
      chartData: [
        { date: '2024-01-01', price: 42.80 },
        { date: '2024-02-01', price: 40.25 },
        { date: '2024-03-01', price: 37.90 },
        { date: '2024-04-01', price: 41.50 },
        { date: '2024-05-01', price: 39.85 },
        { date: '2024-06-01', price: 38.45 }
      ]
    }
  };

  useEffect(() => {
    const fetchIndianStockData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Looking for stock ticker:', ticker);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Convert ticker to uppercase and look for data
        const stockTicker = ticker?.toUpperCase();
        const data = mockIndianStockData[stockTicker];
        
        console.log('📊 Available tickers:', Object.keys(mockIndianStockData));
        console.log('🎯 Found data for', stockTicker, ':', !!data);
        
        if (!data) {
          throw new Error(`Indian stock "${ticker}" not found in our database`);
        }
        
        setStockData(data);
      } catch (err) {
        console.error('❌ Stock fetch error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchIndianStockData();
    }
  }, [ticker]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <SkeletonLoader type="details" />
        </div>
      </div>
    );
  }

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
            onRetry={handleRetry}
          />
          
          {/* Debug Information */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold mb-2">🔍 Debug Information:</h3>
            <p>Requested Ticker: <strong>{ticker}</strong></p>
            <p>Available Tickers: <strong>{Object.keys(mockIndianStockData).join(', ')}</strong></p>
          </div>
        </div>
      </div>
    );
  }

  if (!stockData) return null;

  const isPositive = stockData.change >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <FadeInAnimation>
          <nav className="mb-4 sm:mb-6">
            <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm transition-colors">
              ← Back to Indian Market Dashboard
            </Link>
          </nav>
        </FadeInAnimation>

        {/* Indian Stock Header */}
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
                      {stockData.exchange}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {stockData.sector}
                    </span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl text-gray-600 mb-4 truncate">
                  {stockData.name}
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-0">
                    {stockData.currency}{stockData.price.toFixed(2)}
                  </span>
                  <div className={`flex items-center text-base sm:text-lg font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 transition-transform ${isPositive ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {isPositive ? '+' : ''}{stockData.currency}{stockData.change.toFixed(2)} ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 flex-shrink-0">
                <WatchlistButton ticker={stockData.ticker} />
              </div>
            </div>
          </div>
        </FadeInAnimation>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <FadeInAnimation delay={200}>
              <IndianStockChart 
                data={stockData.chartData} 
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                ticker={stockData.ticker}
                currency={stockData.currency}
              />
            </FadeInAnimation>
            
            <FadeInAnimation delay={300}>
              <IndianCompanyInfo company={stockData} />
            </FadeInAnimation>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <FadeInAnimation delay={400}>
              <IndianStockMetrics metrics={stockData} />
            </FadeInAnimation>
            
            <FadeInAnimation delay={500}>
              <IndianNewsSection ticker={stockData.ticker} />
            </FadeInAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
