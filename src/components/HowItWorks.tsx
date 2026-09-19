import React from 'react';
import { 
  Calendar, 
  ArrowRight, 
  MapPin, 
  Moon, 
  Sun, 
  CheckCheck, 
  XCircle, 
  Camera, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simplicity Guaranteed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How The Curbside Valet Works
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Three simple steps to never dragging a heavy, foul-smelling plastic can down your driveway ever again.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-600/20">
                  1
                </span>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-3">
                1. Set Your Schedule & Spot
              </h3>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Tell us which day of the week your trash & recycling are collected, how many bins you have, and where you keep them (e.g. side fence, behind garage, back patio).
              </p>

              <div className="bg-white rounded-lg p-3 border border-stone-200 text-xs text-stone-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Works with any city or private waste hauler</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Support for yard waste & recycling rotation</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Setup takes less than 2 minutes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-600/20">
                  2
                </span>
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-3">
                2. The Evening Roll-Out
              </h3>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Between 5:00 PM and 9:30 PM the night before pickup, our vetted, insured valet visits your property, rolls your bins to the street curb, and spaces them properly for sanitation trucks.
              </p>

              <div className="bg-white rounded-lg p-3 border border-stone-200 text-xs text-stone-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Positioned precisely to prevent arm-claw knocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Never blocks your driveway or mailbox</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Always on time, rain or shine</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-600/20">
                  3
                </span>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-3">
                3. The Afternoon Roll-Back
              </h3>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Once the collection truck has emptied your bins, our valet rolls them back up your driveway, puts them behind your gate or garage, secures your gate latch, and texts you a photo confirmation.
              </p>

              <div className="bg-white rounded-lg p-3 border border-stone-200 text-xs text-stone-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Gate latch verified for dogs and children</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free photo text confirmation sent instantly</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>No cans left out past HOA deadlines</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Side-by-Side Comparison: Without vs With Trash Valet */}
        <div className="mt-16 bg-stone-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Compare Your Weekly Routine
            </h3>
            <p className="text-stone-400 text-sm sm:text-base mt-2">
              Why thousands of homeowners consider curbside valet the best $1 a day they spend on home convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* The Old Way */}
            <div className="bg-stone-800/80 rounded-2xl p-6 border border-stone-700/80">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-4 text-base">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>Without Trash Valet</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <span>Dragging 100+ lb heavy cans down steep or icy driveways in freezing dark.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <span>Waking up in a panic at 7 AM to the sound of the garbage truck driving away.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <span>$50-$100 HOA violation letters because bins stayed at the curb while you were at work.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <span>Smelly, filthy handles and dirty clothes from leaning against grime-coated bins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                  <span>Burdening vacation rental guests or neighbors while out of town.</span>
                </li>
              </ul>
            </div>

            {/* The Trash Valet Way */}
            <div className="bg-emerald-950/60 rounded-2xl p-6 border border-emerald-500/40">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4 text-base">
                <CheckCheck className="w-5 h-5 shrink-0" />
                <span>With Trash Valet</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-200">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
                  <span>Zero heavy lifting. Zero slip-and-fall risk in rain, ice, or darkness.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
                  <span>Never miss a single trash day or recycling week again—guaranteed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
                  <span>Complete HOA compliance; cans rolled back promptly the same afternoon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
                  <span>Instant photo text sent right to your phone confirming your gate is secured.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
                  <span>Travel freely without asking favors from neighbors or worrying about vacation homes.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
