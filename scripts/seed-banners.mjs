import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

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

const bannerConfigs = [
  {
    title: '18k Gold Plated',
    slug: 'gold-plated',
    subtitle: '"Crafted to shine. Designed to last"',
    tag: '18K GOLD PLATED COLLECTION',
    buttonText: 'Discover more',
    buttonLink: '#bestsellers',
    order: 1,
    isActive: true,
    localFile: 'public/assets/img/banner-18k-gold.jpg',
    filename: 'banner-18k-gold.jpg'
  },
  {
    title: '925 Silver',
    slug: 'silver-collection',
    subtitle: '"Pure. Timeless. Always elegant"',
    tag: 'STERLING SILVER COLLECTION',
    buttonText: 'Shop Now',
    buttonLink: '#bestsellers',
    order: 2,
    isActive: true,
    localFile: 'public/assets/img/banner-925-silver.jpg',
    filename: 'banner-925-silver.jpg'
  },
  {
    title: 'Palakka Delight',
    slug: 'palakka-delight',
    subtitle: '"Rooted in tradition."',
    tag: 'PALAKKA DELIGHT COLLECTION',
    buttonText: 'Discover more',
    buttonLink: '#bestsellers',
    order: 3,
    isActive: true,
    localFile: 'public/assets/img/banner-palakka.jpg',
    filename: 'banner-palakka.jpg'
  },
  {
    title: 'Daily Wear',
    slug: 'daily-wear',
    subtitle: '"Anti-tarnish designs made for everyday elegance"',
    tag: 'DAILY WEAR ANTI-TARNISH',
    buttonText: 'Shop Now',
    buttonLink: '#bestsellers',
    order: 4,
    isActive: true,
    localFile: 'public/assets/img/banner-daily-wear.jpg',
    filename: 'banner-daily-wear.jpg'
  },
  {
    title: 'The Festive Edit',
    slug: 'festive-edit',
    subtitle: 'Handcrafted in 22K gold & 925 sterling silver with lifelong artisanal mastery.',
    tag: 'THE CAMPAIGN',
    buttonText: 'Discover The Collection',
    buttonLink: '#bestsellers',
    order: 5,
    isActive: true,
    localFile: 'public/assets/img/banner.png',
    filename: 'banner.png'
  }
];

async function main() {
  console.log('🖼️ Uploading banner images and creating Banner documents in Sanity Studio...');

  // Check existing banners
  const existingBanners = await client.fetch(`*[_type == "banner"]{ _id, title, "slug": slug.current }`);
  const existingMap = new Map();
  existingBanners.forEach(b => existingMap.set(b.slug || b.title.toLowerCase().replace(/\s+/g, '-'), b._id));

  for (const cfg of bannerConfigs) {
    console.log(`\nProcessing banner: ${cfg.title} (${cfg.slug})...`);
    
    // 1. Upload image to Sanity asset
    const filePath = path.resolve(cfg.localFile);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    console.log(`  + Uploading ${cfg.filename} to Sanity Assets...`);
    const stream = fs.createReadStream(filePath);
    const assetDoc = await client.assets.upload('image', stream, {
      filename: cfg.filename,
    });
    console.log(`  ✓ Uploaded asset: ${assetDoc._id}`);

    const docPayload = {
      _type: 'banner',
      title: cfg.title,
      slug: { _type: 'slug', current: cfg.slug },
      subtitle: cfg.subtitle,
      tag: cfg.tag,
      buttonText: cfg.buttonText,
      buttonLink: cfg.buttonLink,
      order: cfg.order,
      isActive: cfg.isActive,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetDoc._id,
        },
      },
    };

    const existingId = existingMap.get(cfg.slug);
    if (existingId) {
      console.log(`  + Updating existing banner document ${existingId}...`);
      await client.patch(existingId).set(docPayload).commit();
      console.log(`  ✓ Updated banner: ${cfg.title}`);
    } else {
      console.log(`  + Creating new banner document...`);
      const created = await client.create(docPayload);
      console.log(`  ✓ Created banner: ${cfg.title} (_id: ${created._id})`);
    }
  }

  console.log('\n🎉 ALL BANNERS UPLOADED AND SEEDED IN SANITY STUDIO SUCCESSFULLY!');
}

main().catch(console.error);
