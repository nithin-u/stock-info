import FadeInAnimation from '../components/FadeInAnimation';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: '👨‍💼',
      description: 'Former investment banker with 15+ years in Indian capital markets.'
    },
    {
      name: 'Priya Sharma',
      role: 'Lead Data Scientist',
      image: '👩‍💻',
      description: 'Expert in financial modeling and algorithmic trading strategies.'
    },
    {
      name: 'Amit Patel',
      role: 'Market Research Head',
      image: '👨‍📊',
      description: 'Specialist in Indian penny stocks and emerging market opportunities.'
    },
    {
      name: 'Sneha Gupta',
      role: 'Product Manager',
      image: '👩‍💼',
      description: 'Focused on user experience and financial product development.'
    }
  ];

  const features = [
    {
      icon: '🪙',
      title: 'Comprehensive Penny Stock Analysis',
      description: 'Track over 100+ Indian penny stocks with real-time data, financial metrics, and growth potential analysis.'
    },
    {
      icon: '📊',
      title: 'Mutual Fund Intelligence',
      description: 'Access 2,500+ mutual funds with NAV tracking, expense ratio analysis, and performance comparisons.'
    },
    {
      icon: '📈',
      title: 'Real-Time Market Data',
      description: 'Live updates from NSE, BSE, and AMFI with accurate pricing and volume information.'
    },
    {
      icon: '🎯',
      title: 'Advanced Portfolio Tracking',
      description: 'Create multiple watchlists, track your investments, and monitor portfolio performance.'
    },
    {
      icon: '📰',
      title: 'Market News & Insights',
      description: 'Stay updated with latest market news, company announcements, and expert analysis.'
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Bank-grade security with encrypted data transmission and secure user authentication.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <FadeInAnimation>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                About Stock Info
              </h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                India's premier platform for penny stock analysis and mutual fund tracking, 
                empowering investors with data-driven insights and real-time market intelligence.
              </p>
            </div>
          </FadeInAnimation>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInAnimation>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To democratize access to Indian financial markets by providing comprehensive, 
                accurate, and real-time data that empowers every investor—from beginners to 
                professionals—to make informed investment decisions.
              </p>
            </div>
          </FadeInAnimation>

          {/* Why Choose Us */}
          <FadeInAnimation delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose Stock Info?
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">🇮🇳 India-Focused:</strong> Specialized in Indian markets with deep understanding of NSE, BSE, and AMFI regulations.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">⚡ Real-Time Data:</strong> Live market feeds with millisecond accuracy for timely investment decisions.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">🎯 Penny Stock Expertise:</strong> Unique focus on high-growth potential penny stocks with detailed fundamental analysis.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">📊 Comprehensive Analysis:</strong> Advanced charting, technical indicators, and financial ratio analysis.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900">🔐 Trusted Platform:</strong> Secure, reliable, and transparent platform trusted by thousands of investors.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Platform Statistics
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                    <div className="text-sm text-gray-600">Penny Stocks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
                    <div className="text-sm text-gray-600">Mutual Funds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInAnimation>

          {/* Features Grid */}
          <FadeInAnimation delay={400}>
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Platform Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <FadeInAnimation key={feature.title} delay={500 + (index * 100)}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 hover:border-orange-200">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </FadeInAnimation>
                ))}
              </div>
            </div>
          </FadeInAnimation>

          {/* Team Section */}
          <FadeInAnimation delay={600}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Meet Our Team
                </h3>
                <p className="text-xl text-gray-600">
                  Experienced professionals dedicated to your investment success
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <FadeInAnimation key={member.name} delay={700 + (index * 100)}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-200">
                      <div className="text-6xl mb-4">{member.image}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h4>
                      <div className="text-orange-600 font-semibold mb-3">
                        {member.role}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </FadeInAnimation>
                ))}
              </div>
            </div>
          </FadeInAnimation>

          {/* Contact Section */}
          <FadeInAnimation delay={800}>
            <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-2xl p-8 sm:p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Investment Journey?
              </h3>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Join thousands of investors who trust Stock Info for their Indian market insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/penny-stocks"
                  className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
                >
                  Explore Penny Stocks
                </a>
                <a
                  href="/mutual-funds"
                  className="inline-flex items-center px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors"
                >
                  Browse Mutual Funds
                </a>
              </div>
            </div>
          </FadeInAnimation>
        </div>
      </div>
    </div>
  );
}
