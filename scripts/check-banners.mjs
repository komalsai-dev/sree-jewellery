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
  const banners = await client.fetch(`*[_type == "banner"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tag,
    buttonText,
    buttonLink,
    order,
    isActive,
    "image": image.asset->url
  }`);
  console.log(`Found ${banners.length} banners in Sanity Studio:`);
  banners.forEach(b => {
    console.log(`- [#${b.order}] ${b.title} (${b.slug}) | Image: ${b.image}`);
  });
}

main().catch(console.error);
