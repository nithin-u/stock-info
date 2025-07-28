export default function CompanyInfo({ company }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{company.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Industry</h4>
            <p className="text-gray-900 text-sm">{company.industry}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Employees</h4>
            <p className="text-gray-900 text-sm">{company.employees}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Founded</h4>
            <p className="text-gray-900 text-sm">{company.founded}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Headquarters</h4>
            <p className="text-gray-900 text-sm">{company.headquarters}</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Website</h4>
          <a 
            href={`https://${company.website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {company.website}
          </a>
        </div>
      </div>
    </div>
  );
}
