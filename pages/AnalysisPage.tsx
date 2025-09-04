import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { StockData } from '../types';
import { fetchStockData } from '../services/stockService';
import Card from '../components/Card';
import StockChart from '../components/StockChart';
import AnalystEstimatesChart from '../components/AnalystEstimatesChart';
import NotFoundPage from './NotFoundPage';

const DataGrid: React.FC<{ title: string; data: { [key: string]: string | number } }> = ({ title, data }) => (
    <Card>
        <h3 className="text-xl font-bold mb-4 text-gray-200">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="bg-gray-900/50 p-3 rounded-md">
                    <p className="text-gray-400">{key}</p>
                    <p className="font-semibold font-mono text-gray-100">{value}</p>
                </div>
            ))}
        </div>
    </Card>
);

const Meter: React.FC<{ label: string; value: number }> = ({ label, value }) => {
    const getGradient = (val: number) => {
        if (val < 40) return 'from-red-500 to-yellow-500';
        if (val < 70) return 'from-yellow-500 to-green-500';
        return 'from-green-500 to-teal-500';
    };
    const gradient = getGradient(value);
    const glow = value > 70 ? 'shadow-glow-green' : 'shadow-none';

    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-gray-300">{label}</span>
                <span className="text-lg font-bold font-mono text-white">{value}/100</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                    className={`bg-gradient-to-r ${gradient} h-4 rounded-full transition-all duration-1000 ease-out ${glow}`}
                    style={{ width: `${value}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                ></div>
            </div>
        </div>
    );
};

const AnalysisPage: React.FC = () => {
    const { ticker } = useParams<{ ticker: string }>();
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const loadData = async () => {
            if (!ticker) {
                setError(true);
                setLoading(false);
                return;
            };
            try {
                setLoading(true);
                setError(false);
                const data = await fetchStockData(ticker);
                if (data) {
                    setStockData(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [ticker]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div></div>;
    }

    if (error || !stockData) {
        return <NotFoundPage />;
    }

    const { info, analysis, historical } = stockData;
    const isPositive = info.change >= 0;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <Card>
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{info.name} ({info.ticker})</h1>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                            <span>{info.exchange}</span>
                            <span>&bull;</span>
                            <span>{info.sector}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-4xl font-mono font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            ₹{info.price.toFixed(2)}
                        </p>
                        <p className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{info.change.toFixed(2)} ({isPositive ? '+' : ''}{info.changePercent.toFixed(2)}%)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Last updated: {info.timestamp}</p>
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card><Meter label="AI Recommendation Score" value={analysis.aiRecommendation} /></Card>
                <Card><Meter label="AI Risk Level" value={100 - analysis.riskLevel} /></Card>
            </div>

            <Card>
                <h2 className="text-2xl font-bold mb-4">Historical Performance</h2>
                <StockChart data={historical} />
            </Card>

            <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Card className="h-full">
                        <h2 className="text-2xl font-bold mb-4">Analyst Estimates</h2>
                        <AnalystEstimatesChart data={analysis.analystEstimates} />
                    </Card>
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-2xl font-bold text-center">Price Targets</h2>
                    {/* FIX: Changed glowColor="red" to "purple" as "red" is not a supported color for the Card component. */}
                    <Card glowColor="purple"><div className="text-center"><p className="text-sm text-gray-400">Low</p><p className="text-2xl font-bold font-mono">₹{analysis.priceTargets.low.toFixed(2)}</p></div></Card>
                    {/* FIX: Changed glowColor="yellow" to "blue" as "yellow" is not a supported color for the Card component. */}
                    <Card glowColor="blue"><div className="text-center"><p className="text-sm text-gray-400">Median</p><p className="text-2xl font-bold font-mono">₹{analysis.priceTargets.median.toFixed(2)}</p></div></Card>
                    <Card glowColor="green"><div className="text-center"><p className="text-sm text-gray-400">High</p><p className="text-2xl font-bold font-mono">₹{analysis.priceTargets.high.toFixed(2)}</p></div></Card>
                </div>
            </div>

            <DataGrid title="Fundamental Analysis" data={analysis.fundamentals} />
            <DataGrid title="Technical Analysis" data={analysis.technicals} />
        </div>
    );
};

export default AnalysisPage;
