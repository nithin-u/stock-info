export default function IndianStockMetrics({ metrics }) {
  const metricItems = [
    { label: 'Market Cap', value: metrics.marketCap, icon: '💰' },
    { label: 'Volume', value: metrics.volume, icon: '📊' },
    { label: 'Avg Volume', value: metrics.avgVolume, icon: '📈' },
    { label: 'P/E Ratio', value: metrics.pe > 0 ? metrics.pe.toFixed(2) : 'N/A', icon: '📋' },
    { label: 'EPS', value: `₹${metrics.eps}`, icon: '💹' },
    { label: 'Dividend', value: `₹${metrics.dividend}`, icon: '💰' },
    { label: 'Yield', value: metrics.yield, icon: '📊' },
    { label: '52W High', value: `₹${metrics.high52}`, icon: '⬆️' },
    { label: '52W Low', value: `₹${metrics.low52}`, icon: '⬇️' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🔍</span>
        Key Metrics (NSE)
      </h3>
      <div className="space-y-3">
        {metricItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-2 rounded transition-colors">
            <span className="text-sm text-gray-600 flex items-center">
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
        <p className="text-xs text-orange-700 text-center">
          <strong>Disclaimer:</strong> Data for educational purposes only. Not investment advice.
        </p>
      </div>
    </div>
  );
}
