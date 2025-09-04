
export interface StockInfo {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface StockAnalysis {
  aiRecommendation: number; // 0-100
  riskLevel: number; // 0-100
  analystEstimates: {
    buy: number;
    hold: number;
    sell: number;
  };
  priceTargets: {
    low: number;
    median: number;
    high: number;
  };
  fundamentals: { [key: string]: string | number };
  technicals: { [key: string]: string | number };
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockData {
  info: StockInfo;
  analysis: StockAnalysis;
  historical: HistoricalDataPoint[];
}
