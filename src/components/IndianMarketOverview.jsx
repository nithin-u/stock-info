export default function IndianMarketOverview() {
  const indianMarketData = [
    { label: 'NIFTY 50', value: '25,010.90', change: '+1.2%', positive: true },
    { label: 'SENSEX', value: '81,765.86', change: '+0.8%', positive: true },
    { label: 'BANK NIFTY', value: '52,247.35', change: '-0.3%', positive: false },
    { label: 'NIFTY IT', value: '42,156.45', change: '+2.1%', positive: true }
  ];

  return (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {indianMarketData.map((item) => (
        <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-orange-100 text-sm font-medium">{item.label}</div>
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
