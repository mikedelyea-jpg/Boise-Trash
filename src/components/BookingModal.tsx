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
  Check
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required for photo text updates';
    if (!formData.streetAddress.trim()) errs.streetAddress = 'Street address is required';
    if (!formData.zipCode.trim() || formData.zipCode.length < 5) errs.zipCode = 'Valid 5-digit zip code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmitOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success view
      // Save locally
      try {
        const existing = JSON.parse(localStorage.getItem('trash_valet_bookings') || '[]');
        existing.push({ ...formData, bookedAt: new Date().toISOString() });
        localStorage.setItem('trash_valet_bookings', JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }
      onBookingComplete?.(formData);
    }, 900);
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

          {/* STEP 3: Review & Final Confirmation */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="text-lg font-bold text-stone-900">Review & Confirm Service</h4>
                <p className="text-xs text-stone-500">No payment charged right now — pay after your first successful pickup.</p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200 font-bold text-stone-900">
                  <span>Selected Plan:</span>
                  <span className="text-emerald-800 uppercase tracking-wide text-xs bg-emerald-100 px-2 py-0.5 rounded">
                    {formData.frequency} Service
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                  <div><strong>Address:</strong> {formData.streetAddress}, {formData.zipCode}</div>
                  <div><strong>Contact:</strong> {formData.fullName} ({formData.phone})</div>
                  <div><strong>Pickup Day:</strong> {formData.pickupDay} (Round-trip)</div>
                  <div><strong>Bins:</strong> {initialQuote.binCount} Bins ({initialQuote.driveway} driveway)</div>
                  <div><strong>Storage:</strong> {formData.binLocationNotes}</div>
                  <div><strong>Photo Alerts:</strong> SMS Enabled (Free)</div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-extrabold text-stone-900 text-base">Monthly Rate:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-stone-900">${initialQuote.totalMonthlyRate}</span>
                    <span className="text-xs text-stone-500"> / month</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-stone-700 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>The Trash Valet Promise:</span>
                </div>
                <div>• Zero contracts — pause or cancel anytime with 1 click</div>
                <div>• 100% Punctuality Guarantee: If we ever miss your cans, that entire month is free</div>
                <div>• First payment invoiced securely via email/SMS after your first week of service</div>
              </div>

              <div className="pt-4 flex justify-between items-center">
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
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Route...</span>
                  ) : (
                    <>
                      <span>Confirm & Activate Valet</span>
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

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 max-w-md mx-auto text-xs text-stone-600 text-left space-y-1">
                <div className="font-bold text-stone-900">What Happens Next:</div>
                <div>1. Our route dispatcher reviews your gate instructions.</div>
                <div>2. You'll get an SMS reminder the afternoon before your first roll-out.</div>
                <div>3. Relax inside—we take care of the rest!</div>
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
