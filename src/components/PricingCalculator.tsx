import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Tag, 
  Trash2, 
  Home, 
  Compass, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { ServiceFrequency, DrivewayType, ServiceQuote } from '../types';
import { SERVICE_ADDONS } from '../data/mockData';

interface PricingCalculatorProps {
  onSelectPlan: (quote: ServiceQuote) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSelectPlan }) => {
  const [frequency, setFrequency] = useState<ServiceFrequency>('weekly');
  const [binCount, setBinCount] = useState<number>(2);
  const [driveway, setDriveway] = useState<DrivewayType>('standard');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['photo_sms']);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: 'fixed' | 'percent' } | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  // Calculate pricing
  const quote = useMemo<ServiceQuote>(() => {
    // Base rates
    let base = 0;
    if (frequency === 'weekly') base = 29;
    else if (frequency === 'biweekly') base = 22;
    else if (frequency === 'vacation') base = 35; // e.g. 2-week block or $15/wk base
    else if (frequency === 'airbnb') base = 39; // high priority turnover

    // Bin adjustments (2 cans is standard baseline)
    let binAdjustment = 0;
    if (binCount === 1) binAdjustment = -4;
    else if (binCount === 2) binAdjustment = 0;
    else if (binCount === 3) binAdjustment = 8;
    else if (binCount >= 4) binAdjustment = 16;

    // Driveway adjustment
    let drivewayAdj = 0;
    if (driveway === 'long') drivewayAdj = 10;
    else if (driveway === 'steep') drivewayAdj = 12;

    // Addons
    let addonsTotal = 0;
    selectedAddonIds.forEach(id => {
      const addon = SERVICE_ADDONS.find(a => a.id === id);
      if (addon) {
        addonsTotal += addon.priceMonthly;
      }
    });

    const subtotal = Math.max(15, base + binAdjustment + drivewayAdj + addonsTotal);

    let discount = 0;
    if (appliedPromo) {
      if (appliedPromo.type === 'fixed') {
        discount = appliedPromo.discount;
      } else if (appliedPromo.type === 'percent') {
        discount = Math.round((subtotal * appliedPromo.discount) / 100);
      }
    }

    const totalMonthly = Math.max(10, subtotal - discount);
    const tripsPerMonth = frequency === 'weekly' ? 4 : frequency === 'biweekly' ? 2 : 4;
    const perService = Number((totalMonthly / tripsPerMonth).toFixed(2));

    return {
      frequency,
      binCount,
      driveway,
      selectedAddons: selectedAddonIds,
      promoCode: appliedPromo?.code || '',
      promoDiscount: discount,
      baseMonthlyRate: base + binAdjustment + drivewayAdj,
      totalMonthlyRate: totalMonthly,
      perServiceRate: perService,
    };
  }, [frequency, binCount, driveway, selectedAddonIds, appliedPromo]);

  const toggleAddon = (id: string) => {
    if (id === 'photo_sms') return; // Free included
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter(item => item !== id));
    } else {
      setSelectedAddonIds([...selectedAddonIds, id]);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'FIRSTMONTH' || code === 'HOAFREE') {
      setAppliedPromo({ code, discount: 10, type: 'fixed' });
    } else if (code === 'NEIGHBOR' || code === 'SAVE15') {
      setAppliedPromo({ code, discount: 15, type: 'percent' });
    } else {
      setPromoError('Invalid coupon code. Try "FIRSTMONTH" for $10 off.');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Customize Your Curbside Plan
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            No contracts, no hidden surcharges. Customize your bin count and schedule with instant live pricing.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-8">
            
            {/* 1. Service Frequency */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-3 flex items-center justify-between">
                <span>1. Select Service Schedule</span>
                <span className="text-xs font-normal text-stone-500">Cancel or pause anytime</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'weekly', label: 'Weekly', sub: 'Standard service', popular: true },
                  { id: 'biweekly', label: 'Bi-Weekly', sub: 'Every other week' },
                  { id: 'airbnb', label: 'Airbnb / Rental', sub: 'Priority turnover' },
                  { id: 'vacation', label: 'Vacation Pass', sub: 'While you travel' },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`freq-btn-${item.id}`}
                    type="button"
                    onClick={() => setFrequency(item.id as ServiceFrequency)}
                    className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      frequency === item.id
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute -top-2.5 right-2 bg-emerald-700 text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
                        Popular
                      </span>
                    )}
                    <span className="font-bold text-sm">{item.label}</span>
                    <span className="text-[11px] text-stone-500 mt-1">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Number of Cans */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-stone-900">
                  2. Number of Cans (Trash / Recycle / Yard)
                </label>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {binCount === 1 ? '1 Can (Trash)' : binCount === 2 ? '2 Cans (Trash + Recycling)' : `${binCount} Cans (Trash + Recycling + Yard)`}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    id={`bincount-btn-${num}`}
                    type="button"
                    onClick={() => setBinCount(num)}
                    className={`py-3 px-3 rounded-xl border font-bold text-sm flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      binCount === num
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-0.5">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-base font-extrabold">{num}</span>
                    </div>
                    <span className="text-[10px] font-normal opacity-90">
                      {num === 1 ? 'Single Can' : num === 2 ? 'Most Homes' : num === 3 ? 'Large Home' : 'Estate / Multi'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Driveway Length / Slope */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-3">
                3. Driveway Length & Terrain
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard', title: 'Standard Driveway', note: 'Under 75 ft, flat or gentle slope', price: '+$0' },
                  { id: 'long', title: 'Long Driveway', note: '75 ft to 200+ ft long', price: '+$10/mo' },
                  { id: 'steep', title: 'Steep Hill / Slope', note: 'Heavy incline or stairs', price: '+$12/mo' },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`driveway-btn-${item.id}`}
                    type="button"
                    onClick={() => setDriveway(item.id as DrivewayType)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      driveway === item.id
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{item.title}</span>
                        <span className="text-xs font-semibold text-stone-500">{item.price}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{item.note}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Optional Upgrades & Add-ons */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-3">
                4. Select Optional Add-ons
              </label>

              <div className="space-y-2.5">
                {SERVICE_ADDONS.map((addon) => {
                  const isSelected = selectedAddonIds.includes(addon.id);
                  const isFree = addon.priceMonthly === 0;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 border ${
                          isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900">{addon.name}</span>
                            {isFree && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded uppercase">
                                Free with all plans
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5 max-w-md">{addon.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-2">
                        <span className="text-sm font-extrabold text-stone-900">
                          {isFree ? 'FREE' : `+$${addon.priceMonthly}/mo`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quote Summary Box (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-600/30 shadow-xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Box Title */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Instant Quote Summary
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900">
                    Your Personalized Rate
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Plan spec line items */}
              <div className="space-y-3 text-sm text-stone-600 mb-6">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Frequency:</span>
                  <span className="font-bold text-stone-900 capitalize">{frequency} ({frequency === 'weekly' ? '4 visits/mo' : '2 visits/mo'})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Bins:</span>
                  <span className="font-bold text-stone-900">{binCount} {binCount === 1 ? 'Can' : 'Cans'} (Round-trip)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Driveway:</span>
                  <span className="font-bold text-stone-900 capitalize">{driveway} Terrain</span>
                </div>

                {selectedAddonIds.length > 1 && (
                  <div className="py-1 border-b border-stone-100">
                    <div className="flex justify-between font-semibold text-stone-800 mb-1">
                      <span>Included Add-ons:</span>
                    </div>
                    {selectedAddonIds.filter(id => id !== 'photo_sms').map(id => {
                      const addon = SERVICE_ADDONS.find(a => a.id === id);
                      return (
                        <div key={id} className="flex justify-between text-xs text-stone-500 pl-2">
                          <span>• {addon?.name}</span>
                          <span>+${addon?.priceMonthly}/mo</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {appliedPromo && (
                  <div className="flex justify-between py-1 text-emerald-700 font-bold bg-emerald-50 px-2 rounded">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Promo: {appliedPromo.code}
                    </span>
                    <span>-${quote.promoDiscount} OFF</span>
                  </div>
                )}
              </div>

              {/* Big Price Display */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-6 text-center">
                <div className="text-xs uppercase font-bold text-stone-500 tracking-wider">
                  Total Monthly Investment
                </div>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-stone-900">
                    ${quote.totalMonthlyRate}
                  </span>
                  <span className="text-stone-500 font-medium text-sm">/ month</span>
                </div>
                <p className="text-xs font-semibold text-emerald-800">
                  Only ~${quote.perServiceRate} per service visit • Just ~${(quote.totalMonthlyRate / 30).toFixed(2)} / day
                </p>
              </div>

              {/* Promo code box */}
              <form onSubmit={handleApplyPromo} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="promo-code-input"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Promo Code (e.g. FIRSTMONTH)"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{promoError}</p>
                )}
              </form>

              {/* Action Button */}
              <button
                id="book-this-plan-btn"
                type="button"
                onClick={() => onSelectPlan(quote)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Service With This Plan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust Guarantees under button */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-1 text-[11px] text-stone-500 font-medium text-center">
                <div className="flex items-center justify-center gap-1.5 text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No contracts • Cancel or pause anytime</span>
                </div>
                <div>First month satisfaction guarantee or 100% refunded</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
