export default function StockMetrics({ metrics }) {
  const metricItems = [
    { label: 'Market Cap', value: metrics.marketCap },
    { label: 'Volume', value: metrics.volume },
    { label: 'Avg Volume', value: metrics.avgVolume },
    { label: 'P/E Ratio', value: metrics.pe },
    { label: 'EPS', value: `$${metrics.eps}` },
    { label: 'Dividend', value: `$${metrics.dividend}` },
    { label: 'Yield', value: metrics.yield },
    { label: '52W High', value: `$${metrics.high52}` },
    { label: '52W Low', value: `$${metrics.low52}` }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
      <div className="space-y-3">
        {metricItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
