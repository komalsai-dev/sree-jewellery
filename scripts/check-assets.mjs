import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'cnjoffkd',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

async function main() {
  const assets = await client.fetch('*[_type == "sanity.imageAsset"] | order(_createdAt desc) { _id, url, originalFilename, _createdAt }');
  console.log('Sanity Image Assets:', JSON.stringify(assets, null, 2));
}

main().catch(console.error);
