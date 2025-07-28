import { Link } from 'react-router-dom';

export default function IndianStockCard({ stock }) {
  const isPositive = stock.change >= 0;

  return (
    <Link 
      to={`/stock/${stock.ticker}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6 border border-gray-100 hover:border-orange-200"
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{stock.ticker}</h3>
          <p className="text-xs sm:text-sm text-gray-600 truncate">{stock.name}</p>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          {stock.exchange}
        </span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            ₹{stock.price?.toFixed(2)}
          </span>
          <div className={`flex items-center text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <svg className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${isPositive ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm">
              {isPositive ? '+' : ''}{stock.changePercent?.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Market Cap</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{stock.marketCap}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Volume</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{stock.volume}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
