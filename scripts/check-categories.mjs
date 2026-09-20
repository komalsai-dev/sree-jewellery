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
  const categories = await client.fetch(`*[_type == "category"] | order(order asc) { _id, name, "slug": slug.current, order }`);
  console.log('Categories in Sanity (' + categories.length + '):');
  categories.forEach(c => console.log(`- ${c.name} (slug: ${c.slug}, _id: ${c._id})`));
}

main().catch(console.error);
