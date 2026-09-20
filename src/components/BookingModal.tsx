import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  Camera, 
  Check,
  CreditCard,
  Building,
  KeyRound,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ServiceQuote, BookingFormData } from '../types';
import { SERVICE_ADDONS } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuote: ServiceQuote;
  initialZip?: string;
  onBookingComplete?: (booking: BookingFormData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialQuote,
  initialZip = '',
  onBookingComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: 'Boise',
    zipCode: initialZip || '83702',
    gateCodeOrInstructions: '',
    binLocationNotes: 'Side of garage behind the wooden gate',
    pickupDay: 'Tuesday',
    frequency: initialQuote.frequency,
    binCount: initialQuote.binCount,
    driveway: initialQuote.driveway,
    addons: initialQuote.selectedAddons,
    startDate: 'Next Available Pickup Day',
    specialRequests: '',
    paymentMethod: 'credit_card',
  });

  // Credit Card & Stripe state
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'stripe_checkout' | 'apple_pay' | 'google_pay'>('stripe_checkout');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardZip, setCardZip] = useState(initialZip || '83702');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeError, setStripeError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = clean.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 2) {
      setCardExp(`${clean.slice(0, 2)}/${clean.slice(2)}`);
    } else {
      setCardExp(clean);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(clean);
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required for photo text updates';
    if (!formData.streetAddress.trim()) errs.streetAddress = 'Street address is required';
    if (!formData.zipCode.trim() || formData.zipCode.length < 5) errs.zipCode = 'Valid 5-digit zip code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3Payment = () => {
    const errs: Record<string, string> = {};
    if (paymentMethod === 'credit_card') {
      const rawCard = cardNumber.replace(/\s/g, '');
      if (!rawCard || rawCard.length < 15) {
        errs.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!cardExp || cardExp.length < 5) {
        errs.cardExp = 'Valid MM/YY required';
      }
      if (!cardCvc || cardCvc.length < 3) {
        errs.cardCvc = 'CVC required';
      }
      if (!cardName.trim()) {
        errs.cardName = 'Name on card required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      if (!cardName && formData.fullName) {
        setCardName(formData.fullName);
      }
      if (!cardZip && formData.zipCode) {
        setCardZip(formData.zipCode);
      }
      setStep(3);
    }
  };

  const handleStripeCheckout = async () => {
    setIsSubmitting(true);
    setStripeError('');

    try {
      // 1. Save user's booking details to local storage so they don't lose anything
      try {
        const existing = JSON.parse(localStorage.getItem('trash_valet_pending_booking') || '{}');
        localStorage.setItem('trash_valet_pending_booking', JSON.stringify({
          ...formData,
          quote: initialQuote,
          savedAt: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Failed to cache pending booking', e);
      }

      // 2. Call Netlify Serverless Function with full dynamic quote breakdown
      const payload = {
        quote: initialQuote,
        formData,
      };

      let response: Response | null = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!response || !response.ok) {
        // Fallback directly to /.netlify/functions path in case /api/ rewrite is not yet active
        const fallbackRes = await fetch('/.netlify/functions/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => null);
        
        if (fallbackRes && fallbackRes.ok) {
          response = fallbackRes;
        }
      }

      if (!response || !response.ok) {
        const errorData = response ? await response.json().catch(() => ({})) : {};
        throw new Error(errorData.error || (response ? `Checkout service returned HTTP ${response.status}` : 'Could not reach Stripe checkout server.'));
      }

      const data = await response.json();
      if (data.url) {
        // Redirect to Stripe's secure checkout page
        window.location.href = data.url;
      } else {
        throw new Error('Stripe session did not provide a redirect URL.');
      }
    } catch (err: any) {
      console.error('Stripe Checkout Error:', err);
      setStripeError(err?.message || 'Could not connect to Stripe checkout. Please try again or reserve without payment.');
      setIsSubmitting(false);
    }
  };

  const handleSubmitOrder = () => {
    if (paymentMethod === 'stripe_checkout' || paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') {
      handleStripeCheckout();
      return;
    }

    if (!validateStep3Payment()) return;

    setIsSubmitting(true);
    const rawCard = cardNumber.replace(/\s/g, '');
    const last4 = rawCard.slice(-4) || '4242';

    const completeBooking: BookingFormData = {
      ...formData,
      paymentMethod,
      cardLast4: last4,
      cardExp: cardExp || '12/28',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success view
      // Save locally
      try {
        const existing = JSON.parse(localStorage.getItem('trash_valet_bookings') || '[]');
        existing.push({ ...completeBooking, bookedAt: new Date().toISOString() });
        localStorage.setItem('trash_valet_bookings', JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }
      onBookingComplete?.(completeBooking);
    }, 950);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl border border-stone-200 shadow-2xl overflow-hidden my-8 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">
              TV
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">
                {step === 4 ? 'Welcome to Effortless Trash Days!' : 'Start Your Curbside Valet Service'}
              </h3>
              <p className="text-xs text-stone-400">
                {step === 4 ? 'Your route is booked and verified' : `Step ${step} of 3 • Quick 2-minute setup`}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (for steps 1-3) */}
        {step < 4 && (
          <div className="w-full bg-stone-100 h-1.5 flex">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          
          {/* STEP 1: Address & Contact */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-lg font-bold text-stone-900">Your Contact & Home Address</h4>
                <p className="text-xs text-stone-500">We need your cell phone number to send your photo confirmations.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="booking-fullname"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Margaret Thornton"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.fullName && <span className="text-[11px] text-rose-600 font-medium">{errors.fullName}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Cell Phone (for SMS Photo Proof) *</label>
                  <input
                    type="tel"
                    id="booking-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.phone && <span className="text-[11px] text-rose-600 font-medium">{errors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email Address (for receipts)</label>
                <input
                  type="email"
                  id="booking-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  id="booking-address"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  placeholder="e.g. 1105 N 8th St"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.streetAddress && <span className="text-[11px] text-rose-600 font-medium">{errors.streetAddress}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Boise">Boise, ID</option>
                    <option value="Garden City">Garden City, ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    id="booking-zip"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.zipCode && <span className="text-[11px] text-rose-600 font-medium">{errors.zipCode}</span>}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  id="booking-step1-next"
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue: Schedule & Can Spot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Can Location & Access Details */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-lg font-bold text-stone-900">Your Trash Schedule & Can Location</h4>
                <p className="text-xs text-stone-500">So our valet knows exact pickup days and where your cans are kept.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Weekly Collection Day *</label>
                  <select
                    value={formData.pickupDay}
                    onChange={(e) => setFormData({ ...formData, pickupDay: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Monday">Monday (Roll-out Sunday eve)</option>
                    <option value="Tuesday">Tuesday (Roll-out Monday eve)</option>
                    <option value="Wednesday">Wednesday (Roll-out Tuesday eve)</option>
                    <option value="Thursday">Thursday (Roll-out Wednesday eve)</option>
                    <option value="Friday">Friday (Roll-out Thursday eve)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Service Start Timing</label>
                  <select
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Next Available Pickup Day">Upcoming Trash Day (This Week)</option>
                    <option value="Next Week">Starting Next Week</option>
                    <option value="Specific Vacation Window">Vacation Dates Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Where do you keep your cans? *
                </label>
                <input
                  type="text"
                  value={formData.binLocationNotes}
                  onChange={(e) => setFormData({ ...formData, binLocationNotes: e.target.value })}
                  placeholder="e.g. Left side of garage behind wooden fence latch"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Gate Code, Lock Notes, or Pet Alerts (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.gateCodeOrInstructions}
                  onChange={(e) => setFormData({ ...formData, gateCodeOrInstructions: e.target.value })}
                  placeholder="e.g. Gate code is #1234. Golden retriever is kept indoors on trash days."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Privacy & Security Commitment:</span> Your gate codes and property instructions are encrypted and provided only to your assigned valet during scheduled visits.
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-stone-600 hover:text-stone-900 font-bold text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  id="booking-step2-next"
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Review & Lock In Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Final Confirmation with Secure Payment */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-lg font-bold text-stone-900">Payment & Service Activation</h4>
                <p className="text-xs text-stone-500">Enter your card info to activate your curbside valet route. 100% money-back guarantee.</p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200 font-bold text-stone-900">
                  <span>Selected Plan:</span>
                  <span className="text-emerald-800 uppercase tracking-wide text-xs bg-emerald-100 px-2.5 py-0.5 rounded-md font-extrabold">
                    {formData.frequency} Service
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                  <div><strong>Address:</strong> {formData.streetAddress}, {formData.zipCode}</div>
                  <div><strong>Contact:</strong> {formData.fullName} ({formData.phone})</div>
                  <div><strong>Pickup Day:</strong> {formData.pickupDay} (Round-trip)</div>
                  <div><strong>Bins:</strong> {initialQuote.binCount} Cans ({initialQuote.driveway} driveway)</div>
                  <div><strong>Bin Location:</strong> {formData.binLocationNotes}</div>
                  <div><strong>SMS Photo Proof:</strong> Included Free</div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <div>
                    <span className="font-extrabold text-stone-900 text-base">Monthly Total:</span>
                    <span className="block text-[11px] text-stone-500">Billed monthly • Pause or cancel anytime</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-stone-900">${initialQuote.totalMonthlyRate}</span>
                    <span className="text-xs font-semibold text-stone-500"> / month</span>
                  </div>
                </div>
              </div>

              {/* Secure Credit Card Payment Section */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-stone-900">Payment Information</h5>
                      <span className="text-[11px] text-stone-500">Encrypted 256-bit SSL transaction</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>Secure Checkout</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Card / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe_checkout')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'stripe_checkout'
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-600'
                        : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="font-extrabold text-[#635BFF]">stripe</span>
                    <span>Checkout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span> Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'google_pay'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>G Pay</span>
                  </button>
                </div>

                {paymentMethod === 'stripe_checkout' ? (
                  <div className="p-5 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-indigo-900 text-sm">Stripe Hosted Subscription Checkout</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded">
                        Stripe 1-Click
                      </span>
                    </div>
                    <p className="text-xs text-indigo-900/80 leading-relaxed">
                      You will be securely routed through Stripe's verified PCI-DSS level 1 subscription portal. Supports Apple Pay, Google Pay, Bank Debit, and all major cards with automatic monthly renewal and zero contract lock-ins.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-indigo-950 font-semibold bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                      <ShieldCheck className="w-4 h-4 text-[#635BFF] shrink-0" />
                      <span>Instant receipt emailed & automatic route activation sent to dispatch@boisetrashvalet.com</span>
                    </div>
                  </div>
                ) : paymentMethod === 'credit_card' ? (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="booking-card-name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="First and Last Name"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {errors.cardName && <span className="text-[11px] text-rose-600 font-medium">{errors.cardName}</span>}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-stone-700">Card Number *</label>
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-stone-400">
                          <span>Visa</span>
                          <span>•</span>
                          <span>Mastercard</span>
                          <span>•</span>
                          <span>Amex</span>
                          <span>•</span>
                          <span>Discover</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="booking-card-number"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4242 •••• •••• 4242"
                          maxLength={19}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-mono font-semibold tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <CreditCard className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      </div>
                      {errors.cardNumber && <span className="text-[11px] text-rose-600 font-medium">{errors.cardNumber}</span>}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Expiration *</label>
                        <input
                          type="text"
                          id="booking-card-exp"
                          value={cardExp}
                          onChange={handleExpChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-semibold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {errors.cardExp && <span className="text-[11px] text-rose-600 font-medium">{errors.cardExp}</span>}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-xs font-bold text-stone-700">CVC / CVV *</label>
                          <Lock className="w-3 h-3 text-stone-400" />
                        </div>
                        <input
                          type="password"
                          id="booking-card-cvc"
                          value={cardCvc}
                          onChange={handleCvcChange}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-semibold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {errors.cardCvc && <span className="text-[11px] text-rose-600 font-medium">{errors.cardCvc}</span>}
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-stone-700 mb-1">Billing ZIP</label>
                        <input
                          type="text"
                          id="booking-card-zip"
                          value={cardZip}
                          onChange={(e) => setCardZip(e.target.value)}
                          placeholder="83702"
                          maxLength={5}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 px-4 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-2">
                    <p className="text-xs text-stone-600">
                      {paymentMethod === 'apple_pay'
                        ? 'Apple Pay will authorize instantly when you click the confirmation button below.'
                        : 'Google Pay will prompt for one-tap verification when you click below.'}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold bg-emerald-100/70 px-3 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Biometric FaceID / Fingerprint Checkout</span>
                    </div>
                  </div>
                )}
              </div>

              {stripeError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Checkout Notice</span>
                  </div>
                  <p>{stripeError}</p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleStripeCheckout()}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      Retry Stripe Checkout
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('credit_card');
                        setStripeError('');
                      }}
                      className="bg-white border border-rose-300 text-rose-800 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-rose-50 cursor-pointer"
                    >
                      Switch to Direct Card Entry
                    </button>
                  </div>
                </div>
              )}

              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-stone-700 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>The Boise Trash Valet Guarantee:</span>
                </div>
                <div>• <strong>No lock-in contracts:</strong> Pause or cancel anytime online or via text.</div>
                <div>• <strong>100% Punctuality Guarantee:</strong> If we ever fail to roll your cans out in time for municipal pickup, that entire month is refunded free.</div>
                <div>• <strong>SMS Dispatch:</strong> You receive an automatic timestamped photo every time your cans are placed curbside and returned.</div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-stone-600 hover:text-stone-900 font-bold text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  id="confirm-booking-final-btn"
                  disabled={isSubmitting}
                  onClick={handleSubmitOrder}
                  className={`font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer ${
                    paymentMethod === 'stripe_checkout'
                      ? 'bg-[#635BFF] hover:bg-[#5349e4] text-white shadow-indigo-600/25'
                      : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-emerald-600/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{paymentMethod === 'stripe_checkout' ? 'Redirecting to Stripe...' : 'Processing Card...'}</span>
                    </span>
                  ) : paymentMethod === 'stripe_checkout' ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay with Stripe • ${initialQuote.totalMonthlyRate}/mo</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize & Start Valet (${initialQuote.totalMonthlyRate}/mo)</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Celebration */}
          {step === 4 && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-stone-900">You're On The Route!</h4>
                <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
                  Congratulations, {formData.fullName || 'Neighbor'}! Your curbside trash valet service is active.
                </p>
              </div>

              {/* Simulated Welcome SMS */}
              <div className="bg-stone-900 text-white rounded-2xl p-5 text-left max-w-md mx-auto text-xs border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold pb-2 border-b border-stone-800">
                  <span>📱 Incoming SMS Confirmation</span>
                  <span>Just Now</span>
                </div>
                <p className="text-stone-200 leading-relaxed">
                  "Trash Valet: Hi {formData.fullName || 'there'}! Your route is confirmed for <strong>{formData.pickupDay} collections</strong> at <strong>{formData.streetAddress}</strong>. 
                  We will roll your cans out the evening before pickup. You'll receive a photo text as soon as they are curbside!"
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 max-w-md mx-auto text-xs text-stone-600 text-left space-y-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
                  <span className="font-bold text-stone-900">Payment Status:</span>
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Card Authorized (•••• {cardNumber.replace(/\s/g, '').slice(-4) || '4242'})</span>
                  </span>
                </div>
                <div className="font-bold text-stone-900 pt-1">What Happens Next:</div>
                <div>1. Our route dispatcher assigns your local Boise/Garden City valet.</div>
                <div>2. You'll receive a text reminder the evening before your scheduled pickup day.</div>
                <div>3. Relax inside — we take care of the heavy rolling both ways!</div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  id="done-booking-btn"
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Done • Back to Website
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
