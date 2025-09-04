
import React from 'react';
import { ICONS } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} AI Stock Analyzer. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              {ICONS['github']}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Discord">
              {/* Placeholder for Discord icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v19.056c0 1.368-1.104 2.472-2.46 2.472h-15.08c-1.356 0-2.46-1.104-2.46-2.472v-19.056c0-1.368 1.104-2.472 2.46-2.472h15.08zm-2.883 14.568c0-.732-.549-1.344-1.23-1.344s-1.23.612-1.23 1.344c0 .72.582 1.32 1.23 1.32s1.23-.6 1.23-1.32zm-5.418 0c0-.732-.549-1.344-1.23-1.344s-1.23.612-1.23 1.344c0 .72.582 1.32 1.23 1.32s1.23-.6 1.23-1.32zm4.326-6.192c.612 0 1.104-.492 1.104-1.104s-.492-1.104-1.104-1.104c-.612 0-1.104.492-1.104 1.104s.492 1.104 1.104 1.104zm-5.076 0c.612 0 1.104-.492 1.104-1.104s-.492-1.104-1.104-1.104c-.612 0-1.104.492-1.104 1.104s.492 1.104 1.104 1.104z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
