import { SERVICE_ADDONS, SERVICE_AREAS, TESTIMONIALS, FAQS } from '../data/mockData';

/**
 * JSON-LD Schema.org Structured Data generator for Boise Trash Valet.
 * Configures LocalBusiness, FAQPage, and Review schemas for rich Google Search results
 * matching the live domain 'boisetrashvalet.com'.
 */

const BUSINESS_NAME = 'Trash Valet Boise';
const LEGAL_NAME = 'Boise Curbside Trash Valet Services LLC';
const SITE_URL = 'https://boisetrashvalet.com';
const PHONE = '+1-208-286-4550';
const CITY = 'Boise';
const STATE = 'ID';
const POSTAL_CODE = '83702';

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildLocalBusinessSchema() {
  const avgRating =
    TESTIMONIALS.length > 0
      ? Number((TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length).toFixed(1))
      : 5.0;

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    telephone: PHONE,
    email: 'help@boisetrashvalet.com',
    priceRange: '$$',
    description:
      'Professional residential curbside trash can roll-out and roll-back service in Boise and Garden City, Idaho. We ensure your garbage, recycling, and compost carts make it to the curb before pickup and return behind your gate afterward.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: CITY,
      addressRegion: STATE,
      postalCode: POSTAL_CODE,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.6150',
      longitude: '-116.2023',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:00',
        closes: '21:30',
      },
    ],
    areaServed: SERVICE_AREAS.filter((a) => a.active).map((a) => ({
      '@type': 'PostalCodeRangeSpecification',
      description: a.area,
      postalCode: a.zip,
      addressCountry: 'US',
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Curbside Trash Valet Services & Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Weekly Curbside Trash Valet Subscription',
            description: 'Weekly round-trip cart roll-out to the curb and return after municipal collection.',
          },
          price: '29.00',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
        ...SERVICE_ADDONS.map((addon) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: addon.name,
            description: addon.description,
          },
          price: addon.priceMonthly.toFixed(2),
          priceCurrency: 'USD',
          unitText: 'MONTH',
        })),
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: TESTIMONIALS.length,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function buildReviewSchema() {
  return TESTIMONIALS.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      sameAs: SITE_URL,
    },
    author: {
      '@type': 'Person',
      name: t.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: t.comment,
  }));
}

export function buildAllSchemas() {
  return [buildLocalBusinessSchema(), buildFaqSchema(), ...buildReviewSchema()];
}
