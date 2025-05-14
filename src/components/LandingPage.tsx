import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, Users, MessageSquare, Trophy, ArrowRight, User, UserCog, 
  Calendar, BarChart3, Smartphone, Clock, Star, CheckCheck, XCircle,
  FileSpreadsheet, UsersRound, MessageCircle, Palette, ChevronDown, Plus
} from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';

const TestimonialCard = ({ name, role, quote }: {
  name: string;
  role: string;
  quote: string;
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#8A2BE2]/30 transition-colors"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-[#4169E1]/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity" />
    <div className="relative">
      <Star className="w-6 h-6 text-[#8A2BE2] mb-4" />
      <p className="text-lg mb-4 text-gray-300">{quote}</p>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

const ComparisonRow = ({ problem, solution, icon: Icon, problemSubtext, solutionSubtext }: {
  problem: string;
  solution: string;
  icon: React.ElementType;
  problemSubtext: string;
  solutionSubtext: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid md:grid-cols-2 gap-6 mb-8"
  >
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group p-6 bg-gradient-to-br from-red-500/5 to-red-900/5 rounded-2xl border border-red-500/10 hover:border-red-500/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-500/10 rounded-xl">
          <Icon className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-200">{problem}</h3>
          <p className="text-gray-400">{problemSubtext}</p>
        </div>
      </div>
    </motion.div>
    
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group p-6 bg-gradient-to-br from-[#8A2BE2]/10 to-[#4169E1]/10 rounded-2xl border border-[#8A2BE2]/20 hover:border-[#8A2BE2]/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#8A2BE2]/20 rounded-xl">
          <Icon className="w-6 h-6 text-[#8A2BE2]" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{solution}</h3>
          <p className="text-gray-400">{solutionSubtext}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.03)" : "transparent" }}
      className="rounded-xl transition-colors duration-200"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="text-lg font-medium pr-8 group-hover:text-[#8A2BE2] transition-colors duration-200">
          {question}
        </span>
        <motion.div
          initial={false}
          animate={{ 
            rotate: isOpen ? 45 : 0,
            backgroundColor: isOpen ? "rgb(138, 43, 226)" : "rgba(255, 255, 255, 0.1)"
          }}
          className="p-1 rounded-lg"
        >
          <Plus className={`w-4 h-4 transition-colors duration-200 ${isOpen ? "text-white" : "text-gray-400"}`} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { 
                height: { type: "spring", stiffness: 400, damping: 17 },
                opacity: { duration: 0.2 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { type: "spring", stiffness: 400, damping: 17 },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] sm:leading-none mb-6 px-4"
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
                className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 px-4"
              >
                RUDO gives CrossFit coaches everything they need to program, track, and grow — without wasting hours managing chaos.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <button
                  onClick={() => setIsModalOpen(true)}
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

        {/* Social Proof Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built with feedback from coaches across 30+ top-tier gyms
              </h2>
              <p className="text-xl text-gray-400">
                Trusted by coaches designing high-performance programs for hundreds of athletes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                name="Carlos Rodriguez"
                role="Head Coach, CrossFit Madrid"
                quote="RUDO replaced Google Sheets and saved me 6 hours a week."
              />
              <TestimonialCard
                name="Sarah Thompson"
                role="Owner, CrossFit Elite"
                quote="Finally, software that understands how CrossFit coaches actually work."
              />
              <TestimonialCard
                name="Juan Martinez"
                role="Programming Director, CrossFit Buenos Aires"
                quote="The athlete feedback loop is a game-changer for remote coaching."
              />
            </div>
          </div>
        </div>

        {/* Why Coaches Are Switching Section */}
        <div id="why-coaches" className="py-24 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Coaches Are Switching to RUDO
              </h2>
              <p className="text-xl text-gray-400">
                Say goodbye to chaos. Say hello to control.
              </p>
            </div>
            
            <div className="space-y-6">
              <ComparisonRow
                problem="Dozens of tabs. No structure."
                solution="Drag-and-drop full weeks in minutes."
                problemSubtext="Where the hell is Tuesday's WOD?"
                solutionSubtext="One clean calendar. Total control."
                icon={FileSpreadsheet}
              />
              
              <ComparisonRow
                problem="Copy-paste for every athlete."
                solution="Assign to groups in one click."
                problemSubtext="Manual updates = wasted time"
                solutionSubtext="Bulk actions, instant updates"
                icon={UsersRound}
              />
              
              <ComparisonRow
                problem="Feedback lost in DMs."
                solution="Comments tracked & organized."
                problemSubtext="Scattered across apps & chats"
                solutionSubtext="All feedback in one place"
                icon={MessageCircle}
              />
              
              <ComparisonRow
                problem="Looks amateur."
                solution="Sleek branded platform."
                problemSubtext="Generic spreadsheets & docs"
                solutionSubtext="Professional, custom experience"
                icon={Palette}
              />
            </div>
          </div>
        </div>

        {/* Coach vs Athlete Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built for Both Sides of the Barbell
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#8A2BE2]/20 rounded-xl">
                    <UserCog className="w-6 h-6 text-[#8A2BE2]" />
                  </div>
                  <h3 className="text-2xl font-bold">For Coaches</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#8A2BE2]" />
                    <span>Save hours on programming and admin</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#8A2BE2]" />
                    <span>Manage multiple groups efficiently</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[#8A2BE2]" />
                    <span>Look professional with branded apps</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#4169E1]/20 rounded-xl">
                    <User className="w-6 h-6 text-[#4169E1]" />
                  </div>
                  <h3 className="text-2xl font-bold">For Athletes</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#4169E1]" />
                    <span>Access workouts anywhere, anytime</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#4169E1]" />
                    <span>Give and receive feedback instantly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-[#4169E1]" />
                    <span>Track progress with detailed analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="py-24 bg-black/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Still Have Questions?
              </h2>
            </div>
            
            <div className="space-y-4">
              <FAQItem
                question="Can I use RUDO for both group and 1-on-1 clients?"
                answer="Yes — assign programs to individuals, small groups, or your entire roster in one click."
              />
              <FAQItem
                question="Do my athletes need to download anything?"
                answer="Nope. They get instant access through a mobile-friendly web app — no installs, no friction."
              />
              <FAQItem
                question="What makes RUDO different from other coaching platforms?"
                answer="RUDO is purpose-built for CrossFit and HYROX coaches — not generic trainers. Every feature is designed around real-world programming, feedback, and athlete flow in high-performance functional training environments."
              />
              <FAQItem
                question="Can I customize my own programming blocks?"
                answer="Yes. Build, reuse, and edit your own templates — warm-ups, EMOMs, skills — and deploy them in seconds."
              />
              <FAQItem
                question="What's included in the beta?"
                answer="Full access to all core features, direct access to the founding team, and lifetime perks for helping us shape the future of RUDO."
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
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center justify-center mx-auto"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <span className="relative px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-bold tracking-wide flex items-center gap-3 border border-white/10 hover:border-white/20 transition-all duration-500">
                Request Access to the Beta
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
            
            <p className="text-sm text-gray-400 mt-6">
              Already trusted by coaches programming for 300+ athletes
            </p>
          </div>
        </div>

        <Footer />
      </div>

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

export default LandingPage;