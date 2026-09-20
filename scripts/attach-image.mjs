import { createClient } from 'next-sanity';
import fs from 'fs';

// Parse .env.local manually
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

async function main() {
  const assetId = 'image-50ec9b5f405a7a0d60ff6765667009c7b51a70cc-1269x1239-jpg';
  
  // Find Heritage Jhumkas product
  const product = await client.fetch('*[_type == "product" && (slug.current == "heritage-jhumkas" || name == "Heritage Jhumkas")][0]');
  if (product) {
    console.log('Found product:', product._id, product.name);
    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId
          }
        },
        gallery: [
          {
            _type: 'image',
            _key: 'img-1',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          }
        ]
      })
      .commit();
    console.log('✅ Successfully attached uploaded image to Heritage Jhumkas in Sanity!');
  } else {
    console.log('Product not found!');
  }
}

main().catch(console.error);
