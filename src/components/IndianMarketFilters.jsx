export default function IndianMarketFilters({ selectedCategory, onCategoryChange }) {
  const categories = ['Penny Stocks', 'Mutual Funds', 'Small Cap', 'Mid Cap', 'Large Cap'];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:border-orange-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
