import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import Header from './Header';
import Footer from './Footer';

const LandingPage = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8A2BE2] rounded-full filter blur-[128px] opacity-20 transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4169E1] rounded-full filter blur-[128px] opacity-20 transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-32">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] sm:leading-none mb-6"
              >
                Train athletes.
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] bg-clip-text text-transparent">
                  Not spreadsheets.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-400 mb-10"
              >
                RUDO gives CrossFit coaches everything they need to program, track, and grow — without wasting hours managing chaos.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-bold tracking-wide flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 transition-all duration-500 w-full sm:w-auto">
                    Join the Beta
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Product Preview Section */}
        <div className="py-24 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Programming, Simplified.</h2>
              <p className="text-xl text-gray-400">
                See how fast you can build and assign a training week inside RUDO.
              </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-[#4169E1]/10" />
              <img 
                src="https://i.ibb.co/pB61s01x/platform.jpg"
                alt="RUDO Platform Interface"
                className="w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-24 bg-gradient-to-b from-transparent to-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to program like a pro?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join the coaches shaping the future of CrossFit training
            </p>
            
            <button
              onClick={() => setShowWaitlist(true)}
              className="group relative inline-flex items-center justify-center mx-auto"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <span className="relative px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-bold tracking-wide flex items-center gap-3 border border-white/10 hover:border-white/20 transition-all duration-500">
                Request Access to the Beta
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>

        <Footer />
      </div>

      {showWaitlist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <button
              onClick={() => setShowWaitlist(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Join the RUDO Beta</h2>
              <p className="text-gray-400">Be among the first to experience the future of CrossFit coaching</p>
            </div>
            <WaitlistForm />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;