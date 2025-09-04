
import React from 'react';
import SearchAutocomplete from '../components/SearchAutocomplete';
import Card from '../components/Card';
import Button from '../components/Button';
import { ICONS } from '../constants';

const LandingPage: React.FC = () => {
    return (
        <div className="space-y-24 md:space-y-32 my-16">
            {/* Hero Section */}
            <section id="hero" className="text-center container mx-auto px-4" aria-labelledby="hero-heading">
                <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                    <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent animate-gradient-text bg-[200%_auto]">
                        AI-Powered Stock Analysis
                    </span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-8">
                    Go beyond the numbers. Leverage institutional-grade AI to get actionable insights and make smarter investment decisions.
                </p>
                <SearchAutocomplete />
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-4" aria-labelledby="how-it-works-heading">
                <div className="text-center mb-12">
                    <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold">How It Works</h2>
                    <p className="text-lg text-gray-400 mt-2">Get your analysis in three simple steps.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card glowColor="blue">
                        <div className="text-blue-400 mb-4">{ICONS['choose']}</div>
                        <h3 className="text-xl font-bold mb-2">1. Choose Your Stock</h3>
                        <p className="text-gray-400">Enter any NSE-listed stock ticker to begin. Access a vast universe of companies.</p>
                    </Card>
                    <Card glowColor="purple">
                        <div className="text-purple-400 mb-4">{ICONS['crunch']}</div>
                        <h3 className="text-xl font-bold mb-2">2. AI Crunches Data</h3>
                        <p className="text-gray-400">Our models analyze thousands of data points, from fundamentals to market sentiment.</p>
                    </Card>
                    <Card glowColor="green">
                        <div className="text-green-400 mb-4">{ICONS['insights']}</div>
                        <h3 className="text-xl font-bold mb-2">3. Get Actionable Insights</h3>
                        <p className="text-gray-400">Receive a clear, concise report with recommendations, risk analysis, and key metrics.</p>
                    </Card>
                </div>
            </section>
            
            {/* Sample Analysis Preview */}
            <section className="container mx-auto px-4" aria-labelledby="sample-analysis-heading">
                <div className="text-center mb-12">
                    <h2 id="sample-analysis-heading" className="text-3xl md:text-4xl font-bold">A Glimpse of Your Edge</h2>
                     <p className="text-lg text-gray-400 mt-2">Here's a sample of the clarity you'll receive.</p>
                </div>
                <Card className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold">Reliance Industries Ltd.</h3>
                            <div className="flex items-center gap-4 my-3">
                                <span className="text-3xl font-mono">₹2855.45</span>
                                <span className="text-lg font-semibold text-green-400">+30.25 (1.07%)</span>
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-300 bg-green-900 rounded-full">Buy</span>
                            </div>
                            <p className="text-gray-400 mb-4">AI analysis indicates strong bullish signals based on technical momentum and positive fundamental outlook. Risk assessment remains low.</p>
                             <div className="flex flex-wrap gap-2">
                                <span className="pill">P/E: 28.5</span>
                                <span className="pill">ROE: 8.5%</span>
                                <span className="pill">RSI: 62.5</span>
                                <span className="pill">Volume: Strong</span>
                            </div>
                        </div>
                         <div className="flex-shrink-0 w-full md:w-1/3">
                            <svg viewBox="0 0 100 40" className="w-full h-auto">
                                <path d="M 0 30 L 10 25 L 20 28 L 30 20 L 40 22 L 50 15 L 60 18 L 70 12 L 80 15 L 90 10 L 100 12" fill="none" stroke="#56d364" strokeWidth="1.5"/>
                                <defs>
                                    <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#56d364" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="#56d364" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                                <path d="M 0 30 L 10 25 L 20 28 L 30 20 L 40 22 L 50 15 L 60 18 L 70 12 L 80 15 L 90 10 L 100 12 V 40 H 0 Z" fill="url(#sparkline-gradient)"/>
                            </svg>
                        </div>
                    </div>
                </Card>
            </section>
            
            {/* Features Grid */}
            <section className="container mx-auto px-4" aria-labelledby="features-heading">
                <div className="text-center mb-12">
                    <h2 id="features-heading" className="text-3xl md:text-4xl font-bold">Features Built for Investors</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card><div className="flex items-center space-x-4"><div className="text-blue-400">{ICONS['fundamental']}</div><div><h3 className="font-bold">Fundamental Analysis</h3><p className="text-sm text-gray-400">Deep-dive into financials.</p></div></div></Card>
                    <Card><div className="flex items-center space-x-4"><div className="text-blue-400">{ICONS['technical']}</div><div><h3 className="font-bold">Technical Indicators</h3><p className="text-sm text-gray-400">RSI, MACD, SMAs, and more.</p></div></div></Card>
                    <Card><div className="flex items-center space-x-4"><div className="text-blue-400">{ICONS['ai-rec']}</div><div><h3 className="font-bold">AI Recommendations</h3><p className="text-sm text-gray-400">Clear Buy, Hold, Sell signals.</p></div></div></Card>
                    <Card><div className="flex items-center space-x-4"><div className="text-blue-400">{ICONS['risk']}</div><div><h3 className="font-bold">Risk Analyzer</h3><p className="text-sm text-gray-400">Quantified risk assessment.</p></div></div></Card>
                    <Card><div className="flex items-center space-x-4"><div className="text-blue-400">{ICONS['news']}</div><div><h3 className="font-bold">News Sentiment</h3><p className="text-sm text-gray-400">Coming soon.</p></div></div></Card>
                    <Card><div className="flex items-center space-x-4"><div className="text-blue-400">{ICONS['sync']}</div><div><h3 className="font-bold">Realtime Sync</h3><p className="text-sm text-gray-400">Data updated frequently.</p></div></div></Card>
                </div>
            </section>
            
            {/* Newsletter */}
            <section className="container mx-auto px-4" aria-labelledby="newsletter-heading">
                <div className="bg-gray-800 rounded-lg p-8 md:p-12 text-center border border-gray-700">
                    <h2 id="newsletter-heading" className="text-2xl md:text-3xl font-bold mb-2">Stay Ahead of the Market</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-6">Subscribe to our newsletter for weekly insights, feature updates, and market analysis.</p>
                    <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input type="email" id="email" placeholder="Enter your email" required className="flex-grow px-4 py-3 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <Button type="submit" variant="primary">Subscribe</Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
