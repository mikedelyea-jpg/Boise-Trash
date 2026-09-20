export type ServiceFrequency = 'weekly' | 'biweekly' | 'vacation' | 'airbnb';

export type DrivewayType = 'standard' | 'long' | 'steep';

export interface PlanAddon {
  id: string;
  name: string;
  priceMonthly: number;
  pricePerService: number;
  description: string;
  iconName: string;
}

export interface ServiceQuote {
  frequency: ServiceFrequency;
  binCount: number;
  driveway: DrivewayType;
  selectedAddons: string[];
  promoCode: string;
  promoDiscount: number;
  baseMonthlyRate: number;
  totalMonthlyRate: number;
  perServiceRate: number;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  gateCodeOrInstructions: string;
  binLocationNotes: string;
  pickupDay: string;
  frequency: ServiceFrequency;
  binCount: number;
  driveway: DrivewayType;
  addons: string[];
  startDate: string;
  specialRequests?: string;
  paymentMethod?: 'credit_card' | 'apple_pay' | 'google_pay' | 'stripe_checkout';
  cardLast4?: string;
  cardExp?: string;
  referredByNeighbor?: string;
  referralCode?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  rating: number;
  role: string;
  comment: string;
  avatarUrl?: string;
  highlight: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'service' | 'schedule' | 'billing' | 'property';
}
