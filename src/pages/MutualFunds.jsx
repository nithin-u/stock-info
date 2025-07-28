import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import IndianStockCard from '../components/IndianStockCard';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import { useDebounce } from '../hooks/useDebounce';

export default function MutualFunds() {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Your existing mutual funds data
  const mutualFunds = [
    {
      ticker: 'SBI-BLUECHIP',
      name: 'SBI Bluechip Fund',
      nav: 67.89,
      price: 67.89,
      change: 1.23,
      changePercent: 1.85,
      category: 'Mutual Funds',
      fundType: 'Large Cap',
      sector: 'Large Cap',
      marketCap: '₹45,678 Cr',
      aum: '₹45,678 Cr',
      volume: '1.75%',
      expense: '1.75%',
      exchange: 'AMFI'
    },
    // ... add all your other mutual funds here
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFunds(mutualFunds);
      setFilteredFunds(mutualFunds);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = funds;

    if (selectedType !== 'All Types') {
      filtered = filtered.filter(fund => fund.fundType === selectedType);
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter(fund => 
        fund.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        fund.ticker.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    setFilteredFunds(filtered);
  }, [funds, selectedType, debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FadeInAnimation>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                📊 Indian Mutual Funds
              </h1>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                Explore comprehensive mutual fund analysis with NAV tracking, performance metrics, and investment insights
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
            placeholder="Search mutual funds..."
          />
          
          <div className="flex flex-wrap gap-3">
            {['All Types', 'Large Cap', 'Mid Cap', 'Small Cap', 'Debt', 'Hybrid'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedType} Mutual Funds
          </h2>
          <p className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${filteredFunds.length} funds`}
          </p>
        </div>

        {/* Funds Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFunds.map((fund, index) => (
              <FadeInAnimation key={fund.ticker} delay={index * 50}>
                <IndianStockCard stock={fund} />
              </FadeInAnimation>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
