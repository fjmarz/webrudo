import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white">
              RUDO
            </Link>
            <span className="text-gray-400">Train athletes. Not spreadsheets.</span>
          </div>
          
          <a
            href="https://app.rudofit.com"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <LogIn className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>Login</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer