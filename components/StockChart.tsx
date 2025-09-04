
import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { HistoricalDataPoint } from '../types';

interface StockChartProps {
  data: HistoricalDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-md p-3 text-sm">
        <p className="font-bold">{new Date(label).toLocaleDateString()}</p>
        <p>Open: <span className="font-mono text-blue-400">{data.open}</span></p>
        <p>High: <span className="font-mono text-green-400">{data.high}</span></p>
        <p>Low: <span className="font-mono text-red-400">{data.low}</span></p>
        <p>Close: <span className="font-mono text-purple-400">{data.close}</span></p>
        <p>Volume: <span className="font-mono text-gray-400">{data.volume.toLocaleString()}</span></p>
      </div>
    );
  }
  return null;
};

const Candle = (props: any) => {
    const { x, y, width, height, open, close, high, low } = props;
    const isBullish = close > open;
    const color = isBullish ? '#56d364' : '#f87171';
    const bodyHeight = Math.abs(open - close);
    const bodyY = isBullish ? y + height - bodyHeight : y;

    return (
        <g>
            <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={y + height} stroke={color} />
            <rect x={x} y={bodyY} width={width} height={bodyHeight} fill={color} />
        </g>
    );
};


const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');

  const domain = [
    Math.min(...data.map(d => d.low)) * 0.98,
    Math.max(...data.map(d => d.high)) * 1.02,
  ];

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setChartType('line')}
          className={`px-3 py-1 text-sm rounded-md ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Line
        </button>
        <button
          onClick={() => setChartType('candlestick')}
          className={`px-3 py-1 text-sm rounded-md ${chartType === 'candlestick' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Candlestick
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#8b949e' }} />
          <YAxis
            orientation="right"
            domain={domain}
            tick={{ fontSize: 12, fill: '#8b949e' }}
            tickFormatter={(value) => `₹${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '14px' }} />

          {chartType === 'line' ? (
            <Line type="monotone" dataKey="close" stroke="#79c0ff" strokeWidth={2} dot={false} name="Close Price" />
          ) : (
            <Bar dataKey="close" name="OHLC" shape={<Candle />}>
              {data.map((entry, index) => (
                <Bar key={`cell-${index}`} fill={entry.close > entry.open ? '#56d364' : '#f87171'} />
              ))}
            </Bar>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
