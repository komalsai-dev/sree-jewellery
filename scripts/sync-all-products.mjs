import { createClient } from 'next-sanity';
import fs from 'fs';

const envLocal = fs.readFileSync('.env.local', 'utf8');
const env = {};
envLocal.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cnjoffkd',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// All 16 standard products from products.ts
const allInitialProducts = [
  // 1. Temple Gold Bangles (Already exists)
  {
    name: 'Temple Gold Bangles · Pair',
    slug: 'temple-gold-bangles',
    categoryName: 'Bangles',
    metal: 'gold',
    material: '22K Gold',
    price: 96200,
    oldPrice: 105000,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 142,
    collection: 'Temple Gold Heritage',
    metalWeight: '32.40 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-BNG-01',
    sizes: ['2.4 (Small)', '2.6 (Standard)', '2.8 (Broad)'],
    description: 'A sculpted pair of broad bangles engraved with a chevron temple motif — the signature heirloom piece of the Sree gold atelier.',
  },
  // 2. Lakshmi Gold Necklace (Already exists)
  {
    name: 'Lakshmi Gold Necklace',
    slug: 'lakshmi-gold-necklace',
    categoryName: 'Necklaces',
    metal: 'gold',
    material: '22K Gold',
    price: 148500,
    oldPrice: 162000,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviews: 98,
    collection: 'Temple Gold Heritage',
    metalWeight: '44.80 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-NCK-01',
    sizes: ['16 in (Princess)', '18 in (Matinee)'],
    description: 'A temple-inspired necklace in radiant 22K gold, its pendant hand-carved with lotus filigree and finished with a single uncut polki stone.',
  },
  // 3. Heritage Jhumkas (Already exists with image)
  {
    name: 'Heritage Jhumkas',
    slug: 'heritage-jhumkas',
    categoryName: 'Earrings',
    metal: 'gold',
    material: '22K Gold',
    price: 58900,
    oldPrice: 64500,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 114,
    collection: 'Temple Gold Heritage',
    metalWeight: '18.60 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-EAR-01',
    sizes: ['Standard Drop (42mm)'],
    description: 'Bell-shaped jhumkas in the old Jaipur manner, each dome worked with fine granulation and a swinging pearl-drop.',
  },
  // 4. Classic Gold Ring (Already exists)
  {
    name: 'Classic Gold Ring',
    slug: 'classic-gold-ring',
    categoryName: 'Rings',
    metal: 'gold',
    material: '18K Gold',
    price: 38400,
    oldPrice: null,
    badge: 'NEW ARRIVAL',
    rating: 4.7,
    reviews: 76,
    collection: 'Daily Luxury',
    metalWeight: '5.20 g',
    purity: '18KT Gold (BIS 750)',
    sku: 'SREE-GLD-RNG-01',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    description: 'A quiet, weighty band in 18K gold crowned with a champagne zircon — cut for light, made for every day.',
  },
  // 5. Lotus Silver Pendant (Already exists)
  {
    name: 'Lotus Silver Pendant',
    slug: 'lotus-silver-pendant',
    categoryName: 'Pendants',
    metal: 'silver',
    material: '925 Silver',
    price: 6850,
    oldPrice: 7900,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 165,
    collection: 'Moonlit Silver',
    metalWeight: '8.40 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-PND-01',
    sizes: ['Includes 18in Sterling Chain'],
    description: 'A blooming lotus cut in sterling silver, its petals frosted by hand and hung from a whisper-fine chain.',
  },
  // 6. Silver Kada (Already exists)
  {
    name: 'Silver Kada',
    slug: 'silver-kada',
    categoryName: 'Bangles',
    metal: 'silver',
    material: '925 Silver',
    price: 9400,
    oldPrice: 10800,
    badge: 'NEW ARRIVAL',
    rating: 4.7,
    reviews: 82,
    collection: 'Moonlit Silver',
    metalWeight: '28.50 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-KAD-01',
    sizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    description: 'A clean, weighty kada in brushed-and-polished sterling silver — minimal outside, hand-finished within.',
  },
  // 7. Minimal Silver Ring (Already exists)
  {
    name: 'Minimal Silver Ring',
    slug: 'minimal-silver-ring',
    categoryName: 'Rings',
    metal: 'silver',
    material: '925 Silver',
    price: 2950,
    oldPrice: 3400,
    badge: 'NEW ARRIVAL',
    rating: 4.6,
    reviews: 94,
    collection: 'Moonlit Silver',
    metalWeight: '3.80 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-RNG-01',
    sizes: ['US 4', 'US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    description: 'A slim polished band topped with a moon-white zircon — the everyday ring, perfected.',
  },
  // 8. Contemporary Silver Earrings (Already exists)
  {
    name: 'Contemporary Silver Earrings',
    slug: 'contemporary-silver-earrings',
    categoryName: 'Earrings',
    metal: 'silver',
    material: '925 Silver',
    price: 5200,
    oldPrice: 6100,
    badge: 'TRENDING',
    rating: 4.7,
    reviews: 63,
    collection: 'Moonlit Silver',
    metalWeight: '7.20 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-EAR-01',
    sizes: ['Standard Drop (35mm)'],
    description: 'Architectural silver drops with a mirror finish — a modern line drawn in cool light.',
  },
  // 9. Filigree Silver Jhumkas (MISSING - Add)
  {
    name: 'Filigree Silver Jhumkas',
    slug: 'filigree-silver-jhumkas',
    categoryName: 'Earrings',
    metal: 'silver',
    material: '925 Silver',
    price: 8600,
    oldPrice: 9800,
    badge: 'NEW ARRIVAL',
    rating: 4.8,
    reviews: 58,
    collection: 'Filigree Craft',
    metalWeight: '14.20 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-EAR-02',
    sizes: ['Standard Drop (38mm)'],
    description: 'Fine wire filigree work arranged in three delicate tiers with tiny soundless silver bells.',
  },
  // 10. Antique Gold Earrings (MISSING - Add)
  {
    name: 'Antique Gold Earrings',
    slug: 'antique-gold-earrings',
    categoryName: 'Earrings',
    metal: 'gold',
    material: '22K Gold',
    price: 47300,
    oldPrice: 52000,
    badge: 'NEW ARRIVAL',
    rating: 4.8,
    reviews: 44,
    collection: 'Temple Gold Heritage',
    metalWeight: '16.20 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-EAR-02',
    sizes: ['Standard Drop (36mm)'],
    description: 'Heirloom ear studs featuring antique floral engraving with hand-set kemp stones and golden drops.',
  },
  // 11. Bridal Gold Choker (MISSING - Add)
  {
    name: 'Bridal Gold Choker',
    slug: 'bridal-gold-choker',
    categoryName: 'Necklaces',
    metal: 'gold',
    material: '22K Gold',
    price: 184000,
    oldPrice: 198000,
    badge: 'ROYAL HEIRLOOM',
    rating: 4.9,
    reviews: 52,
    collection: 'Temple Gold Heritage',
    metalWeight: '56.40 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-CHK-01',
    sizes: ['Adjustable Dori (14-18 in)'],
    description: 'A regal temple choker set with intricate peacock and goddess motifs, finished with emerald-hued bead clusters.',
  },
  // 12. Meenakari Gold Pendant (MISSING - Add)
  {
    name: 'Meenakari Gold Pendant',
    slug: 'meenakari-gold-pendant',
    categoryName: 'Pendants',
    metal: 'gold',
    material: '22K Gold',
    price: 42800,
    oldPrice: 47500,
    badge: 'EXCLUSIVE',
    rating: 4.8,
    reviews: 37,
    collection: 'Temple Gold Heritage',
    metalWeight: '12.80 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-PND-01',
    sizes: ['Includes 18in Gold Plated Chain'],
    description: 'A radiant gold medallion enhanced with royal green and ruby-red Meenakari enameling in the Jaipur tradition.',
  },
  // 13. Maharani Gold Kada (MISSING - Add)
  {
    name: 'Maharani Gold Kada',
    slug: 'maharani-gold-kada',
    categoryName: 'Bangles',
    metal: 'gold',
    material: '22K Gold',
    price: 112000,
    oldPrice: 124000,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviews: 69,
    collection: 'Temple Gold Heritage',
    metalWeight: '38.50 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-KAD-01',
    sizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    description: 'An openable heavy kada embossed with floral scrolls and screw-lock mechanism for effortless regal wear.',
  },
  // 14. Pearl Silver Bracelet (MISSING - Add)
  {
    name: 'Pearl Silver Bracelet',
    slug: 'pearl-silver-bracelet',
    categoryName: 'Italian Chains & Bracelets',
    metal: 'silver',
    material: '925 Silver',
    price: 5900,
    oldPrice: 6800,
    badge: 'TRENDING',
    rating: 4.7,
    reviews: 86,
    collection: 'Moonlit Silver',
    metalWeight: '11.40 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-BRC-01',
    sizes: ['6.5 in', '7.0 in', '7.5 in'],
    description: 'Lustrous cultured freshwater pearls alternating with diamond-cut sterling silver beads on an adjustable lock.',
  },
  // 15. Sterling Silver Chain (MISSING - Add)
  {
    name: 'Sterling Silver Chain',
    slug: 'sterling-silver-chain',
    categoryName: 'Pure 92.5 Silver Chains',
    metal: 'silver',
    material: '925 Silver',
    price: 4100,
    oldPrice: 4800,
    badge: 'DAILY ESSENTIAL',
    rating: 4.8,
    reviews: 145,
    collection: 'Daily Luxury',
    metalWeight: '9.60 g',
    purity: '925 Sterling Silver Hallmarked',
    sku: 'SREE-SLV-CHN-01',
    sizes: ['18 in', '20 in', '22 in', '24 in'],
    description: 'A classic Italian box chain hand-crafted in pure 925 sterling silver with rhodium anti-tarnish protective polish.',
  },
  // 16. Antique Filigree Gold Ring (MISSING - Add)
  {
    name: 'Antique Filigree Gold Ring',
    slug: 'antique-filigree-gold-ring',
    categoryName: 'Rings',
    metal: 'gold',
    material: '22K Gold',
    price: 31200,
    oldPrice: 35000,
    badge: 'ARTISANAL',
    rating: 4.8,
    reviews: 51,
    collection: 'Filigree Craft',
    metalWeight: '6.40 g',
    purity: '22KT Solid Gold (BIS 916)',
    sku: 'SREE-GLD-RNG-02',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    description: 'An open filigree dome ring worked with micro-beads and delicate arches, radiating warm heirloom majesty.',
  }
];

async function main() {
  console.log('🔄 Checking existing products and categories in Sanity...');
  
  // 1. Fetch categories
  const categories = await client.fetch(`*[_type == "category"]{ _id, name, "slug": slug.current }`);
  const catMap = new Map();
  categories.forEach(c => {
    catMap.set(c.name.toLowerCase(), c._id);
    catMap.set(c.slug.toLowerCase(), c._id);
  });

  // 2. Fetch existing products
  const existingProducts = await client.fetch(`*[_type == "product"]{ _id, name, "slug": slug.current }`);
  const existingSlugs = new Set(existingProducts.map(p => p.slug || p._id));

  console.log(`Found ${existingProducts.length} existing products in Sanity.`);

  let addedCount = 0;

  for (const item of allInitialProducts) {
    if (existingSlugs.has(item.slug)) {
      console.log(`  ✓ Product already in Sanity: ${item.name} (${item.slug}) — Skipping to preserve changes/images.`);
      continue;
    }

    const catId = catMap.get(item.categoryName.toLowerCase());
    if (!catId) {
      console.warn(`  ⚠️ Category not found for ${item.name}: ${item.categoryName}`);
      continue;
    }

    console.log(`  + Creating new product in Sanity: ${item.name} [Category: ${item.categoryName}]`);
    await client.create({
      _type: 'product',
      name: item.name,
      slug: { _type: 'slug', current: item.slug },
      category: { _type: 'reference', _ref: catId },
      metal: item.metal,
      material: item.material,
      price: item.price,
      oldPrice: item.oldPrice,
      badge: item.badge,
      rating: item.rating,
      reviews: item.reviews,
      collection: item.collection,
      metalWeight: item.metalWeight,
      purity: item.purity,
      sku: item.sku,
      sizes: item.sizes,
      description: item.description,
    });
    addedCount++;
  }

  console.log(`\n🎉 Done! Added ${addedCount} missing products to Sanity Studio. Total products now: ${existingProducts.length + addedCount}`);
}

main().catch(console.error);
