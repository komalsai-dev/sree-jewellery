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
  useCdn: false,
});

async function main() {
  const query = `*[_type == "product"] | order(name asc) {
    _id,
    "id": coalesce(slug.current, _id),
    name,
    "category": category->name,
    "categorySlug": category->slug.current,
    price,
    oldPrice,
    badge,
    material,
    metal,
    collection,
    description,
    metalWeight,
    purity,
    sku,
    sizes,
    rating,
    reviews,
    "image": image.asset->url,
    "gallery": gallery[].asset->url
  }`;

  const sanityProducts = await client.fetch(query);
  console.log('Fetched from Sanity:', sanityProducts.length, 'products');
  const jhumkas = sanityProducts.find(p => p.name === 'Heritage Jhumkas' || p.id === 'heritage-jhumkas');
  console.log('Heritage Jhumkas in Sanity:', JSON.stringify(jhumkas, null, 2));
}

main().catch(console.error);
