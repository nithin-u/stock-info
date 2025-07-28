// Indian Market API Integration
const YAHOO_FINANCE_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart/';
const RAPIDAPI_INDIAN_STOCK = 'https://indian-stock-exchange-api2.p.rapidapi.com/';

// API Configuration
const RAPIDAPI_HEADERS = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'indian-stock-exchange-api2.p.rapidapi.com'
};

// Get NSE Stock Data from Yahoo Finance
export const getNSEStockData = async (symbol) => {
  try {
    const nseSymbol = `${symbol}.NS`; // NSE suffix for Yahoo Finance
    const response = await fetch(`${YAHOO_FINANCE_BASE}${nseSymbol}`);
    const data = await response.json();
    
    if (data.chart.result && data.chart.result[0]) {
      const result = data.chart.result[0];
      const meta = result.meta;
      
      return {
        ticker: symbol,
        name: meta.longName || symbol,
        price: meta.regularMarketPrice,
        change: meta.regularMarketPrice - meta.previousClose,
        changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
        volume: meta.regularMarketVolume,
        marketCap: meta.marketCap,
        high52: meta.fiftyTwoWeekHigh,
        low52: meta.fiftyTwoWeekLow,
        exchange: 'NSE'
      };
    }
    throw new Error('No data found');
  } catch (error) {
    console.error(`Error fetching NSE data for ${symbol}:`, error);
    throw error;
  }
};

// Get Top Penny Stocks from NSE
export const getTopPennyStocks = async () => {
  try {
    // Top penny stocks tickers for NSE
    const pennyStockTickers = [
      'IDEA', 'YESBANK', 'IOB', 'SUZLON', 'RPOWER', 'JPASSOCIAT', 
      'ZEEL', 'VEDL', 'SAIL', 'NMDC', 'COALINDIA', 'ONGC'
    ];
    
    const stockPromises = pennyStockTickers.map(ticker => 
      getNSEStockData(ticker).catch(err => {
        console.error(`Failed to fetch ${ticker}:`, err);
        return null;
      })
    );
    
    const results = await Promise.all(stockPromises);
    return results.filter(stock => stock !== null);
  } catch (error) {
    console.error('Error fetching penny stocks:', error);
    throw error;
  }
};

// Get Mutual Fund Data (using AMFI NAV data)
export const getMutualFundData = async () => {
  try {
    // Mock implementation - in real scenario, you'd fetch from AMFI API
    const mockMFData = [
      {
        ticker: 'SBI-BLUECHIP',
        name: 'SBI Bluechip Fund',
        nav: 67.89,
        change: 1.23,
        changePercent: 1.85,
        category: 'Large Cap',
        aum: '₹45,678 Cr',
        expense: '1.75%',
        exchange: 'AMFI'
      },
      // Add more mutual funds...
    ];
    
    return mockMFData;
  } catch (error) {
    console.error('Error fetching mutual fund data:', error);
    throw error;
  }
};

// Get detailed company information
export const getCompanyDetails = async (symbol) => {
  try {
    const response = await fetch(`${RAPIDAPI_INDIAN_STOCK}company/${symbol}`, {
      headers: RAPIDAPI_HEADERS
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch company details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching company details for ${symbol}:`, error);
    throw error;
  }
};

// Get historical data for charts
export const getHistoricalData = async (symbol, period = '1y') => {
  try {
    const nseSymbol = `${symbol}.NS`;
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${nseSymbol}?period1=0&period2=9999999999&interval=1d`
    );
    
    const data = await response.json();
    
    if (data.chart.result && data.chart.result[0]) {
      const result = data.chart.result[0];
      const timestamps = result.timestamp;
      const prices = result.indicators.quote[0].close;
      
      const chartData = timestamps.map((timestamp, index) => ({
        date: new Date(timestamp * 1000).toISOString().split('T')[0],
        price: prices[index]
      })).filter(item => item.price !== null);
      
      return chartData;
    }
    
    throw new Error('No historical data found');
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    throw error;
  }
};

// Get Indian market news
export const getIndianMarketNews = async (symbol) => {
  try {
    // Mock implementation - integrate with news API like NewsAPI or similar
    const mockNews = [
      {
        id: 1,
        title: `${symbol} reports strong quarterly results`,
        summary: 'Company shows robust growth in recent quarter with increased revenue.',
        source: 'Economic Times',
        time: '2 hours ago',
        sentiment: 'positive'
      },
      {
        id: 2,
        title: `${symbol} announces expansion plans`,
        summary: 'Strategic expansion into new markets announced by management.',
        source: 'Business Standard',
        time: '1 day ago',
        sentiment: 'positive'
      }
    ];
    
    return mockNews;
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error);
    throw error;
  }
};
