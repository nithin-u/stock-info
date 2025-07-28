export default function FilterControls({ selectedSector, onSectorChange }) {
  const sectors = ['All Stocks', 'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer'];

  return (
    <div className="flex flex-wrap gap-3">
      {sectors.map((sector) => (
        <button
          key={sector}
          onClick={() => onSectorChange(sector)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedSector === sector
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {sector}
        </button>
      ))}
    </div>
  );
}
