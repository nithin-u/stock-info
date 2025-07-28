export default function IndianNewsSection({ ticker }) {
  const mockIndianNews = [
    {
      id: 1,
      title: `${ticker} shows strong quarterly performance in Indian markets`,
      summary: 'Company demonstrates resilience with improved financial metrics and operational efficiency.',
      time: '3 hours ago',
      source: 'Economic Times',
      sentiment: 'positive',
      category: 'Earnings'
    },
    {
      id: 2,
      title: `Analysts bullish on ${ticker} prospects in FY25`,
      summary: 'Investment firms upgrade target price citing strong fundamentals and market position.',
      time: '1 day ago',
      source: 'Business Standard', 
      sentiment: 'positive',
      category: 'Analysis'
    },
    {
      id: 3,
      title: `${ticker} announces strategic initiatives for growth`,
      summary: 'Management outlines expansion plans and technology investments for sustainable growth.',
      time: '2 days ago',
      source: 'Mint',
      sentiment: 'neutral',
      category: 'Corporate'
    },
    {
      id: 4,
      title: `Market volatility impacts ${ticker} trading volumes`,
      summary: 'Increased market uncertainty leads to higher trading activity in the stock.',
      time: '3 days ago',
      source: 'Moneycontrol',
      sentiment: 'neutral',
      category: 'Market'
    }
  ];

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Earnings': return '💰';
      case 'Analysis': return '📊';
      case 'Corporate': return '🏢';
      case 'Market': return '📈';
      default: return '📰';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📰</span>
        Latest News & Updates
      </h3>
      <div className="space-y-4">
        {mockIndianNews.map((news) => (
          <div key={news.id} className="pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 p-3 rounded-lg transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span>{getCategoryIcon(news.category)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(news.sentiment)}`}>
                  {news.sentiment}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {news.category}
                </span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 leading-tight">{news.title}</h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">{news.summary}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="font-medium text-orange-600">{news.source}</span>
              <span>{news.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-700 text-center">
          <strong>Note:</strong> News data is simulated for demo purposes. Real news integration coming soon.
        </p>
      </div>
    </div>
  );
}
