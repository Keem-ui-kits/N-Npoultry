export interface FaqItem {
  question: string;
  answer: string;
}

// Single source of truth for the visible FAQ section and the FAQPage
// JSON-LD schema — keep both in sync by editing only this file.
export const faqItems: FaqItem[] = [
  {
    question: 'How do I order eggs from N&N Poultry Palace?',
    answer:
      'The easiest way is to send a WhatsApp message to +254113377623. Tell us what you need — 30pc trays of table eggs, poultry manure, or ex-layer hens — and we will confirm the price and next delivery slot within minutes.',
  },
  {
    question: 'Which areas do you deliver to?',
    answer:
      'We deliver daily to Machakos Town, Syokimau, Athi River, Mlolongo, Katoloni, and Mwala. Contact us if you are in a nearby area — we may be able to arrange delivery.',
  },
  {
    question: 'How fresh are the eggs?',
    answer:
      'Our eggs are collected daily starting at 2 PM, inspected and packed by 5 PM, and delivered fresh to your doorstep within hours. We guarantee a maximum 24–48 hour farm-to-delivery window.',
  },
  {
    question: 'Do you sell in bulk for businesses?',
    answer:
      'Yes. We supply restaurants, kiosks, bakeries, and wholesale distributors. Contact us via WhatsApp or our contact form to discuss bulk pricing and standing orders.',
  },
  {
    question: 'What is poultry manure used for?',
    answer:
      'Our poultry manure is a fully organic fertilizer rich in nitrogen, phosphorus, and potassium. It is suitable for kitchen gardens, commercial farms, and all crop types. Available in 70kg bulk sacks.',
  },
];
