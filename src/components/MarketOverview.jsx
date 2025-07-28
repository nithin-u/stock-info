export default function MarketOverview() {
  const marketData = [
    { label: 'S&P 500', value: '5,026.61', change: '+1.2%', positive: true },
    { label: 'NASDAQ', value: '15,983.08', change: '+0.8%', positive: true },
    { label: 'DOW JONES', value: '38,239.98', change: '-0.3%', positive: false },
    { label: 'VIX', value: '13.45', change: '-2.1%', positive: false }
  ];

  return (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {marketData.map((item) => (
        <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-blue-100 text-sm font-medium">{item.label}</div>
          <div className="text-white text-lg font-bold mt-1">{item.value}</div>
          <div className={`text-sm font-medium mt-1 ${
            item.positive ? 'text-green-300' : 'text-red-300'
          }`}>
            {item.change}
          </div>
        </div>
      ))}
    </div>
  );
}
