import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PricingCalculator } from './components/PricingCalculator';
import { ServiceAreaChecker } from './components/ServiceAreaChecker';
import { ValetTrackerDemo } from './components/ValetTrackerDemo';
import { TargetAudience } from './components/TargetAudience';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceQuote, BookingFormData } from './types';

// Centralized section IDs so child components and scroll targets can't drift out of sync.
const SECTION_IDS = {
  pricing: 'pricing',
  serviceAreas: 'service-areas',
  valetTracker: 'valet-tracker',
} as const;

const DEFAULT_QUOTE: ServiceQuote = {
  frequency: 'weekly',
  binCount: 2,
  driveway: 'standard',
  selectedAddons: ['photo_sms'],
  promoCode: '',
  promoDiscount: 0,
  baseMonthlyRate: 29,
  totalMonthlyRate: 29,
  perServiceRate: 7.25,
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingZip, setBookingZip] = useState('');
  const [activeQuote, setActiveQuote] = useState<ServiceQuote>(DEFAULT_QUOTE);
  const [activeCustomer, setActiveCustomer] = useState<BookingFormData | null>(null);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  const handleOpenBooking = useCallback((customQuote?: ServiceQuote) => {
    if (customQuote) {
      setActiveQuote(customQuote);
    }
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => setIsBookingOpen(false), []);

  const handleStartBookingWithZip = useCallback((zip: string) => {
    setBookingZip(zip);
    setIsBookingOpen(true);
  }, []);

  const handleSelectPlan = useCallback((quote: ServiceQuote) => {
    setActiveQuote(quote);
    setIsBookingOpen(true);
  }, []);

  const handleScrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleBookingComplete = useCallback((booking: BookingFormData) => {
    setActiveCustomer(booking);
    setIsBannerDismissed(false);
  }, []);

  const openBookingNoArgs = useCallback(() => handleOpenBooking(), [handleOpenBooking]);
  const scrollToPricing = useCallback(
    () => handleScrollToSection(SECTION_IDS.pricing),
    [handleScrollToSection]
  );
  const scrollToServiceAreas = useCallback(
    () => handleScrollToSection(SECTION_IDS.serviceAreas),
    [handleScrollToSection]
  );
  const scrollToValetTracker = useCallback(
    () => handleScrollToSection(SECTION_IDS.valetTracker),
    [handleScrollToSection]
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Active Service Notification Pill if homeowner booked */}
      {activeCustomer && !isBannerDismissed && (
        <div
          role="status"
          aria-live="polite"
          className="bg-emerald-900 text-white px-4 py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
          <span>
            Active Service Route: Welcome <strong>{activeCustomer.fullName}</strong>! Next
            collection roll-out scheduled for <strong>{activeCustomer.pickupDay}</strong>.
          </span>
          <button
            onClick={scrollToValetTracker}
            className="underline text-emerald-300 hover:text-white ml-2 cursor-pointer font-bold"
          >
            Open Live Tracker &rarr;
          </button>
          <button
            onClick={() => setIsBannerDismissed(true)}
            aria-label="Dismiss notification"
            className="ml-2 text-emerald-300 hover:text-white cursor-pointer text-sm leading-none"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        onOpenBooking={openBookingNoArgs}
        onCheckArea={scrollToServiceAreas}
        onOpenTracker={scrollToValetTracker}
      />

      {/* Hero Section with Interactive 24-Hour Cycle Simulator */}
      <Hero
        onOpenBooking={openBookingNoArgs}
        onCheckArea={scrollToServiceAreas}
        onExplorePricing={scrollToPricing}
      />

      {/* How It Works with Old vs New comparison */}
      <HowItWorks />

      {/* Interactive Pricing Calculator with Live Adjustments */}
      <PricingCalculator onSelectPlan={handleSelectPlan} />

      {/* Target Audiences: Who Needs Trash Valet */}
      <TargetAudience onSelectAudience={openBookingNoArgs} />

      {/* Interactive Neighborhood Coverage & Zip Code Checker */}
      <ServiceAreaChecker onStartBookingWithZip={handleStartBookingWithZip} />

      {/* Interactive Valet Tracker & Simulated SMS Smartphone Demo */}
      <ValetTrackerDemo />

      {/* Verified Neighborhood Reviews & Testimonials */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Footer */}
      <Footer onOpenBooking={openBookingNoArgs} onCheckArea={scrollToServiceAreas} />

      {/* Multi-step Booking & Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialQuote={activeQuote}
        initialZip={bookingZip}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
}
