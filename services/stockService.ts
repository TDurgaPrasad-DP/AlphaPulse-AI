
import type { StockData, HistoricalDataPoint } from '../types';

const generateHistoricalData = (): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  let lastClose = 1500 + Math.random() * 1000;
  const today = new Date();

  for (let i = 365; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const open = lastClose * (1 + (Math.random() - 0.5) * 0.05);
    const close = open * (1 + (Math.random() - 0.5) * 0.05);
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    const volume = 1000000 + Math.random() * 5000000;

    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(volume),
    });
    lastClose = close;
  }
  return data;
};


const mockStockData: { [key: string]: StockData } = {
  'RELIANCE': {
    info: {
      ticker: 'RELIANCE',
      name: 'Reliance Industries Ltd.',
      exchange: 'NSE',
      sector: 'Energy',
      price: 2855.45,
      change: 30.25,
      changePercent: 1.07,
      timestamp: new Date().toLocaleString(),
    },
    analysis: {
      aiRecommendation: 78,
      riskLevel: 35,
      analystEstimates: { buy: 65, hold: 25, sell: 10 },
      priceTargets: { low: 2500, median: 2900, high: 3400 },
      fundamentals: {
        'Market Cap': '20.5T', 'P/E Ratio': 28.5, 'EPS': 100.1, 'Dividend Yield': '0.3%',
        'ROE': '8.5%', 'ROCE': '9.2%', 'Debt to Equity': '0.45', 'Book Value': '1250'
      },
      technicals: {
        'RSI (14)': 62.5, 'MACD': 'Bullish Crossover', 'SMA (50)': 2780.1, 'SMA (200)': 2650.5,
        'Volatility': '1.2%', 'ADX': 25.4, 'ATR': 45.2, 'Support 1': 2800, 'Resistance 1': 2910
      },
    },
    historical: generateHistoricalData(),
  },
};

export const fetchStockData = (ticker: string): Promise<StockData | null> => {
  console.log(`Fetching mock data for ${ticker}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const upperTicker = ticker.toUpperCase();
      if (mockStockData[upperTicker]) {
        resolve(mockStockData[upperTicker]);
      } else {
        // Create dynamic mock data for any other ticker
        const lastData = generateHistoricalData();
        const lastClose = lastData[lastData.length - 1].close;
        const prevClose = lastData[lastData.length - 2].close;
        const change = lastClose - prevClose;
        const changePercent = (change / prevClose) * 100;

        const dynamicData: StockData = {
           info: {
              ticker: upperTicker,
              name: `${upperTicker} Industries`,
              exchange: 'NSE',
              sector: 'Diversified',
              price: parseFloat(lastClose.toFixed(2)),
              change: parseFloat(change.toFixed(2)),
              changePercent: parseFloat(changePercent.toFixed(2)),
              timestamp: new Date().toLocaleString(),
            },
            analysis: {
              aiRecommendation: Math.floor(Math.random() * 60 + 20),
              riskLevel: Math.floor(Math.random() * 70 + 15),
              analystEstimates: { buy: Math.floor(Math.random() * 50 + 25), hold: Math.floor(Math.random() * 30 + 10), sell: Math.floor(Math.random() * 15 + 5) },
              priceTargets: { low: lastClose * 0.85, median: lastClose * 1.05, high: lastClose * 1.25 },
              fundamentals: {
                'Market Cap': '10.2T', 'P/E Ratio': (20 + Math.random() * 10).toFixed(2), 'EPS': (lastClose / 25).toFixed(2), 'Dividend Yield': `${(Math.random() * 1.5).toFixed(1)}%`,
                'ROE': `${(5 + Math.random() * 10).toFixed(1)}%`, 'ROCE': `${(6 + Math.random() * 10).toFixed(1)}%`, 'Debt to Equity': (0.3 + Math.random() * 0.4).toFixed(2), 'Book Value': (lastClose * 0.6).toFixed(2)
              },
              technicals: {
                'RSI (14)': (40 + Math.random() * 30).toFixed(2), 'MACD': Math.random() > 0.5 ? 'Bullish' : 'Bearish', 'SMA (50)': (lastClose * 0.98).toFixed(2), 'SMA (200)': (lastClose * 0.92).toFixed(2),
                'Volatility': `${(1 + Math.random()).toFixed(1)}%`, 'ADX': (20 + Math.random() * 10).toFixed(2), 'ATR': (lastClose * 0.015).toFixed(2), 'Support 1': (lastClose * 0.97).toFixed(2), 'Resistance 1': (lastClose * 1.03).toFixed(2)
              },
            },
            historical: lastData,
        };
        resolve(dynamicData);
      }
    }, 500);
  });
};
