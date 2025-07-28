export default function IndianCompanyInfo({ company }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🏢</span>
        Company Information
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <span className="mr-2">📝</span>
            Business Description
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
            {company.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-1">
              <span className="mr-2">🏭</span>
              Industry
            </h4>
            <p className="text-gray-900 text-sm font-semibold">{company.industry}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-1">
              <span className="mr-2">👥</span>
              Employees
            </h4>
            <p className="text-gray-900 text-sm font-semibold">{company.employees}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-1">
              <span className="mr-2">🗓️</span>
              Founded
            </h4>
            <p className="text-gray-900 text-sm font-semibold">{company.founded}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-1">
              <span className="mr-2">📍</span>
              Headquarters
            </h4>
            <p className="text-gray-900 text-sm font-semibold">{company.headquarters}</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 bg-blue-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <span className="mr-2">🌐</span>
            Official Website
          </h4>
          <a 
            href={`https://${company.website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
          >
            {company.website}
          </a>
        </div>
      </div>
    </div>
  );
}
