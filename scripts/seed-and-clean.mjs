import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cnjoffkd';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN is required in .env.local to clean and seed data.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  token,
  useCdn: false,
});

const CATEGORIES_DATA = [
  { name: 'Rings', slug: 'rings', subtitle: 'Solitaires, Bands & Pavé Settings', description: 'Every Sree ring is balanced to sit with weightless comfort, crowned with hand-cut stones and antique temple engravings.', order: 1 },
  { name: 'Necklaces', slug: 'necklaces', subtitle: 'Nakshi, Temple Karigari & Chokers', description: 'Heirloom craftsmanship designed to frame your neckline with timeless refinement and unmatched radiance.', order: 2 },
  { name: 'Earrings', slug: 'earrings', subtitle: 'Jhumkas, Balis & Sculptural Studs', description: 'From lightweight everyday drops to dramatic heritage jhumkas, each pair is balanced for all-day comfort and undeniable distinction.', order: 3 },
  { name: 'Bangles', slug: 'bangles', subtitle: 'Temple Bangles, Kadas & Bracelets', description: 'Fluid curves and heritage textures engineered for effortless layering and tactile elegance.', order: 4 },
  { name: 'Harams', slug: 'harams', subtitle: 'Imperial Bridal Harams', description: 'Regal multi-strand and temple harams crafted for royal festive celebrations and bridal grandeur.', order: 5 },
  { name: 'Kante', slug: 'kante', subtitle: 'Rigid Collar Neckpieces', description: 'Traditional rigid neck collars inspired by antique royal treasuries, sculpted to rest gracefully on the collarbone.', order: 6 },
  { name: 'Diamond Finishing', slug: 'diamond-finishing', subtitle: 'Precision Pavé & Solitaire Cuts', description: 'Ultra-precise diamond finishing reflecting light like faceted crystal, set in 18K gold and silver mounts.', order: 7 },
  { name: 'Jadau', slug: 'jadau', subtitle: 'Heritage Foil-Set Gemstones', description: 'Centuries-old Jadau karigari embedding uncut gemstones within pure precious metal foils.', order: 8 },
  { name: 'Victorian Style', slug: 'victorian-style', subtitle: 'Lace Filigree & Antique Patina', description: 'Intricate Victorian lace patterns hand-drawn with fine wirework and dark antique patina.', order: 9 },
  { name: 'Pure 92.5 Silver Chains', slug: 'pure-silver-chains', subtitle: 'Hand-Linked 925 Sterling Silver', description: 'Precision hand-linked sterling silver chains with tarnish-resistant protective finish for daily luxury.', order: 10 },
  { name: 'Italian Chains & Bracelets', slug: 'italian-chains-bracelets', subtitle: 'Fluid Italian Link Chains & Bracelets', description: 'Modern Italian chain silhouettes and flexible link bracelets engineered for fluid drape and movement.', order: 11 },
  { name: 'Gents Kadas', slug: 'gents-kadas', subtitle: 'Brushed Solid Silver & Gold Kadas', description: 'Weighty, masculine solid 925 silver and gold kadas with brushed satin textures and sculpted bevels.', order: 12 },
  { name: 'Pendants', slug: 'pendants', subtitle: 'Lotus & Meenakari Amulets', description: 'Delicate centerpieces holding radiant uncut stones and geometric motifs that hold meaning close to your heart.', order: 13 },
  { name: 'Chains', slug: 'chains', subtitle: 'Hand-Linked Sterling & Gold Chains', description: 'Precision-machined fine link chains finished with anti-tarnish protective coatings for daily durability.', order: 14 },
];

const INITIAL_PRODUCTS = [
  {
    name: 'Temple Gold Bangles · Pair',
    slug: 'temple-gold-bangles',
    categorySlug: 'bangles',
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
  {
    name: 'Lakshmi Gold Necklace',
    slug: 'lakshmi-gold-necklace',
    categorySlug: 'necklaces',
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
  {
    name: 'Heritage Jhumkas',
    slug: 'heritage-jhumkas',
    categorySlug: 'earrings',
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
  {
    name: 'Classic Gold Ring',
    slug: 'classic-gold-ring',
    categorySlug: 'rings',
    metal: 'gold',
    material: '18K Gold',
    price: 38400,
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
  {
    name: 'Lotus Silver Pendant',
    slug: 'lotus-silver-pendant',
    categorySlug: 'pendants',
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
  {
    name: 'Silver Kada',
    slug: 'silver-kada',
    categorySlug: 'bangles',
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
  {
    name: 'Minimal Silver Ring',
    slug: 'minimal-silver-ring',
    categorySlug: 'rings',
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
  {
    name: 'Contemporary Silver Earrings',
    slug: 'contemporary-silver-earrings',
    categorySlug: 'earrings',
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
  }
];

async function main() {
  console.log('🧹 Step 1: Cleaning previous data from Sanity project...');
  
  const existingDocs = await client.fetch('*[_type in ["product", "category", "banner", "labelSettings", "siteSettings", "review"]]._id');
  console.log(`Found ${existingDocs.length} existing documents to clean.`);
  
  if (existingDocs.length > 0) {
    const tx = client.transaction();
    for (const docId of existingDocs) {
      tx.delete(docId);
    }
    await tx.commit();
    console.log('✅ Cleared old documents.');
  }

  console.log('🏷️ Step 2: Seeding fresh Categories...');
  const categoryMap = new Map();
  
  for (const cat of CATEGORIES_DATA) {
    const doc = await client.create({
      _type: 'category',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      subtitle: cat.subtitle,
      description: cat.description,
      order: cat.order,
      isFeatured: true,
    });
    categoryMap.set(cat.slug, doc._id);
    console.log(`  + Category: ${cat.name} (${doc._id})`);
  }

  console.log('💎 Step 3: Seeding initial Products...');
  for (const prod of INITIAL_PRODUCTS) {
    const catId = categoryMap.get(prod.categorySlug);
    if (!catId) continue;

    await client.create({
      _type: 'product',
      name: prod.name,
      slug: { _type: 'slug', current: prod.slug },
      category: { _type: 'reference', _ref: catId },
      metal: prod.metal,
      material: prod.material,
      price: prod.price,
      oldPrice: prod.oldPrice || undefined,
      badge: prod.badge || undefined,
      rating: prod.rating,
      reviews: prod.reviews,
      collection: prod.collection,
      metalWeight: prod.metalWeight,
      purity: prod.purity,
      sku: prod.sku,
      sizes: prod.sizes,
      description: prod.description,
    });
    console.log(`  + Product: ${prod.name}`);
  }

  console.log('⚙️ Step 4: Seeding Global Site Settings & Announcements...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    storeName: 'Sree Jewellery',
    tagline: 'Handcrafted in Tradition, Worn for Generations',
    announcements: [
      'Quick & Easy WhatsApp Orders — Tap to Chat With Us',
      'Free Insured Delivery on orders above ₹1,000',
      'International & Worldwide Shipping Available',
      'Instant Video Consultation & Custom Karigari Available',
    ],
    whatsappNumber: '+91 98765 43210',
    supportEmail: 'concierge@sreejewellery.com',
    freeShippingThreshold: 1000,
    storeAddress: 'Heritage Workshop Road, Hyderabad, Telangana — 500002',
    footerText: '© 2026 Sree Jewellery. 22K Gold & 925 Sterling Silver Heirlooms.',
  });
  console.log('✅ Global site settings seeded.');

  console.log('\n🎉 ALL DONE! Sanity Studio is clean, structured, and ready to use at /studio.');
}

main().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
