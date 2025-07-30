export default function NewsSection({ ticker }) {
  const mockNews = [
    {
      id: 1,
      title: `${ticker} Reports Strong Q4 Earnings`,
      summary: 'Company exceeds analyst expectations with record revenue growth.',
      time: '2 hours ago',
      source: 'Financial Times'
    },
    {
      id: 2,
      title: `Analysts Upgrade ${ticker} to Buy Rating`,
      summary: 'Multiple investment firms raise price targets following positive outlook.',
      time: '1 day ago',
      source: 'Reuters'
    },
    {
      id: 3,
      title: `${ticker} Announces New Product Launch`,
      summary: 'Innovation expected to drive significant market share growth.',
      time: '3 days ago',
      source: 'Bloomberg'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest News</h3>
      <div className="space-y-4">
        {mockNews.map((news) => (
          <div key={news.id} className="pb-4 border-b border-gray-100 last:border-b-0">
            <h4 className="text-sm font-medium text-gray-900 mb-1">{news.title}</h4>
            <p className="text-xs text-gray-600 mb-2">{news.summary}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{news.source}</span>
              <span>{news.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
