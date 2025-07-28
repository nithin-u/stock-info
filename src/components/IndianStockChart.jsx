import { useState } from 'react';

export default function IndianStockChart({ data, timeframe, onTimeframeChange, ticker, currency = '₹' }) {
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
          {ticker} Price Chart (NSE)
        </h3>
        <div className="flex flex-wrap gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeframe === tf
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 bg-gradient-to-br from-orange-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <p className="text-gray-600 mb-2">Indian Stock Chart for {ticker}</p>
          <p className="text-sm text-gray-500">Real-time NSE data integration coming soon</p>
          <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
            {data && data.slice(-3).map((point, index) => (
              <div key={index} className="bg-white p-2 rounded shadow">
                <div className="font-semibold">{point.date}</div>
                <div className="text-orange-600">{currency}{point.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
