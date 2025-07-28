export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Stock Info</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your comprehensive penny stock tracking platform for informed investment decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-blue-600 text-sm">Dashboard</a></li>
              <li><a href="/watchlist" className="text-gray-600 hover:text-blue-600 text-sm">Watchlist</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-blue-600 text-sm">About</a></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Disclaimer
            </h3>
            <p className="text-gray-600 text-xs">
              This is an educational project. Stock data is for demonstration purposes only. 
              Not financial advice.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Stock Info. Built for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
