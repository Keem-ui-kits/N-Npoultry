export type EducationCategory = 'the-chick-journey' | 'growth-and-care' | 'product-excellence';

export interface EducationArticle {
  id: string;
  title: string;
  category: EducationCategory;
  image: string;
  excerpt: string;
  content: string[];
}

export const educationCategories = [
  {
    id: 'the-chick-journey',
    name: 'The Chick Journey',
    description: 'From day one, ensuring a strong foundation for future layers.',
  },
  {
    id: 'growth-and-care',
    name: 'Growth & Care',
    description: 'Providing the optimal environment, nutrition, and veterinary care.',
  },
  {
    id: 'product-excellence',
    name: 'Product Excellence',
    description: 'Delivering fresh, nutritious farm produce safely to your table.',
  },
];

export const educationArticles: EducationArticle[] = [
  {
    id: 'day-one-chicks',
    title: 'Welcoming One-Day-Old Chicks',
    category: 'the-chick-journey',
    image: '/assets/education/one day old chicks.jpeg',
    excerpt: 'The critical first 24 hours of a chick\'s life on the farm.',
    content: [
      'The journey of our high-quality table eggs begins with healthy, vigorous one-day-old chicks. When they arrive at our farm, the first 24 hours are critical for their long-term health and productivity.',
      'We prepare specialized brooding houses with precise temperature controls (around 32-35°C) because young chicks cannot regulate their own body temperature. The lighting is kept bright to help them easily locate water and feed.',
      'Providing immediate access to clean, electrolyte-infused water and high-quality starter feed ensures they recover from any transport stress and begin healthy growth immediately.'
    ]
  },
  {
    id: 'chicks-feeding',
    title: 'The Science of Chick Feeding',
    category: 'the-chick-journey',
    image: '/assets/education/chicks feeding.jpeg',
    excerpt: 'Building a strong skeletal and immune system through nutrition.',
    content: [
      'Nutrition in the early weeks is the foundation of a productive layer hen. Our chicks are fed a specially formulated starter crumble, which is rich in protein (around 20-22%) and fortified with essential vitamins and minerals.',
      'Calcium and phosphorus ratios are carefully monitored to promote strong skeletal development, which is vital for birds that will eventually produce strong-shelled eggs.',
      'Our feeding lines are designed for easy access, and we monitor consumption daily. Consistent, proper feeding during this phase directly correlates to the flock\'s uniformity and future peak egg production.'
    ]
  },
  {
    id: 'growth-to-hen',
    title: 'From Pullet to Layer Hen',
    category: 'growth-and-care',
    image: '/assets/education/grown chicks to hen.jpeg',
    excerpt: 'The transition phase where young pullets develop into productive adults.',
    content: [
      'As chicks grow into pullets (young hens), their nutritional and environmental needs change. The temperature is gradually reduced to ambient levels, and they are transitioned to a grower feed which supports steady, healthy growth without premature fattening.',
      'This period involves strict veterinary oversight, including a comprehensive vaccination schedule to protect them from common poultry diseases. We believe preventative care is the most ethical and sustainable approach to farming.',
      'By the time they reach 16-18 weeks of age, they are ready to be transferred to the layer house, fully equipped to begin their productive cycle.'
    ]
  },
  {
    id: 'care-and-welfare',
    title: 'Flock Care and Daily Operations',
    category: 'growth-and-care',
    image: '/assets/education/grown chicks-hens.jpeg',
    excerpt: 'Daily routines to ensure animal welfare and optimal farm conditions.',
    content: [
      'Our daily operations are guided by our core value of Integrity and doing what is right. Our experienced farmhands conduct multiple walk-throughs daily to monitor the flock\'s behavior, health, and comfort.',
      'Ventilation is constantly adjusted to ensure optimal air quality, and the barns are kept clean and dry. We use automated systems to monitor water consumption and house temperature, ensuring the environment remains stress-free.',
      'Happy, healthy birds are productive birds. We maintain low stocking densities to allow for natural behaviors, resulting in better overall welfare and superior egg production.'
    ]
  },
  {
    id: 'layer-hens-production',
    title: 'Peak Production: The Layer Phase',
    category: 'product-excellence',
    image: '/assets/education/layer-hens.jpeg',
    excerpt: 'Managing hens during their most productive laying cycle.',
    content: [
      'During the layer phase, the diet is switched to a high-calcium layer mash to support daily egg production. The timing and duration of lighting in the barns are closely managed to simulate natural daylight and maintain consistent laying cycles.',
      'Eggs are collected gently and frequently throughout the day to ensure they remain clean and fresh. At this stage, our commitment to "Fresh and Nutritious" is realized in every egg laid.',
      'We continually monitor feed-to-egg conversion rates and eggshell quality, making minor nutritional adjustments as needed to keep the flock at peak performance.'
    ]
  },
];
