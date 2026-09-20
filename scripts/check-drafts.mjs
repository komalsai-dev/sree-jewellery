import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'cnjoffkd',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

async function main() {
  const allDocs = await client.fetch(`*[_type == "product" || _id in path("drafts.**")]{
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    "imageAsset": image.asset._ref,
    "category": category->name
  }`);
  console.log(JSON.stringify(allDocs, null, 2));
}

main().catch(console.error);
