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
const token = process.env.SANITY_API_WRITE_TOKEN;

async function checkCors() {
  const response = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('Current CORS origins:', data);
}

async function addCorsOrigin(origin) {
  console.log(`Adding CORS origin: ${origin}...`);
  const response = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      origin,
      allowCredentials: true,
    }),
  });

  const data = await response.json();
  console.log(`Status: ${response.status}`, data);
}

async function main() {
  await checkCors();
  await addCorsOrigin('http://localhost:3005');
  await checkCors();
}

main();
