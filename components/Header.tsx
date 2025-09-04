
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group" aria-label="AI Stock Analyzer Home">
            <div className="p-2 bg-gray-900 rounded-lg border border-gray-700 group-hover:border-blue-500 transition-colors">
              <span className="text-blue-400 group-hover:text-blue-500 transition-colors drop-shadow-[0_0_5px_rgba(88,166,255,0.7)]">
                {ICONS['chart']}
              </span>
            </div>
            <span className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
              AI Stock Analyzer
            </span>
          </Link>
          <nav aria-label="Main navigation">
            <button
              onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
