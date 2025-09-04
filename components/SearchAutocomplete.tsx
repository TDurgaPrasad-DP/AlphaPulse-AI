
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { POPULAR_TICKERS } from '../constants';
import Button from './Button';

const SearchAutocomplete: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ ticker: string; name: string }[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setQuery(value);
    if (value) {
      const filtered = POPULAR_TICKERS.filter(
        (stock) => stock.ticker.startsWith(value) || stock.name.toUpperCase().includes(value)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(POPULAR_TICKERS);
    }
  };

  const handleSelect = (ticker: string) => {
    setQuery(ticker);
    setIsFocused(false);
    navigate(`/analysis/${ticker}`);
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/analysis/${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const displayedSuggestions = query ? suggestions : POPULAR_TICKERS;

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchContainerRef}>
      <div className="flex items-center">
        <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search NSE tickers (e.g., RELIANCE)"
              className="w-full pl-5 pr-12 py-4 bg-gray-800 border-2 border-gray-700 rounded-l-md text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search stock ticker"
              aria-autocomplete="list"
              aria-haspopup="true"
              aria-expanded={isFocused && displayedSuggestions.length > 0}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
        <Button onClick={handleSearch} className="rounded-l-none h-[64px]" aria-label="Analyze stock">Analyze</Button>
      </div>

      {isFocused && displayedSuggestions.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {displayedSuggestions.map((stock) => (
            <li
              key={stock.ticker}
              onClick={() => handleSelect(stock.ticker)}
              className="px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer flex justify-between"
              role="option"
              aria-selected="false"
            >
              <span>{stock.name}</span>
              <span className="font-mono text-blue-400">{stock.ticker}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAutocomplete;
