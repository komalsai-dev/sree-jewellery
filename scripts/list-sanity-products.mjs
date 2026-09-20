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
  const sanityProducts = await client.fetch(`*[_type == "product"]{
    _id,
    "id": coalesce(slug.current, _id),
    name,
    "category": category->name,
    "categorySlug": category->slug.current,
    "hasImage": defined(image.asset)
  }`);

  console.log('Sanity Products (' + sanityProducts.length + ' total):');
  sanityProducts.forEach(p => {
    console.log(`- [${p.category}] ${p.name} (slug: ${p.id}, hasImage: ${p.hasImage})`);
  });
}

main().catch(console.error);
