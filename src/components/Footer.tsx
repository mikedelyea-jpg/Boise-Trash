import React from 'react';
import { Trash2, Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onCheckArea: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onCheckArea }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold shadow-md">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">TRASH VALET</span>
                <p className="text-xs text-stone-400 font-semibold">Curbside Can Concierge</p>
              </div>
            </div>

            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              We roll your residential and commercial trash and recycling cans out to the curb the night before collection, and roll them safely back in after they are emptied.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>$2,000,000 General Liability Insured & Background Checked</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Start Service Today &rarr;
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pricing')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Plans & Pricing Calculator
                </button>
              </li>
              <li>
                <button onClick={onCheckArea} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Service Areas & Zip Codes
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('valet-tracker')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Live Valet Tracker
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>HOA Fine Elimination</li>
              <li>Steep & Long Driveways</li>
              <li>Senior Home Safety</li>
              <li>Airbnb & Vacation Rentals</li>
              <li>Can Odor Sanitizing Spray</li>
              <li>Vacation Hold & One-Time Passes</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <a href="tel:2083534695" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>(208) 353-4695</span>
              </a>
              <a href="mailto:dispatch@boisetrashvalet.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>dispatch@boisetrashvalet.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Boise & Garden City, ID • Ada County Operations</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Trash Valet Co. All rights reserved. "We Roll 'Em Out, We Roll 'Em In"</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-300">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-300">HOA Compliance Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
