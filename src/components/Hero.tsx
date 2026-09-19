import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Camera, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  ChevronRight,
  Sun,
  Moon,
  Truck
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onCheckArea: () => void;
  onExplorePricing: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onCheckArea, onExplorePricing }) => {
  const [cycleStage, setCycleStage] = useState<'eve' | 'truck' | 'return'>('eve');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-50">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-100/30 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Boise & Garden City Curbside Can Concierge</span>
              <span className="text-emerald-700 hidden sm:inline">•</span>
              <span className="text-emerald-700 hidden sm:inline font-bold">Treasure Valley</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              We roll your trash out <br className="hidden sm:inline" />
              <span className="text-emerald-700">
                before trash day.
              </span><br />
              And roll it back in.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl font-normal leading-relaxed">
              Never haul heavy, smelly 96-gallon cans in the rain, freezing winter mornings, or dark of night again. 
              Avoid strict HOA fines and steep driveway slips. We handle the full round-trip so you never think about trash day again.
            </p>

            {/* Trust Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-stone-700 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Round-Trip (Out & Back)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero HOA Warnings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Photo Text Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gates Always Latched</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Insured & Background-Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cancel Anytime</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                id="hero-start-service-cta"
                onClick={onOpenBooking}
                className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base px-7 py-4 rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Get Started • From $29/mo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-calculate-cta"
                onClick={onExplorePricing}
                className="bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-base px-6 py-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Pricing Calculator</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Area quick check link */}
            <div className="pt-1 flex items-center gap-2 text-stone-500 text-sm">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Serving Boise & Garden City neighborhoods with weekly routes.</span>
              <button 
                id="hero-check-area-link"
                onClick={onCheckArea}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Check your ZIP code &rarr;
              </button>
            </div>

          </div>

          {/* Right Column: Interactive 24-Hour Cycle Stage Simulator */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-stone-200/80 relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
                      Live Service Demonstration
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-stone-900">
                    The 24-Hour Round-Trip Cycle
                  </h2>
                </div>
                <span className="text-xs bg-stone-100 text-stone-700 font-semibold px-2.5 py-1 rounded-md">
                  Click stages below
                </span>
              </div>

              {/* Interactive Stage Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl mb-5 text-xs font-bold">
                <button
                  id="tab-stage-eve"
                  onClick={() => setCycleStage('eve')}
                  className={`py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    cycleStage === 'eve'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>1. Roll-Out</span>
                  <span className="text-[10px] text-stone-500 font-normal">Eve (6-9 PM)</span>
                </button>

                <button
                  id="tab-stage-truck"
                  onClick={() => setCycleStage('truck')}
                  className={`py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    cycleStage === 'truck'
                      ? 'bg-white text-amber-800 shadow-sm'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>2. City Empties</span>
                  <span className="text-[10px] text-stone-500 font-normal">Morn (7-11 AM)</span>
                </button>

                <button
                  id="tab-stage-return"
                  onClick={() => setCycleStage('return')}
                  className={`py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    cycleStage === 'return'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. Roll-Back</span>
                  <span className="text-[10px] text-stone-500 font-normal">Aft (1-4 PM)</span>
                </button>
              </div>

              {/* Visual Driveway / Can Graphic */}
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                
                {/* Top status indicator */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {cycleStage === 'eve' && 'Trash Eve • 7:15 PM'}
                      {cycleStage === 'truck' && 'Collection Day • 8:45 AM'}
                      {cycleStage === 'return' && 'Collection Day • 2:10 PM'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    <Camera className="w-3 h-3" />
                    Photo Proof
                  </span>
                </div>

                {/* Driveway Scene Graphic */}
                <div className="my-4 relative py-6 px-2 bg-gradient-to-r from-stone-200/70 via-stone-100 to-stone-200/80 rounded-lg border border-stone-300/60">
                  <div className="flex justify-between items-center text-xs font-bold text-stone-500 mb-2 px-1">
                    <span className="flex items-center gap-1 text-stone-600">
                      🏡 Side Yard / Gate
                    </span>
                    <span className="text-stone-600">
                      Driveway ↔ 85 ft
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800">
                      🛣️ Street Curb
                    </span>
                  </div>

                  {/* Visual Cans Positioning based on cycleStage */}
                  <div className="relative h-16 w-full flex items-center">
                    {/* Road line at right */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 border-l-2 border-dashed border-stone-400 bg-stone-300/50 rounded-r flex items-center justify-center text-[10px] text-stone-600 font-bold -rotate-90">
                      CURB
                    </div>

                    {/* House gate line at left */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-amber-100/70 border-r border-amber-300/80 rounded-l flex items-center justify-center text-[10px] text-amber-900 font-bold -rotate-90">
                      GATE
                    </div>

                    {/* Animated Can Group */}
                    <div 
                      className={`absolute transition-all duration-700 ease-out flex items-center gap-2 ${
                        cycleStage === 'eve' || cycleStage === 'truck'
                          ? 'right-10'
                          : 'left-10'
                      }`}
                    >
                      {/* Trash Can 1 (Green/Gray) */}
                      <div className="w-10 h-14 bg-stone-800 rounded-t-md rounded-b-sm border border-stone-900 shadow-md flex flex-col justify-between items-center py-1 text-white relative">
                        <div className="w-11 h-2 bg-stone-700 rounded-full -mt-2 border border-stone-600" />
                        <span className="text-[8px] font-black text-stone-300">TRASH</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-500 -mb-0.5" />
                        {/* Wheels */}
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-500" />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-500" />
                      </div>

                      {/* Recycle Can 2 (Blue) */}
                      <div className="w-10 h-14 bg-blue-700 rounded-t-md rounded-b-sm border border-blue-900 shadow-md flex flex-col justify-between items-center py-1 text-white relative">
                        <div className="w-11 h-2 bg-blue-600 rounded-full -mt-2 border border-blue-500" />
                        <span className="text-[8px] font-black text-blue-200">RECYCLE</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 -mb-0.5" />
                        {/* Wheels */}
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-500" />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description of current step */}
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-xs text-stone-700">
                  {cycleStage === 'eve' && (
                    <p>
                      <strong className="text-emerald-800">Evening Roll-Out:</strong> Our valet visits your designated bin location, safely navigates gates, and places your cans at the curbside spaced 3 ft apart for the automated truck claw.
                    </p>
                  )}
                  {cycleStage === 'truck' && (
                    <p>
                      <strong className="text-amber-800">City Collection:</strong> The municipal hauler empties your bins without you ever stepping outside into the cold or worrying about missing the truck.
                    </p>
                  )}
                  {cycleStage === 'return' && (
                    <p>
                      <strong className="text-emerald-800">Afternoon Roll-Back:</strong> Our valet returns to roll your empty bins back to the side of your home, secures your gate latch, and texts you a verification photo!
                    </p>
                  )}
                </div>

              </div>

              {/* Bottom Quick Testimonial Snippet */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {'★'.repeat(5)}
                  <span className="text-stone-800 ml-1 font-extrabold">4.9 / 5.0</span>
                </div>
                <span className="text-stone-500">Over 1,200+ cans rolled weekly</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
