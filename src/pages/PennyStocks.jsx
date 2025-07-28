import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import IndianMarketFilters from '../components/IndianMarketFilters';
import IndianStockCard from '../components/IndianStockCard';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import { useDebounce } from '../hooks/useDebounce';

export default function PennyStocks() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Your existing penny stocks data
  const pennyStocks = [
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
    // ... add all your other penny stocks here
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStocks(pennyStocks);
      setFilteredStocks(pennyStocks);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = stocks;

    if (selectedSector !== 'All Sectors') {
      filtered = filtered.filter(stock => stock.sector === selectedSector);
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter(stock => 
        stock.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    setFilteredStocks(filtered);
  }, [stocks, selectedSector, debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FadeInAnimation>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                🪙 Indian Penny Stocks
              </h1>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                Discover high-potential penny stocks trading under ₹50 on NSE with detailed analysis and real-time data
              </p>
            </div>
          </FadeInAnimation>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search penny stocks..."
          />
          
          <div className="flex flex-wrap gap-3">
            {['All Sectors', 'Banking', 'Telecommunications', 'Power', 'Steel', 'Construction'].map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSector === sector
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedSector} Penny Stocks
          </h2>
          <p className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${filteredStocks.length} stocks`}
          </p>
        </div>

        {/* Stock Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStocks.map((stock, index) => (
              <FadeInAnimation key={stock.ticker} delay={index * 50}>
                <IndianStockCard stock={stock} />
              </FadeInAnimation>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
