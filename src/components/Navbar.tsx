import React, { useState } from 'react';
import { Trash2, Phone, CalendarCheck, MapPin, Menu, X, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onCheckArea: () => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onCheckArea, onOpenTracker }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
        <span>Now Servicing Boise & Garden City, ID • Use code <strong className="text-white underline underline-offset-2">FIRSTMONTH</strong> for $10 OFF!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            id="nav-brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Trash2 className="w-6 h-6 stroke-[2.2]" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-stone-900">
                  ✓
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-stone-900">TRASH VALET</span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Boise & GC
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-500 tracking-wide">
                Boise & Garden City Curbside Concierge
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <button 
              id="nav-how-it-works-btn"
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              id="nav-pricing-btn"
              onClick={() => scrollToSection('pricing')} 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Plans & Pricing
            </button>
            <button 
              id="nav-areas-btn"
              onClick={() => {
                scrollToSection('service-areas');
                onCheckArea();
              }} 
              className="hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-1 text-stone-600 hover:text-emerald-700"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Service Areas
            </button>
            <button 
              id="nav-tracker-btn"
              onClick={() => {
                scrollToSection('valet-tracker');
                onOpenTracker();
              }} 
              className="hover:text-emerald-700 transition-colors cursor-pointer text-stone-600 hover:text-emerald-700"
            >
              Customer Tracker
            </button>
            <button 
              id="nav-referrals-btn"
              onClick={() => scrollToSection('neighbor-referrals')} 
              className="hover:text-emerald-700 transition-colors cursor-pointer text-emerald-700 font-bold flex items-center gap-1"
            >
              <span>Neighbor $15</span>
            </button>
            <button 
              id="nav-faq-btn"
              onClick={() => scrollToSection('faq')} 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              id="nav-call-link"
              href="tel:2083534695" 
              className="flex items-center gap-2 text-stone-700 hover:text-emerald-700 font-semibold text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-stone-100"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-stone-600 tracking-wider">Call or Text</span>
                <span className="text-sm font-bold text-stone-900">(208) 353-4695</span>
              </div>
            </a>

            <button
              id="nav-get-started-btn"
              onClick={onOpenBooking}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Start Service</span>
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-start-service-quick"
              onClick={onOpenBooking}
              className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
            >
              Start Service
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full text-left py-2 text-stone-800 font-semibold hover:text-emerald-700 border-b border-stone-100"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="w-full text-left py-2 text-stone-800 font-semibold hover:text-emerald-700 border-b border-stone-100"
          >
            Plans & Pricing Calculator
          </button>
          <button
            onClick={() => scrollToSection('service-areas')}
            className="w-full text-left py-2 text-stone-800 font-semibold hover:text-emerald-700 border-b border-stone-100 flex items-center justify-between"
          >
            <span>Service Areas & Routes</span>
            <MapPin className="w-4 h-4 text-emerald-600" />
          </button>
          <button
            onClick={() => scrollToSection('valet-tracker')}
            className="w-full text-left py-2 text-stone-800 font-semibold hover:text-emerald-700 border-b border-stone-100"
          >
            Customer Tracker Demo
          </button>
          <button
            onClick={() => scrollToSection('neighbor-referrals')}
            className="w-full text-left py-2 text-emerald-700 font-bold hover:text-emerald-800 border-b border-stone-100 flex items-center justify-between"
          >
            <span>Neighbor $15 Share Program</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">Give $15, Get $15</span>
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left py-2 text-stone-800 font-semibold hover:text-emerald-700 border-b border-stone-100"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:2083534695"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 text-stone-800 font-bold text-sm bg-stone-50"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call / Text: (208) 353-4695</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md text-center"
            >
              Get Free Quote / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
