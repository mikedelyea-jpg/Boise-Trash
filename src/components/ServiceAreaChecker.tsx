import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Send, ArrowRight, Shield, Clock } from 'lucide-react';
import { SERVICE_AREAS } from '../data/mockData';

interface ServiceAreaCheckerProps {
  onStartBookingWithZip?: (zip: string) => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onStartBookingWithZip }) => {
  const [zipInput, setZipInput] = useState('');
  const [searchResult, setSearchResult] = useState<{
    status: 'idle' | 'found' | 'not_found' | 'invalid';
    data?: { zip: string; area: string; days: string };
  }>({ status: 'idle' });
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = zipInput.trim();
    if (clean.length < 5) {
      setSearchResult({ status: 'invalid' });
      return;
    }

    const match = SERVICE_AREAS.find(a => a.zip === clean || a.area.toLowerCase().includes(clean.toLowerCase()));
    if (match) {
      setSearchResult({
        status: 'found',
        data: match,
      });
    } else {
      setSearchResult({
        status: 'not_found',
      });
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <section id="service-areas" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Boise & Garden City Routes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Check Your Boise & Garden City Coverage
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            Enter your 5-digit ZIP code to confirm that our valet route operates on your street in Boise or Garden City.
          </p>
        </div>

        {/* Search input card */}
        <div className="max-w-xl mx-auto bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md">
          <form onSubmit={handleCheckZip} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                id="zip-search-input"
                value={zipInput}
                onChange={(e) => {
                  setZipInput(e.target.value);
                  if (searchResult.status !== 'idle') {
                    setSearchResult({ status: 'idle' });
                    setWaitlistSubmitted(false);
                  }
                }}
                placeholder="Enter 5-digit ZIP code (e.g. 83702 or 83714)"
                maxLength={10}
                className="w-full bg-white border border-stone-300 rounded-xl pl-11 pr-4 py-3.5 text-stone-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
            </div>

            <button
              type="submit"
              id="zip-check-btn"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Check Route</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Search Result Messages */}
          {searchResult.status === 'found' && searchResult.data && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-left animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-stone-900 text-base">
                      Service is Active in {searchResult.data.zip}!
                    </h3>
                    <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-extrabold uppercase px-2 py-0.5 rounded">
                      Open Route
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Coverage Area: <strong>{searchResult.data.area}</strong>
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Regular Collection Routes: {searchResult.data.days}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-medium">Spots available for this week</span>
                    <button
                      type="button"
                      id="claim-valet-spot-btn"
                      onClick={() => onStartBookingWithZip?.(searchResult.data!.zip)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-xs"
                    >
                      Book Your Home &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {searchResult.status === 'not_found' && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-left animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-stone-900 text-sm">
                    We Haven't Opened That Street Route Yet
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    We expand to new routes when 3+ neighbors on a street request service. Put your address on our priority route map!
                  </p>

                  {!waitlistSubmitted ? (
                    <form onSubmit={handleWaitlistSubmit} className="mt-3 flex gap-2">
                      <input
                        type="email"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="Your email or cell #"
                        className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="submit"
                        className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Notify Me</span>
                      </button>
                    </form>
                  ) : (
                    <div className="mt-3 bg-emerald-100 text-emerald-800 text-xs font-bold p-2.5 rounded-lg">
                      ✓ Thank you! We added your address to our priority expansion radar.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {searchResult.status === 'invalid' && (
            <p className="text-xs text-rose-600 font-semibold mt-2 text-center">
              Please enter a valid 5-digit ZIP code.
            </p>
          )}

        </div>

        {/* Active Neighborhood Badges */}
        <div className="mt-12 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
            Active Routes in Boise, Garden City, & Foothills Neighborhoods:
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {SERVICE_AREAS.map((item) => (
              <button
                key={item.zip}
                onClick={() => {
                  setZipInput(item.zip);
                  setSearchResult({
                    status: 'found',
                    data: item,
                  });
                }}
                className="bg-stone-100 hover:bg-emerald-50 hover:border-emerald-300 border border-stone-200 text-stone-700 hover:text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="font-bold text-stone-900">{item.zip}</span>
                <span>•</span>
                <span>{item.area}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
