import { PlanAddon, Testimonial, FaqItem } from '../types';

export const SERVICE_ADDONS: PlanAddon[] = [
  {
    id: 'power_wash_sanitizing',
    name: 'Monthly Trash Can Power-Wash & High-Heat Sanitizing',
    priceMonthly: 19,
    pricePerService: 5,
    description: 'Professional 200°F high-pressure wash, biological degreaser scrub, and antimicrobial deodorizer applied monthly. Eliminates bacteria, grime, and foul summer bin stench.',
    iconName: 'Sparkles',
  },
  {
    id: 'sanitizing_spray',
    name: 'Can Odor Defense & Sanitizing Spray',
    priceMonthly: 12,
    pricePerService: 3,
    description: 'Eco-friendly citrus enzyme spray applied to bin interior monthly to eliminate maggots, flies, and stubborn foul odors.',
    iconName: 'SprayCan',
  },
  {
    id: 'handle_wipe',
    name: 'Sanitary Handle & Lid Wipe Down',
    priceMonthly: 8,
    pricePerService: 2,
    description: 'Disinfecting wipe down of grab handles and lids on every roll-back so your hands stay clean.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'photo_sms',
    name: 'Real-Time Photo Text Confirmation',
    priceMonthly: 0, // Included Free!
    pricePerService: 0,
    description: 'Instant SMS text message with a photo proof as soon as your bins are safely back behind the gate.',
    iconName: 'Camera',
  },
  {
    id: 'extra_box_haul',
    name: 'Cardboard Breakdown & Extra Bag Assist',
    priceMonthly: 15,
    pricePerService: 5,
    description: 'We flatten up to 5 Amazon boxes or haul 1 extra overflow yard bag beside your can on trash day.',
    iconName: 'PackageCheck',
  },
];

export const SERVICE_AREAS = [
  { zip: '83702', area: 'Boise North End / Downtown / Highlands', days: 'Monday & Thursday', active: true },
  { zip: '83714', area: 'Garden City / Chinden / Riverside', days: 'Tuesday & Friday', active: true },
  { zip: '83703', area: 'Collister / Northwest Boise', days: 'Monday & Wednesday', active: true },
  { zip: '83706', area: 'Southeast Boise / Barber Valley / BSU', days: 'Wednesday & Friday', active: true },
  { zip: '83712', area: 'East End / Warm Springs / Table Rock', days: 'Tuesday & Thursday', active: true },
  { zip: '83705', area: 'Boise Bench / Depot Bench / Vista', days: 'Monday & Thursday', active: true },
  { zip: '83704', area: 'West Valley / Boise Towne Square', days: 'Tuesday & Friday', active: true },
  { zip: '83709', area: 'Southwest Boise / Charter Pointe', days: 'Wednesday & Friday', active: true },
  { zip: '83713', area: 'West Boise / DeMeyer Park', days: 'Monday & Thursday', active: true },
  { zip: '83716', area: 'Harris Ranch / Columbia Village', days: 'Tuesday & Friday', active: true },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Margaret & Dale Thornton',
    neighborhood: 'Boise North End (Harrison Blvd)',
    rating: 5,
    role: 'Retired Homeowners (Ages 74 & 77)',
    comment: 'Our North End driveway is sloped with stone pavers that get treacherous with winter ice and snow. Rolling heavy 96-gallon cans down to the curb was a serious slip risk for Dale. Trash Valet has been an absolute lifesaver. Never missed a single Tuesday in 14 months.',
    highlight: 'Eliminated winter ice driveway hazard'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    neighborhood: 'Harris Ranch HOA (East Boise)',
    rating: 5,
    role: 'HOA Community Member & Tech Lead',
    comment: 'Our Harris Ranch HOA strictly enforces that trash, recycle, and compost carts cannot remain in the alley or curb past 8 PM on pickup day. When working late, I used to get warning notices. Trash Valet rolls them back behind our cedar fence by 2 PM like clockwork.',
    highlight: 'Zero HOA warnings in over a year'
  },
  {
    id: '3',
    name: 'Sarah Chen-Kline',
    neighborhood: 'Riverside / Garden City',
    rating: 5,
    role: 'Mother of Three & Greenbelt Resident',
    comment: 'Between school drop-offs and managing work, remembering whether tomorrow is Republic Services blue recycling or compost cart day was a weekly scramble. Trash Valet manages all 3 carts invisibly. Best local service we subscribe to in Garden City.',
    highlight: 'Pure peace of mind on Sunday evenings'
  },
  {
    id: '4',
    name: 'Austin Miller',
    neighborhood: 'Downtown Boise / East End',
    rating: 5,
    role: 'Superhost Managing 3 Short-Term Rentals',
    comment: 'Guests NEVER remember to roll bins out to the street before Thursday morning pickup. Trash Valet ensures cans are never overflowing between guest turnovers. The photo verification text gives me proof for remote property management.',
    highlight: 'Essential for Boise Airbnb turnovers'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'service',
    question: 'How does the two-way roll-out and roll-back work in Boise & Garden City?',
    answer: 'It is a complete round-trip service. The evening before your Republic Services / municipal collection day (between 5:00 PM and 9:30 PM), our uniformed valet visits your home and rolls your trash, blue recycling, and yard compost carts to the curb in the designated orientation with 3-foot clearance. Then, on collection day in the afternoon (after the city truck has emptied them), we return to roll your empty carts back to their designated spot behind your gate or garage.',
  },
  {
    category: 'schedule',
    question: 'What if holiday schedules shift Republic Services collection by 24 hours?',
    answer: 'We automatically track City of Boise & Garden City holiday adjustments, Republic Services weather delays, and municipal hauler schedule updates. If holidays like Memorial Day, 4th of July, Thanksgiving, Christmas, or New Year shift collection by one day, our valet route shifts automatically—you never have to worry.',
  },
  {
    category: 'property',
    question: 'What if my bins are kept behind a closed or locked fence gate?',
    answer: 'When signing up, you provide access notes (e.g., "Wooden side gate with latch" or a keypad code). Our valets are background-checked, insured, and respect your privacy. We make sure gates are latched and secure after every visit to ensure pets and children stay safe inside.',
  },
  {
    category: 'billing',
    question: 'How does credit card billing and payment work?',
    answer: 'You can securely enter your credit card, debit card, Apple Pay, or Google Pay during checkout. Your card is billed once monthly with zero contracts. You can pause or cancel anytime, and we back every service with a 100% Punctuality Guarantee.',
  },
  {
    category: 'billing',
    question: 'Is there a long-term contract or cancellation fee?',
    answer: 'Never! Our subscriptions are month-to-month. You can pause service when traveling for summer vacation, or cancel at any time with a single click or text message. No setup fees, no cancellation fees, no hidden surcharges.',
  },
  {
    category: 'service',
    question: 'How does the Monthly Trash Can Power-Wash & Sanitizing add-on work?',
    answer: 'Once per month immediately following trash collection, our mobile sanitation unit cleans your empty carts using 200°F high-pressure wash, eco-friendly biological degreasers, and hospital-grade antimicrobial deodorizers. It removes sticky food sludge, maggots, flies, and foul odors, leaving your cans looking brand new and smelling fresh.',
  },
  {
    category: 'billing',
    question: 'How does the Neighbor Referral $15 discount work?',
    answer: 'When you share code BOISE-NEIGHBOR-15 with any neighbor on your street or in your HOA, they immediately get $15 off their first month. Once they subscribe, you automatically receive a $15 credit toward your next bill. If 3 neighbors on your street join, your service for that month is virtually free!',
  },
  {
    category: 'service',
    question: 'What if I have an exceptionally steep, gravel, or long driveway?',
    answer: 'We service all driveway types! Standard flat driveways are included in our base rate. For driveways over 75 feet or steep hill grades, we have a nominal adjustment ($10/mo) and our valets utilize dual-can towing hitches or motorized dollies for safety.',
  },
  {
    category: 'property',
    question: 'Are your valets insured and background-checked?',
    answer: 'Yes, 100%. All of our team members pass comprehensive multi-state criminal background checks, motor vehicle background checks, and are covered by our $2,000,000 general liability policy while on your property.',
  },
  {
    category: 'schedule',
    question: 'Can I request one-time service for vacations or surgery recovery?',
    answer: 'Yes! We offer "Vacation & Recovery" one-time weekly passes ($15/week). Perfect if you are heading out on a trip, recovering from an injury/surgery, or expecting house guests.',
  },
];
