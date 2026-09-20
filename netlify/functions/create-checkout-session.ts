import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const SERVICE_ADDONS_LOOKUP: Record<string, { name: string; priceMonthly: number }> = {
  power_wash_sanitizing: {
    name: 'Monthly Trash Can Power-Wash & High-Heat Sanitizing',
    priceMonthly: 19,
  },
  sanitizing_spray: {
    name: 'Can Odor Defense & Sanitizing Spray',
    priceMonthly: 12,
  },
  handle_wipe: {
    name: 'Sanitary Handle & Lid Wipe Down',
    priceMonthly: 8,
  },
  extra_box_haul: {
    name: 'Cardboard Breakdown & Extra Bag Assist',
    priceMonthly: 15,
  },
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'STRIPE_SECRET_KEY is not configured in Netlify environment variables.' 
      }),
    };
  }

  try {
    const stripe = new Stripe(apiKey, {
      apiVersion: '2023-10-16' as any,
    });

    const body = JSON.parse(event.body || '{}');
    const { quote, formData } = body;

    if (!quote) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Quote details are required.' }),
      };
    }

    const origin = event.headers.origin || event.headers.referer || 'https://boisetrashvalet.com';
    const cleanOrigin = origin.replace(/\/$/, '');

    // Frequency display name
    const frequencyLabel = 
      quote.frequency === 'weekly' ? 'Weekly Service (Every Week)' :
      quote.frequency === 'biweekly' ? 'Bi-Weekly Service (Every Other Week)' :
      quote.frequency === 'vacation' ? 'Vacation Hold Service' : 'Airbnb & Rental Turnover';

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // 1. Base Subscription Line Item
    const baseRate = Number(quote.baseMonthlyRate) || 29;
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Boise Trash Valet: ${frequencyLabel}`,
          description: `${quote.binCount || 2} Cans Included • ${quote.driveway || 'Standard'} Driveway • Round-Trip Curbside Rolling`,
        },
        unit_amount: Math.round(baseRate * 100),
        recurring: {
          interval: 'month',
        },
      },
      quantity: 1,
    });

    // 2. Add-ons Line Items
    if (Array.isArray(quote.selectedAddons)) {
      for (const addonId of quote.selectedAddons) {
        const addon = SERVICE_ADDONS_LOOKUP[addonId];
        if (addon && addon.priceMonthly > 0) {
          lineItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Add-On: ${addon.name}`,
                description: 'Monthly service add-on for Boise Trash Valet',
              },
              unit_amount: Math.round(addon.priceMonthly * 100),
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          });
        }
      }
    }

    // 3. Optional Promo Discount via one-time coupon
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined = undefined;
    if (quote.promoDiscount && quote.promoDiscount > 0) {
      try {
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(quote.promoDiscount * 100),
          currency: 'usd',
          duration: 'once',
          name: quote.promoCode ? `Promo Code: ${quote.promoCode}` : 'Promotional Discount',
        });
        discounts = [{ coupon: coupon.id }];
      } catch (couponErr) {
        console.warn('Could not create coupon, skipping discount parameter:', couponErr);
      }
    }

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: formData?.email || undefined,
      line_items: lineItems,
      discounts,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${cleanOrigin}/?booking=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cleanOrigin}/?booking=cancelled`,
      metadata: {
        customerName: formData?.fullName || '',
        customerPhone: formData?.phone || '',
        customerAddress: `${formData?.streetAddress || ''}, ${formData?.city || 'Boise'}, ${formData?.zipCode || ''}`,
        pickupDay: formData?.pickupDay || '',
        binLocationNotes: formData?.binLocationNotes || '',
        gateCode: formData?.gateCodeOrInstructions || '',
        binCount: String(quote.binCount || 2),
        frequency: quote.frequency || 'weekly',
        driveway: quote.driveway || 'standard',
        totalMonthly: String(quote.totalMonthlyRate || baseRate),
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: session.url, id: session.id }),
    };
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error?.message || 'Internal Server Error' }),
    };
  }
};
