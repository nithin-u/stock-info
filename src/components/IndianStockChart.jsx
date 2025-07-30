import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function IndianStockChart({ 
  data, 
  timeframe, 
  onTimeframeChange, 
  ticker, 
  currency = '₹', 
  loading = false 
}) {
  // Process the price history data for chart
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    price: item.close || item.price,
    volume: item.volume
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {ticker} Price Chart
        </h3>
        <div className="flex space-x-2">
          {['1W', '1M', '3M', '6M', '1Y'].map(tf => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === tf 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${currency}${value}`, 'Price']}
              labelStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#ea580c" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
