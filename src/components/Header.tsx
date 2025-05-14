import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from './Modal';
import WaitlistForm from './WaitlistForm';
import { scrollToElement } from '../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-white">RUDO</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                How it Works
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, 'faq')}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* CTA Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Join the Beta
            </button>
          </div>
        </div>
      </motion.header>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Join the RUDO Beta</h2>
          <p className="text-gray-400">Be among the first to experience the future of CrossFit coaching</p>
        </div>
        <WaitlistForm />
      </Modal>
    </>
  );
};

export default Header;