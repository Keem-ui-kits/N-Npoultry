export interface Testimonial {
  id: string | number;
  name: string;
  company?: string;
  location?: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Wanjiru M.',
    location: 'Syokimau',
    rating: 5,
    text: "I've been buying from N&N for over eight months and the eggs are consistently fresh. Living in Syokimau, it's great to have such high-quality eggs delivered right to my door. The yolks are bright and rich — you can really taste the difference!",
  },
  {
    id: 2,
    name: 'Chef Kamau J.',
    company: 'Restaurant Owner',
    location: 'Machakos Town',
    rating: 5,
    text: 'We switched our restaurant supply in Machakos Town to N&N six months ago. Their wholesale pricing is fair, invoicing is professional, and I have never had a rejected batch. Highly recommended for any local food business.',
  },
  {
    id: 3,
    name: 'Amina S.',
    company: 'Breakfast Kiosk Owner',
    location: 'Athi River',
    rating: 4.5,
    text: "I run a small breakfast kiosk in Athi River and N&N's eggs have been a game-changer. WhatsApp ordering is super convenient, and they even remind me before I run low. This is the kind of supplier every small business needs.",
  },
  {
    id: 4,
    name: 'David K.',
    company: 'Wholesale Distributor',
    location: 'Mlolongo',
    rating: 5,
    text: 'Supply chain reliability is everything in my business. N&N Poultry Palace delivers on time, every time. The quality of their eggs is top-tier, and the feedback from my retail partners has been overwhelmingly positive.',
  },
  {
    id: 5,
    name: 'Sarah L.',
    location: 'Katoloni',
    rating: 4.5,
    text: "I started using their poultry manure for my kitchen garden last season and the results are incredible. It's rich, well-composted, and significantly improved my soil health. Plus, it's great to support a local farm that cares about sustainability!",
  },
];
