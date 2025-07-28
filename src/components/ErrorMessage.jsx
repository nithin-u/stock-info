export default function ErrorMessage({ 
  title = "Something went wrong", 
  message = "Please try again later.", 
  onRetry = null,
  showHomeButton = true 
}) {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 text-5xl mb-4">❌</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      
      <div className="space-x-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
        
        {showHomeButton && (
          <a
            href="/"
            className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </a>
        )}
      </div>
    </div>
  );
}
