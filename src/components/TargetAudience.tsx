import React from 'react';
import { 
  ShieldAlert, 
  Mountain, 
  HeartHandshake, 
  Home, 
  Briefcase, 
  CheckCheck,
  ChevronRight
} from 'lucide-react';

interface TargetAudienceProps {
  onSelectAudience: () => void;
}

export const TargetAudience: React.FC<TargetAudienceProps> = ({ onSelectAudience }) => {
  const audiences = [
    {
      id: 'driveways',
      icon: Mountain,
      iconBg: 'bg-amber-100 text-amber-700',
      title: 'Steep & Long Driveways',
      tag: 'Safety First',
      description: 'Dragging two 100-lb rolling bins down a 150-foot hill or icy slope in pitch darkness is an accident waiting to happen. Our valets use commercial grade safety equipment.',
      benefit: 'Zero slip risk, zero aching shoulders or back strain.'
    },
    {
      id: 'hoa',
      icon: ShieldAlert,
      iconBg: 'bg-rose-100 text-rose-700',
      title: 'Strict HOA Communities',
      tag: '100% Fine Prevention',
      description: 'Does your HOA fine homeowners $50 to $100 for cans visible from the street past 6:00 PM on collection day? Our valets return your bins promptly the same afternoon.',
      benefit: 'Pays for itself with just one avoided HOA violation fine.'
    },
    {
      id: 'seniors',
      icon: HeartHandshake,
      iconBg: 'bg-emerald-100 text-emerald-700',
      title: 'Seniors & Aging in Place',
      tag: 'Family Peace of Mind',
      description: 'Adult children love gifting Trash Valet to aging parents so they never have to push heavy containers down gravel or asphalt in bad weather.',
      benefit: 'Independence at home without dangerous physical chores.'
    },
    {
      id: 'airbnb',
      icon: Home,
      iconBg: 'bg-blue-100 text-blue-700',
      title: 'Airbnb & Short-Term Rentals',
      tag: 'Turnover Automated',
      description: 'Guests never remember trash day. Avoid smelly overflowing bins between guest check-ins with scheduled curbside valet and photo timestamps.',
      benefit: '5-star guest cleanliness reviews and seamless turnovers.'
    },
    {
      id: 'busy',
      icon: Briefcase,
      iconBg: 'bg-purple-100 text-purple-700',
      title: 'Busy Families & Commuters',
      tag: 'Reclaim Free Time',
      description: 'When juggling kids, careers, dinner, and late evening commutes, trash day is one more headache. Let us automate it completely for $1 a day.',
      benefit: 'One fewer household chore to argue about.'
    }
  ];

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Tailored For Your Lifestyle
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Who Needs Trash Valet?
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            From steep mountain drives to busy neighborhood HOAs, see why homeowners love our curbside service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-start gap-2 text-xs font-semibold text-emerald-800">
                    <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.benefit}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Call to action card */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl p-7 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                Special Offer
              </span>
              <h3 className="text-2xl font-bold mt-2 leading-snug">
                Try Your First Month Risk-Free
              </h3>
              <p className="text-emerald-100 text-sm mt-3 leading-relaxed">
                If you aren't completely delighted having your trash rolled out and back in on time every week, we'll refund 100% of your fee.
              </p>
            </div>

            <button
              onClick={onSelectAudience}
              className="mt-6 bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-sm py-3 px-5 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Get Your Free Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
