import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import IndianStockCard from '../components/IndianStockCard';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import mutualFundService from '../services/mutualFundService';
import { useDebounce } from '../hooks/useDebounce';

export default function MutualFunds() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [funds, setFunds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [categories, setCategories] = useState(['All Types']);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await mutualFundService.getCategories();
        setCategories(['All Types', ...categoriesData]);
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  // Reset when filters change
  useEffect(() => {
    setPage(1);
    setFunds([]);
    setPagination(null);
  }, [selectedCategory, debouncedSearchTerm]);

  // Fetch mutual funds with improved pagination
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const params = {
          page: page,           // Should start from 1
          limit: 20,           // 20 items per page
          ...(selectedCategory !== 'All Types' && { category: selectedCategory }),
          ...(debouncedSearchTerm && { search: debouncedSearchTerm })
        };

        console.log(`🔄 Fetching mutual funds - Page ${page}, Category: ${selectedCategory}`);
        const response = await mutualFundService.getMutualFunds(params);
        
        // Convert mutual fund data to stock card format
        const convertedFunds = response.data.map(fund => ({
          ticker: fund.schemeCode,
          name: fund.schemeName,
          price: fund.nav,
          change: fund.navChange || 0,
          changePercent: fund.navChangePercent || 0,
          sector: fund.category,
          marketCap: `₹${fund.aum || 'N/A'} Cr AUM`,
          volume: `${fund.expenseRatio || 'N/A'}% Expense Ratio`,
          exchange: 'AMFI',
          fundHouse: fund.fundHouse,
          isMutualFund: true
        }));
        
        if (page === 1) {
          // First page - replace existing funds
          setFunds(convertedFunds);
        } else {
          // Subsequent pages - append to existing funds
          setFunds(prev => [...prev, ...convertedFunds]);
        }
        
        // Check if more data exists - UPDATED PAGINATION CHECK
        setPagination(response.pagination);
        console.log(`✅ Loaded ${convertedFunds.length} funds, Total: ${page === 1 ? convertedFunds.length : funds.length + convertedFunds.length}`);
        
      } catch (error) {
        console.error('❌ Failed to fetch mutual funds:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchFunds();
  }, [selectedCategory, debouncedSearchTerm, page]);

  // Load more funds (pagination) - UPDATED FUNCTION
  const loadMoreFunds = () => {
    if (pagination?.hasNextPage && !loadingMore) {
      console.log(`📄 Loading more funds - Next page: ${pagination.next?.page || page + 1}`);
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Mutual Funds</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                Explore comprehensive mutual fund analysis with live NAV data from AMFI registered funds
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
            placeholder="Search mutual funds by name or fund house..."
          />
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary - UPDATED */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory} Mutual Funds
          </h2>
          <p className="text-gray-600">
            {loading && funds.length === 0 ? 'Loading...' : (
              <>
                Showing {funds.length} of {pagination?.totalCount || 0} funds
                {pagination?.hasNextPage && ` • Page ${pagination.current} of ${pagination.total}`}
              </>
            )}
          </p>
        </div>

        {/* Funds Grid */}
        {loading && funds.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {funds.map((fund, index) => (
                <FadeInAnimation key={`${fund.ticker}-${index}`} delay={index * 50}>
                  <IndianStockCard stock={fund} />
                </FadeInAnimation>
              ))}
            </div>

            {/* Load More Button - UPDATED */}
            {pagination?.hasNextPage && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreFunds}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Funds</span>
                      <span className="text-xs bg-green-700 px-2 py-1 rounded">
                        20 more
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* End of Results Message - UPDATED */}
            {!pagination?.hasNextPage && funds.length > 0 && (
              <div className="text-center mt-8 py-4">
                <p className="text-gray-500">
                  🎉 You've seen all {funds.length} mutual funds{selectedCategory !== 'All Types' ? ` in "${selectedCategory}"` : ''}
                </p>
              </div>
            )}

            {/* No Results */}
            {funds.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No mutual funds found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
