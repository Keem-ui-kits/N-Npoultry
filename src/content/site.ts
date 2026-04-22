export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nnpoultrypalace.vercel.app',
  name: 'N&N Poultry Palace',
  fullName: 'N&N POULTRY PALACE',
  description: 'Fresh and Nutritious — your trusted source for farm-fresh eggs in Machakos.',
  contacts: {
    phones: ['0113377623', '0714246534'],
    email: 'palacepoultryn.n@gmail.com',
    address: 'Machakos, Kenya',
    whatsapp: '254113377623',
  },
  businessHours: {
    weekdays: 'Mon–Fri: 8:00 AM – 5:00 PM',
    saturday: 'Sat: 8:00 AM – 12:00 PM',
  },
  stats: [
    { label: 'Years Exp.', value: '5+' },
    { label: 'Deliveries', value: '10k+' },
    { label: 'Satisfaction', value: '100%' },
  ],
  companyInfo: {
    vision: "To be East Africa's leading provider of sustainable quality poultry products.",
    mission: "Driving progress in the poultry industry while uplifting the economies that sustain it.",
    values: [
      "We believe in doing what's right—always.",
      "We are reliable and deliver on our promises.",
      "We work as one team, sharing ideas, responsibilities, and successes.",
    ],
  },
};
