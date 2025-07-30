import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import IndianStockCard from '../components/IndianStockCard';
import SkeletonLoader from '../components/SkeletonLoader';
import FadeInAnimation from '../components/FadeInAnimation';
import stockService from '../services/stockService';
import { useDebounce } from '../hooks/useDebounce';

export default function PennyStocks() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [sectors, setSectors] = useState(['All Sectors']);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch sectors on component mount
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const sectorsData = await stockService.getSectors();
        setSectors(['All Sectors', ...sectorsData]);
      } catch (error) {
        console.error('Failed to fetch sectors:', error.message);
      }
    };

    fetchSectors();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setStocks([]);
    setFilteredStocks([]);
    setPagination(null);
  }, [selectedSector, debouncedSearchTerm]);

  // Fetch penny stocks with improved pagination
  useEffect(() => {
    const fetchStocks = async () => {
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
          ...(selectedSector !== 'All Sectors' && { sector: selectedSector }),
          ...(debouncedSearchTerm && { search: debouncedSearchTerm })
        };

        console.log(`🔄 Fetching penny stocks - Page ${page}, Sector: ${selectedSector}`);
        const response = await stockService.getPennyStocks(params);
        
        // ✅ FIXED: Declare newStocks before using it
        const newStocks = response.data || [];
        
        if (page === 1) {
          // First page - replace existing stocks
          setStocks(newStocks);
          setFilteredStocks(newStocks);
        } else {
          // Subsequent pages - append to existing stocks
          setStocks(prev => [...prev, ...newStocks]);
          setFilteredStocks(prev => [...prev, ...newStocks]);
        }
        
        // Check if more data exists - UPDATED PAGINATION CHECK
        setPagination(response.pagination);
        console.log(`✅ Loaded ${newStocks.length} stocks, Total: ${page === 1 ? newStocks.length : stocks.length + newStocks.length}`);
        
      } catch (error) {
        console.error('❌ Failed to fetch penny stocks:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchStocks();
  }, [selectedSector, debouncedSearchTerm, page]);

  // Load more stocks (pagination) - UPDATED FUNCTION
  const loadMoreStocks = () => {
    if (pagination?.hasNextPage && !loadingMore) {
      console.log(`📄 Loading more stocks - Next page: ${pagination.next?.page || page + 1}`);
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Stocks</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FadeInAnimation>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                🪙 Indian Penny Stocks
              </h1>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                Discover high-potential penny stocks trading under ₹50 on NSE with live market data
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
            placeholder="Search penny stocks by name or ticker..."
          />
          
          <div className="flex flex-wrap gap-3">
            {sectors.map((sector) => (
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

        {/* Results Summary - UPDATED */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedSector} Penny Stocks
          </h2>
          <p className="text-gray-600">
            {loading && stocks.length === 0 ? 'Loading...' : (
              <>
                Showing {stocks.length} of {pagination?.totalItems || 0} stocks
                {pagination?.hasNextPage && ` • Page ${pagination.currentPage} of ${pagination.totalPages}`}
              </>
            )}
          </p>
        </div>

        {/* Stock Grid */}
        {loading && stocks.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stocks.map((stock, index) => (
                <FadeInAnimation key={`${stock.ticker}-${index}`} delay={index * 50}>
                  <IndianStockCard stock={stock} />
                </FadeInAnimation>
              ))}
            </div>

            {/* Load More Button - UPDATED */}
            {pagination?.hasNextPage && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreStocks}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Stocks</span>
                      <span className="text-xs bg-blue-700 px-2 py-1 rounded">
                        20 more
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* End of Results Message - UPDATED */}
            {!pagination?.hasNextPage && stocks.length > 0 && (
              <div className="text-center mt-8 py-4">
                <p className="text-gray-500">
                  🎉 You've seen all {stocks.length} penny stocks{selectedSector !== 'All Sectors' ? ` in "${selectedSector}"` : ''}
                </p>
              </div>
            )}

            {/* No Results */}
            {stocks.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No stocks found</h3>
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
