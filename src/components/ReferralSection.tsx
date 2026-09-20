import React, { useState } from 'react';
import { Users, Gift, Copy, Check, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ReferralSectionProps {
  onClaimDiscount: (code: string) => void;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({ onClaimDiscount }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'BOISE-NEIGHBOR-15';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="neighbor-referrals" className="py-16 bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 text-white relative overflow-hidden">
      {/* Decorative accent elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-stone-800/80 border border-emerald-500/30 rounded-2xl p-6 sm:p-10 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Offer Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Boise Neighborhood Cluster Program</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Give $15, Get $15 with the <span className="text-emerald-400">Neighbor Share</span>
              </h2>

              <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                When homes on the same street or HOA cul-de-sac share the valet route, our route density saves time and fuel. We pass those savings directly back to you and your neighbors!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-700/60">
                  <div className="text-emerald-400 font-bold text-lg mb-1">1. Share Code</div>
                  <p className="text-xs text-stone-400">Share your link or code with your next-door neighbor or HOA group.</p>
                </div>
                <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-700/60">
                  <div className="text-emerald-400 font-bold text-lg mb-1">2. They Get $15</div>
                  <p className="text-xs text-stone-400">Your neighbor instantly gets $15 off their first month subscription.</p>
                </div>
                <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-700/60">
                  <div className="text-emerald-400 font-bold text-lg mb-1">3. You Get $15</div>
                  <p className="text-xs text-stone-400">A $15 credit is applied directly to your next month’s bill for each neighbor.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Code card & Action */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-stone-900/90 border border-emerald-500/40 rounded-xl p-6 text-center space-y-5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Gift className="w-6 h-6" />
                </div>
                
                <div>
                  <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Community Welcome Discount Code</div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wider bg-stone-950 px-4 py-3 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                    <span>{referralCode}</span>
                    <button
                      onClick={handleCopy}
                      className="text-stone-400 hover:text-white p-1.5 rounded transition-colors"
                      title="Copy referral code"
                    >
                      {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-emerald-400 mt-1 font-medium">Copied to clipboard!</p>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onClaimDiscount('NEIGHBOR')}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>Claim $15 Neighbor Credit in Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    No limit on referrals. 3 neighbors = free service!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
