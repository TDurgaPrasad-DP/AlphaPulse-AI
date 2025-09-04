
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import type { StockAnalysis } from '../types';

interface AnalystEstimatesChartProps {
  data: StockAnalysis['analystEstimates'];
}

const COLORS = { buy: '#56d364', hold: '#fbbf24', sell: '#f87171' };
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
    const total = payload.buy + payload.hold + payload.sell;
    const value = payload[Object.keys(payload)[index]];
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold text-sm">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const AnalystEstimatesChart: React.FC<AnalystEstimatesChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Buy', value: data.buy },
    { name: 'Hold', value: data.hold },
    { name: 'Sell', value: data.sell },
  ];
  const total = data.buy + data.hold + data.sell;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2 h-64 relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <p className="text-3xl font-bold">{total}</p>
                <p className="text-sm text-gray-400">Analysts</p>
            </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        {chartData.map(item => (
            <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[item.name.toLowerCase() as keyof typeof COLORS] }}></span>
                        <span className="font-semibold">{item.name}</span>
                    </div>
                    <span>{item.value} ({((item.value/total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${(item.value/total) * 100}%`, backgroundColor: COLORS[item.name.toLowerCase() as keyof typeof COLORS] }}></div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AnalystEstimatesChart;
