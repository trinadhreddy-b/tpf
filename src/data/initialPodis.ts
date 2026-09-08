import { PodiItem, StoreSettings } from '../types';

export const INITIAL_PODIS: PodiItem[] = [
  {
    id: 'munagaku-karam',
    name: 'Munagaku Karam',
    teluguName: 'మునగాకు కారం (Moringa Podi)',
    tagline: 'Drumstick leaves with bold spices',
    description:
      'Our crown jewel. Hand-picked organic drumstick (Moringa) leaves sun-dried to lock in vital iron and antioxidants, slow-roasted with Guntur red chillies, garlic cloves, cumin, and roasted chana dal in stone mortar.',
    price: 80,
    weights: [
      {
        grams: 50,
        label: '50g Pouch',
        price: 40,
      },
      {
        grams: 100,
        label: '100g Pouch',
        price: 80,
      },
    ],
    spiciness: 2,
    image: 'https://cdn.jsdelivr.net/gh/trinadhreddy-b/assetsfortpf@main/munagaku_hero_image_small.png',
    category: ['leafy', 'combos'],
    ingredients: [
      'Sun-dried Moringa Leaves',
      'Guntur Red Chillies',
      'Roasted Chana Dal',
      'Urad Dal',
      'Garlic',
      'Cumin Seeds',
      'Rock Salt',
      'Hing (Asafoetida)',
    ],
    healthBenefits: [
      'Rich in Iron & Calcium',
      'Boosts natural immunity & stamina',
      'Supports healthy digestion & metabolism',
    ],
    servingSuggestions: [
      'Hot steamed rice with a dollop of pure A2 Desi Ghee',
      'Drizzled on crispy Ghee Podi Dosa',
      'Sprinkled over hot fluffy Idlis',
    ],
    inStock: true,
    badge: 'Bestseller',
    isFeatured: true,
  },
  {
    id: 'karivepaku-karam',
    name: 'Karivepaku Karam',
    teluguName: 'కరివేపాకు కారం (Curry Leaf Podi)',
    tagline: 'Aromatic tender curry leaves & roasted lentils',
    description:
      'Fresh country curry leaves washed, sun-dehydrated, and stone-pounded with coriander seeds, black peppercorns, roasted lentils, and tamarind for an unmistakable earthy aroma and vibrant flavor punch.',
    price: 80,
    weights: [
      {
        grams: 50,
        label: '50g Pouch',
        price: 40,
      },
      {
        grams: 100,
        label: '100g Pouch',
        price: 80,
      },
    ],
    spiciness: 2,
    image: 'https://cdn.jsdelivr.net/gh/trinadhreddy-b/assetsfortpf@main/karivepaku_hero_image_small.png',
    category: ['traditional', 'combos'],
    ingredients: [
      'Farm-fresh Curry Leaves',
      'Byadgi & Guntur Chillies',
      'Toor Dal',
      'Chana Dal',
      'Coriander Seeds',
      'Cumin',
      'Tamarind',
      'Hing',
    ],
    healthBenefits: [
      'Renowned for hair vitality & scalp health',
      'Packed with Vitamin A and Beta-carotene',
      'Aids cholesterol management',
    ],
    servingSuggestions: [
      'Mix with piping hot rice and melted butter or ghee',
      'Pair with curd rice for soothing digestif',
      'Dust over fried potatoes or roasted paneer',
    ],
    inStock: true,
    badge: "Chef's Special",
    isFeatured: true,
  },
  {
    id: 'kandi-podi',
    name: 'Putnala Podi',
    teluguName: 'పుట్నాల కారం పొడి',
    tagline: 'Classic roasted chana dal & fiery Guntur chillies',
    description:
      'A timeless Andhra favourite. Premium roasted chana dal (Putnalu) is slow-roasted with aromatic spices, fiery Guntur red chillies, garlic, and traditional seasonings, then stone-ground to create a rich, nutty and flavourful podi.',
    price: 70,
    weights: [
      {
        grams: 50,
        label: '50g Pouch',
        price: 35,
      },
      {
        grams: 100,
        label: '100g Pouch',
        price: 70,
      },
    ],
    spiciness: 2,
    image: 'https://cdn.jsdelivr.net/gh/trinadhreddy-b/assetsfortpf@main/putnalu_hero_image_small.png',
    category: ['traditional', 'lentils', 'combos'],
    ingredients: [
      'Roasted Chana Dal',
      'Red Chillies',
      'Cumin',
      'Black Peppercorns',
      'Rock Salt',
    ],
    healthBenefits: [
      'Rich in Plant-Based Protein & Fibre',
      'Supports Healthy Digestion & Metabolism',
      'Provides Natural Energy & Essential Nutrients',
    ],
    servingSuggestions: [
      'The quintessential first bite of Andhra Bhojanam with hot rice & ghee',
      'Classic Podi Idli tossing with sesame oil',
      'Coating for Uttapam',
    ],
    inStock: true,
    badge: 'Classic Favorite',
    isFeatured: true,
  },
  {
    id: 'kakarakaya-karam',
    name: 'Kakarakaya Karam',
    teluguName: 'కాకరకాయ కారం (Crispy Bittergourd Podi)',
    tagline: 'Crispy sun-dried bittergourd with tangy spiced magic',
    description:
      'Thinly sliced bittergourd sun-dried till crisp and pounded with roasted lentils, jaggery hint, and spices. Turns bitter gourd into an irresistible culinary masterpiece even kids adore.',
    price: 80,
    weights: [
      {
        grams: 50,
        label: '50g Pouch',
        price: 40,
      },
      {
        grams: 100,
        label: '100g Pouch',
        price: 80,
      },
    ],
    spiciness: 2,
    image: 'https://cdn.jsdelivr.net/gh/trinadhreddy-b/assetsfortpf@main/kakarakaya_single.png',
    category: ['traditional', 'combos'],
    ingredients: [
      'Sun-dried Bittergourd slices',
      'Chana Dal',
      'Urad Dal',
      'Red Chillies',
      'Organic Jaggery pinch',
      'Garlic',
      'Tamarind',
    ],
    healthBenefits: [
      'Supports healthy blood sugar balance',
      'Purifies blood and detoxifies',
      'No bitter aftertaste due to secret blend',
    ],
    servingSuggestions: [
      'Hot rice with ghee',
      'Side accompaniment with Sambar & Rasam rice',
    ],
    inStock: true,
    badge: 'Superfood',
    isFeatured: false,
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'The Podi Factory',
  tagline: "Hand-pounded. Sun-dried. Andhra's soul.",
  whatsappNumber: '+916305986401',
  instagramHandle: 'the_podifactory',
  email: 'orders@thepodifactory.com',
  phone: '+91 98765 43210',
  address: 'Artisanal Batch Kitchen, Guntur & Hyderabad, India',
  announcement:
    '🌿 Small-batch fresh harvest podis now shipping across India! Free delivery on orders over ₹799',
  upiId: 'thepodifactory@okaxis',
  currencySymbol: '₹',
};
