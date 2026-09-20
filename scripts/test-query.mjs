import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'cnjoffkd',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

async function main() {
  const query = `*[_type == "product"]{
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
    "image": image.asset->url,
    "gallery": gallery[].asset->url
  }`;

  const products = await client.fetch(query);
  console.log(`Found ${products.length} products in Sanity:`);
  for (const p of products) {
    console.log(`- [${p.id}] ${p.name} | Cat: ${p.category} | Image: ${p.image || '(no image)'}`);
  }
}

main().catch(console.error);
