import { Product, CareContentItem, ProductCategory, CategoryMetaItem } from '@/types';

export const products: Product[] = [
  // 1. Temple Gold Bangles
  {
    id: 'temple-gold-bangles',
    name: 'Temple Gold Bangles · Pair',
    material: '22K Gold',
    metal: 'gold',
    category: 'Bangles',
    price: 96200,
    oldPrice: 105000,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 142,
    collection: 'Temple Gold Heritage',
    image: '/assets/img/p-temple-gold-bangles.png',
    images: [
      '/assets/img/p-temple-gold-bangles.png',
      '/assets/img/p-maharani-gold-kada.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png',
      '/assets/img/p-silver-kada.png'
    ],
    metalWeight: '32.40 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-BNG-01',
    sizes: ['2.4 (Small)', '2.6 (Standard)', '2.8 (Broad)'],
    description: 'A traditional pair of broad bangles engraved with sacred temple motifs, crafted as a cherished family heirloom.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-GLD-BNG-01",
        "Metal Purity": "22KT Gold (BIS Hallmarked Certified)",
        "Finish": "Antique Matte & Hand-Chiseled Gold",
        "Occasion": "Festive / Bridal / Heritage"
      },
      "Metal & Weight Specifications": {
        "Gross Weight": "32.40 grams",
        "Net Gold Weight": "32.40 grams",
        "Setting Type": "Solid Hand-Cast Karigari"
      }
    }
  },

  // 2. Lakshmi Gold Necklace
  {
    id: 'lakshmi-gold-necklace',
    name: 'Lakshmi Gold Necklace',
    material: '22K Gold',
    metal: 'gold',
    category: 'Necklaces',
    price: 148500,
    oldPrice: 162000,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviews: 98,
    collection: 'Temple Gold Heritage',
    image: '/assets/img/p-lakshmi-gold-necklace.png',
    images: [
      '/assets/img/p-lakshmi-gold-necklace.png',
      '/assets/img/p-bridal-gold-choker.png',
      '/assets/img/p-meenakari-gold-pendant.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png'
    ],
    metalWeight: '44.80 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-NCK-01',
    sizes: ['16 in (Princess)', '18 in (Matinee)'],
    description: 'A temple-inspired necklace in radiant 22K gold, its pendant hand-carved with lotus filigree and finished with a single uncut polki stone.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-GLD-NCK-01",
        "Metal Purity": "22KT Gold (BIS Hallmarked)",
        "Occasion": "Festive / Wedding Heirloom"
      }
    }
  },

  // 3. Heritage Jhumkas
  {
    id: 'heritage-jhumkas',
    name: 'Heritage Jhumkas',
    material: '22K Gold',
    metal: 'gold',
    category: 'Earrings',
    price: 58900,
    oldPrice: 64500,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 114,
    collection: 'Temple Gold Heritage',
    image: '/assets/img/p-heritage-jhumkas.png',
    images: [
      '/assets/img/p-heritage-jhumkas.png',
      '/assets/img/p-antique-gold-earrings.png',
      '/assets/img/p-filigree-silver-jhumkas.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png'
    ],
    metalWeight: '18.60 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-EAR-01',
    sizes: ['Standard Drop (42mm)'],
    description: 'Bell-shaped jhumkas in the old Jaipur manner, each dome worked with fine granulation and a swinging pearl-drop.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-GLD-EAR-01",
        "Metal Purity": "22KT Gold (BIS Hallmarked)"
      }
    }
  },

  // 4. Classic Gold Ring
  {
    id: 'classic-gold-ring',
    name: 'Classic Gold Ring',
    material: '18K Gold',
    metal: 'gold',
    category: 'Rings',
    price: 38400,
    oldPrice: null,
    badge: 'NEW ARRIVAL',
    rating: 4.7,
    reviews: 76,
    collection: 'Daily Luxury',
    image: '/assets/img/p-classic-gold-ring.png',
    images: [
      '/assets/img/p-classic-gold-ring.png',
      '/assets/img/p-minimal-silver-ring.png',
      '/assets/img/tile-gold.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '5.20 g',
    purity: '18KT Gold (BIS 750)',
    sku: 'SREE-GLD-RNG-01',
    sizes: ['Size 10 (16.0mm)', 'Size 12 (16.5mm)', 'Size 14 (17.3mm)', 'Size 16 (18.0mm)', 'Size 18 (18.5mm)', 'Size 20 (19.2mm)'],
    description: 'An elegant band in solid gold crowned with a sparkling zircon, crafted for auspicious celebrations and daily wear.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-GLD-RNG-01",
        "Metal Purity": "18KT Gold (BIS Hallmarked)"
      }
    }
  },

  // 5. Lotus Silver Pendant
  {
    id: 'lotus-silver-pendant',
    name: 'Lotus Silver Pendant',
    material: '925 Silver',
    metal: 'silver',
    category: 'Pendants',
    price: 6850,
    oldPrice: 7900,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 165,
    collection: 'Moonlit Silver',
    image: '/assets/img/p-lotus-silver-pendant.png',
    images: [
      '/assets/img/p-lotus-silver-pendant.png',
      '/assets/img/p-meenakari-gold-pendant.png',
      '/assets/img/p-sterling-silver-chain.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '8.40 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-PND-01',
    sizes: ['Includes 18in Sterling Chain'],
    description: 'A blooming lotus cut in sterling silver, its petals frosted by hand and hung from a whisper-fine chain.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-SLV-PND-01",
        "Metal Purity": "Certified 925 Sterling Silver"
      }
    }
  },

  // 6. Silver Kada
  {
    id: 'silver-kada',
    name: 'Silver Kada',
    material: '925 Silver',
    metal: 'silver',
    category: 'Bangles',
    price: 9400,
    oldPrice: 10800,
    badge: 'NEW ARRIVAL',
    rating: 4.7,
    reviews: 82,
    collection: 'Moonlit Silver',
    image: '/assets/img/p-silver-kada.png',
    images: [
      '/assets/img/p-silver-kada.png',
      '/assets/img/p-temple-gold-bangles.png',
      '/assets/img/p-pearl-silver-bracelet.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '28.50 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-KAD-01',
    sizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    description: 'A solid kada in brushed sterling silver, handcrafted with traditional Indian finish and lasting strength.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-SLV-KAD-01",
        "Metal Purity": "Certified 925 Sterling Silver"
      }
    }
  },

  // 7. Minimal Silver Ring
  {
    id: 'minimal-silver-ring',
    name: 'Minimal Silver Ring',
    material: '925 Silver',
    metal: 'silver',
    category: 'Rings',
    price: 2950,
    oldPrice: 3400,
    badge: 'NEW ARRIVAL',
    rating: 4.6,
    reviews: 94,
    collection: 'Moonlit Silver',
    image: '/assets/img/p-minimal-silver-ring.png',
    images: [
      '/assets/img/p-minimal-silver-ring.png',
      '/assets/img/p-classic-gold-ring.png',
      '/assets/img/tile-silver.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png'
    ],
    metalWeight: '3.80 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-RNG-01',
    sizes: ['Size 8 (15.3mm)', 'Size 10 (16.0mm)', 'Size 12 (16.5mm)', 'Size 14 (17.3mm)', 'Size 16 (18.0mm)', 'Size 18 (18.5mm)'],
    description: 'A graceful polished band topped with a brilliant zircon, crafted for everyday traditional elegance.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-SLV-RNG-01",
        "Metal Purity": "Certified 925 Sterling Silver"
      }
    }
  },

  // 8. Contemporary Silver Earrings
  {
    id: 'contemporary-silver-earrings',
    name: 'Contemporary Silver Earrings',
    material: '925 Silver',
    metal: 'silver',
    category: 'Earrings',
    price: 5200,
    oldPrice: 6100,
    badge: 'TRENDING',
    rating: 4.7,
    reviews: 63,
    collection: 'Moonlit Silver',
    image: '/assets/img/p-contemporary-silver-earrings.png',
    images: [
      '/assets/img/p-contemporary-silver-earrings.png',
      '/assets/img/p-filigree-silver-jhumkas.png',
      '/assets/img/p-heritage-jhumkas.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '7.20 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-EAR-01',
    sizes: ['Standard Drop (35mm)'],
    description: 'Graceful sterling silver drops with mirror finish, designed for festive occasions and daily beauty.',
    specs: {
      "General Information": {
        "Design Code / SKU": "SREE-SLV-EAR-01",
        "Metal Purity": "Certified 925 Sterling Silver"
      }
    }
  },

  // 9. Filigree Silver Jhumkas
  {
    id: 'filigree-silver-jhumkas',
    name: 'Filigree Silver Jhumkas',
    material: '925 Silver',
    metal: 'silver',
    category: 'Earrings',
    price: 8600,
    oldPrice: 9800,
    badge: 'NEW ARRIVAL',
    rating: 4.8,
    reviews: 58,
    collection: 'Filigree Craft',
    image: '/assets/img/p-filigree-silver-jhumkas.png',
    images: [
      '/assets/img/p-filigree-silver-jhumkas.png',
      '/assets/img/p-contemporary-silver-earrings.png',
      '/assets/img/p-antique-gold-earrings.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '12.40 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-FLG-01',
    description: 'Authentic Cuttack style silver filigree jhumkas, handcrafted with delicate wirework for festive lightness.',
  },

  // 10. Sterling Silver Chain
  {
    id: 'sterling-silver-chain',
    name: 'Sterling Silver Chain',
    material: '925 Silver',
    metal: 'silver',
    category: 'Chains',
    price: 11400,
    oldPrice: 12800,
    badge: 'ESSENTIAL',
    rating: 4.6,
    reviews: 44,
    collection: 'Moonlit Silver',
    image: '/assets/img/p-sterling-silver-chain.png',
    images: [
      '/assets/img/p-sterling-silver-chain.png',
      '/assets/img/p-lotus-silver-pendant.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png',
      '/assets/img/banner-925-silver.jpg'
    ],
    metalWeight: '15.60 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-CHN-01',
    description: 'A hand-linked sterling chain with a soft satin sheen, made to be worn alone or layered.'
  },

  // 11. Pearl Silver Bracelet
  {
    id: 'pearl-silver-bracelet',
    name: 'Pearl Silver Bracelet',
    material: '925 Silver',
    metal: 'silver',
    category: 'Bangles',
    price: 12300,
    oldPrice: 13900,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviews: 89,
    collection: 'Moonlit Silver',
    image: '/assets/img/p-pearl-silver-bracelet.png',
    images: [
      '/assets/img/p-pearl-silver-bracelet.png',
      '/assets/img/p-silver-kada.png',
      '/assets/img/p-tribal-silver-anklet.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '14.20 g',
    purity: '925 Sterling Silver & Natural Freshwater Pearls',
    sku: 'SREE-SLV-PRL-01',
    description: 'Natural freshwater pearls woven between pure sterling silver links, designed for timeless family grace.',
  },

  // 12. Meenakari Gold Pendant
  {
    id: 'meenakari-gold-pendant',
    name: 'Meenakari Gold Pendant',
    material: '22K Gold',
    metal: 'gold',
    category: 'Pendants',
    price: 44700,
    oldPrice: 49500,
    badge: 'NEW ARRIVAL',
    rating: 4.6,
    reviews: 38,
    collection: 'Meenakari Edit',
    image: '/assets/img/p-meenakari-gold-pendant.png',
    images: [
      '/assets/img/p-meenakari-gold-pendant.png',
      '/assets/img/p-lotus-silver-pendant.png',
      '/assets/img/p-lakshmi-gold-necklace.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png'
    ],
    metalWeight: '11.80 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-MNK-01',
    description: 'A teardrop pendant with meenakari detailing at the bail, suspended from a fine hand-made gold chain.'
  },

  // 13. Maharani Gold Kada
  {
    id: 'maharani-gold-kada',
    name: 'Maharani Gold Kada',
    material: '22K Gold',
    metal: 'gold',
    category: 'Bangles',
    price: 112800,
    oldPrice: 124000,
    badge: 'EXCLUSIVE',
    rating: 4.9,
    reviews: 41,
    collection: 'Royal Heritage',
    image: '/assets/img/p-maharani-gold-kada.png',
    images: [
      '/assets/img/p-maharani-gold-kada.png',
      '/assets/img/p-temple-gold-bangles.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png',
      '/assets/img/p-silver-kada.png'
    ],
    metalWeight: '38.20 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-KAD-01',
    description: 'A ceremonial kada with carved lion-head terminals, polished to a deep lustre in the Sree finishing room.'
  },

  // 15. Bridal Gold Choker
  {
    id: 'bridal-gold-choker',
    name: 'Bridal Gold Choker',
    material: '22K Gold',
    metal: 'gold',
    category: 'Necklaces',
    price: 214000,
    oldPrice: 235000,
    badge: 'EXCLUSIVE',
    rating: 5.0,
    reviews: 29,
    collection: 'Bridal Edit',
    image: '/assets/img/p-bridal-gold-choker.png',
    images: [
      '/assets/img/p-bridal-gold-choker.png',
      '/assets/img/p-lakshmi-gold-necklace.png',
      '/assets/img/p-meenakari-gold-pendant.png',
      '/assets/img/tile-gold.png',
      '/assets/img/story.png'
    ],
    metalWeight: '68.00 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-CHK-01',
    description: 'The royal centerpiece of our bridal collection, featuring rich gold strands gathered into an auspicious temple medallion.',
  },

  // 16. Tribal Silver Anklet
  {
    id: 'tribal-silver-anklet',
    name: 'Tribal Silver Anklet · Pair',
    material: '925 Silver',
    metal: 'silver',
    category: 'Bangles',
    price: 7800,
    oldPrice: 8900,
    badge: 'NEW ARRIVAL',
    rating: 4.5,
    reviews: 67,
    collection: 'Tribal Silver',
    image: '/assets/img/p-tribal-silver-anklet.png',
    images: [
      '/assets/img/p-tribal-silver-anklet.png',
      '/assets/img/p-silver-kada.png',
      '/assets/img/p-pearl-silver-bracelet.png',
      '/assets/img/tile-silver.png',
      '/assets/img/story.png'
    ],
    metalWeight: '22.00 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-ANK-01',
    description: 'A pair of anklets in the tribal silver tradition, strung with tiny ghungroo bells that move as you do.'
  }
];

export const productMap = new Map<string, Product>(products.map(p => [p.id.toLowerCase(), p]));

export const bestSellerIds = [
  "temple-gold-bangles", 
  "lakshmi-gold-necklace", 
  "heritage-jhumkas", 
  "classic-gold-ring", 
  "lotus-silver-pendant", 
  "silver-kada", 
  "minimal-silver-ring", 
  "contemporary-silver-earrings"
];

export const categoryMeta: Record<string, CategoryMetaItem> = {
  shop: {
    title: "All Jewellery",
    subtitle: "The Complete Sree Vault",
    description: "Explore our entire collection of 22K gold plated and 925 sterling silver heirlooms, BIS-hallmarked and handcrafted with devotion."
  },
  gold: {
    title: "18K Gold Plated",
    subtitle: "The Warmth of Heritage Gold",
    description: "Alloyed for a luminous champagne warmth, hand-engraved with temple motifs and finished for a rich, enduring lustre."
  },
  silver: {
    title: "925 Sterling Silver",
    subtitle: "Moonlit Architectural Silhouettes",
    description: "Cool, refined, and sculptural. Hallmarked 925 sterling silver crafted for timeless daily wear and effortless distinction."
  },
  rings: {
    title: "Rings",
    subtitle: "Solitaires, Bands & Pave Settings",
    description: "Every Sree ring is balanced to sit with weightless comfort, crowned with hand-cut stones and antique temple engravings."
  },
  earrings: {
    title: "Earrings",
    subtitle: "Jhumkas, Balis & Sculptural Studs",
    description: "From lightweight everyday drops to dramatic heritage jhumkas, each pair is balanced for all-day comfort and undeniable distinction."
  },
  necklaces: {
    title: "Necklaces",
    subtitle: "Nakshi, Temple Karigari & Chokers",
    description: "Heirloom craftsmanship designed to frame your neckline with timeless refinement and unmatched radiance."
  },
  harams: {
    title: "Harams & Long Sets",
    subtitle: "Imperial Bridal Harams",
    description: "Regal multi-strand and temple harams crafted for royal festive celebrations and bridal grandeur."
  },
  kante: {
    title: "Kante Collars",
    subtitle: "Rigid Collar Neckpieces",
    description: "Traditional rigid neck collars inspired by antique royal treasuries, sculpted to rest gracefully on the collarbone."
  },
  "diamond-finishing": {
    title: "Diamond Finishing",
    subtitle: "Precision Pavé & Solitaire Cuts",
    description: "Ultra-precise diamond finishing reflecting light like faceted crystal, set in 18K gold and silver mounts."
  },
  jadau: {
    title: "Antique Jadau",
    subtitle: "Heritage Foil-Set Gemstones",
    description: "Centuries-old Jadau karigari embedding uncut gemstones within pure precious metal foils."
  },
  "victorian-style": {
    title: "Victorian Style",
    subtitle: "Lace Filigree & Antique Patina",
    description: "Intricate Victorian lace patterns hand-drawn with fine wirework and dark antique patina."
  },
  "pure-silver-chains": {
    title: "Pure 92.5 Silver Chains",
    subtitle: "Hand-Linked 925 Sterling Silver",
    description: "Precision hand-linked sterling silver chains with tarnish-resistant protective finish for daily luxury."
  },
  "italian-chains-bracelets": {
    title: "Italian Chains & Bracelets",
    subtitle: "Fluid Italian Link Chains & Bracelets",
    description: "Modern Italian chain silhouettes and flexible link bracelets engineered for fluid drape and movement."
  },
  "gents-kadas": {
    title: "Gents Kadas",
    subtitle: "Brushed Solid Silver & Gold Kadas",
    description: "Weighty, masculine solid 925 silver and gold kadas with brushed satin textures and sculpted bevels."
  },
  bangles: {
    title: "Bangles & Kadas",
    subtitle: "Temple Bangles, Kadas & Bracelets",
    description: "Fluid curves and heritage textures engineered for effortless layering and tactile elegance."
  },
  bracelets: {
    title: "Bracelets",
    subtitle: "Fine Link & Pearl Bracelets",
    description: "Handcrafted link bracelets adorned with natural freshwater pearls and gemstone accents."
  },
  pendants: {
    title: "Pendants",
    subtitle: "Lotus & Meenakari Amulets",
    description: "Delicate centerpieces holding radiant uncut stones and geometric motifs that hold meaning close to your heart."
  },
  chains: {
    title: "Chains",
    subtitle: "Hand-Linked Sterling & Gold Chains",
    description: "Precision-machined fine link chains finished with anti-tarnish protective coatings for daily durability."
  }
};

export const designCollections = [
  { id: 0, title: "Temple Gold", desc: "Heritage textures crafted for generations to come.", tag: "Heritage" },
  { id: 1, title: "Moonlit Silver", desc: "Pure 925 sterling silver in architectural silhouettes.", tag: "Silver Luxe" },
  { id: 2, title: "Polki Kundan", desc: "Uncut gemstones cradled in hand-embossed foil.", tag: "Imperial" },
  { id: 3, title: "Filigree Craft", desc: "Cuttack-style lace drawn in fine silver wire.", tag: "Handmade" }
];

export const careContent: Record<string, CareContentItem> = {
  contact: {
    title: "A little personal attention.",
    paragraphs: [
      "Our atelier concierge is at your service for bespoke commissions, size consultations, price quotes, and orders.",
      "Direct WhatsApp Helpline: +91 79952 28713 (Instant Reply)",
      "Reach our specialists at concierge@sreejewellery.com or connect with us on WhatsApp anytime."
    ]
  },
  shipping: {
    title: "Beautifully delivered.",
    paragraphs: [
      "Every piece is dispatched in our signature velvet keepsake box with insured priority shipping across India.",
      "Complimentary express delivery on all orders. Insured courier tracking enclosed."
    ]
  },
  care: {
    title: "A little care, a lasting glow.",
    paragraphs: [
      "Keep jewellery away from perfumes, cleaning products, and prolonged moisture. Put your pieces on after applying fragrance.",
      "Wipe gently with a soft, dry cloth and store each piece separately in its pouch.",
      "Silver loves to be worn, as natural contact with skin helps maintain its shine. A yearly complimentary polish is included for all our pieces."
    ]
  },
  size: {
    title: "Find your perfect fit.",
    paragraphs: [
      "For bangles: Measure the inner diameter of an existing bangle that fits well. Standard sizes: 2.4 = 57.2mm, 2.6 = 60.3mm, 2.8 = 63.5mm.",
      "For rings: Measure the inside diameter in millimeters. US 6 = 16.5 mm, US 7 = 17.3 mm, US 8 = 18.2 mm."
    ]
  },
  privacy: {
    title: "Your details, considered.",
    paragraphs: [
      "Your privacy is sacred. We only collect the necessary details required to deliver your heirloom pieces securely.",
      "Your checkout information is protected with 256-bit banking grade encryption."
    ]
  }
};
