import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Real Neighborhood Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Loved By Homeowners Across The Area
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-stone-600 font-semibold text-sm">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span><strong>4.9 / 5.0 Average</strong> based on 180+ verified neighborhood households</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-stone-50 rounded-2xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between relative group hover:border-emerald-300 transition-all"
            >
              <div>
                {/* Highlight Badge */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{review.highlight}</span>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
                    {review.name}
                  </h4>
                  <div className="text-xs text-stone-500 font-medium">
                    {review.neighborhood} • {review.role}
                  </div>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust Seal */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xl shrink-0">
              100%
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                Our Curbside Punctuality Guarantee
              </h4>
              <p className="text-xs text-stone-600">
                If we ever miss rolling out your cans before pickup, your entire month is on us. No questions asked.
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider bg-emerald-200/70 px-3 py-1.5 rounded-lg shrink-0">
            Backed By Policy
          </span>
        </div>

      </div>
    </section>
  );
};
