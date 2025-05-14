import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo + Tagline */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tighter text-white">RUDO</span>
            </Link>
            <p className="text-gray-400">Train athletes. Not spreadsheets.</p>
          </div>

          {/* Main Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link to="#faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="#beta" className="text-gray-400 hover:text-white transition-colors">
                    Join the Beta
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <a
              href="mailto:info@rudofit.com"
              className="text-gray-400 hover:text-white transition-colors block mb-4"
            >
              info@rudofit.com
            </a>
            <a
              href="https://app.rudofit.com"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <LogIn className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span>Login</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            Built in 🇦🇷 Powered by the RUDO team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;