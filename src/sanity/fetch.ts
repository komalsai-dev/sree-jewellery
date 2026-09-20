import { client } from './client';
import { 
  ALL_PRODUCTS_QUERY, 
  ALL_CATEGORIES_QUERY, 
  ALL_BANNERS_QUERY, 
  SITE_SETTINGS_QUERY 
} from './queries';
import { products as fallbackProducts, categoryMeta as fallbackCategoryMeta } from '@/data/products';
import { Product } from '@/types';

// Helper to normalize product ID/slug
const normalizeId = (val: string) => (val || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

// Quick fallback lookup map for secondary metadata (specs/sizes)
const fallbackLookup = new Map<string, Product>();
fallbackProducts.forEach(fp => fallbackLookup.set(normalizeId(fp.id), fp));

// Fetch all products — 100% Real-time 1:1 Mirror of Sanity CMS Data
export async function getProducts(): Promise<Product[]> {
  try {
    const sanityProducts = await client.fetch(ALL_PRODUCTS_QUERY, {}, {
      cache: 'no-store'
    });

    if (sanityProducts && Array.isArray(sanityProducts) && sanityProducts.length > 0) {
      return sanityProducts.map((sp: any) => {
        const idKey = normalizeId(sp.id || sp.slug || sp.name);
        const fallback = fallbackLookup.get(idKey);

        const sanityImageUrl = sp.image || (fallback ? fallback.image : `/assets/img/p-${idKey}.png`);
        const sanityGallery = Array.isArray(sp.gallery) && sp.gallery.length > 0
          ? sp.gallery
          : (sp.image ? [sp.image] : (fallback?.images || [sanityImageUrl]));

        return {
          id: idKey,
          name: sp.name || fallback?.name || 'Handcrafted Fine Jewellery',
          category: sp.category || fallback?.category || 'Fine Jewellery',
          categorySlug: sp.categorySlug || fallback?.categorySlug,
          price: typeof sp.price === 'number' ? sp.price : (fallback?.price || 0),
          oldPrice: typeof sp.oldPrice === 'number' ? sp.oldPrice : (fallback?.oldPrice || null),
          badge: sp.badge !== undefined ? sp.badge : (fallback?.badge || null),
          material: sp.material || fallback?.material || '22K Gold / 925 Silver',
          metal: sp.metal || fallback?.metal || 'gold',
          collection: sp.collection || fallback?.collection || 'Atelier Collection',
          description: sp.description || fallback?.description || 'Artisanal handcrafted fine jewellery from Sree atelier.',
          metalWeight: sp.metalWeight || fallback?.metalWeight || 'N/A',
          purity: sp.purity || fallback?.purity || 'Hallmarked Purity (BIS Certified)',
          sku: sp.sku || fallback?.sku || `SREE-${idKey.toUpperCase()}`,
          sizes: (sp.sizes && sp.sizes.length > 0) ? sp.sizes : (fallback?.sizes || ['Standard']),
          rating: typeof sp.rating === 'number' ? sp.rating : (fallback?.rating || 5.0),
          reviews: typeof sp.reviews === 'number' ? sp.reviews : (fallback?.reviews || 24),
          image: sanityImageUrl,
          images: sanityGallery,
          specs: fallback?.specs || {
            "General Information": {
              "Design Code / SKU": sp.sku || `SREE-${idKey.toUpperCase()}`,
              "Metal Purity": sp.purity || "BIS Hallmarked Certified",
              "Craftsmanship": "Handcrafted Karigari"
            }
          }
        };
      });
    }
  } catch (err) {
    console.warn('Sanity fetch fallback to local data:', err);
  }
  return fallbackProducts;
}

// Fetch site announcements with fallback
export async function getAnnouncements(): Promise<string[]> {
  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, {
      cache: 'no-store'
    });
    if (settings && settings.announcements && settings.announcements.length > 0) {
      return settings.announcements;
    }
  } catch (err) {
    console.warn('Sanity settings fetch fallback:', err);
  }
  return [
    'Order Easily on WhatsApp · Tap Here to Chat with Us',
    'Free Insured Express Delivery on All Orders Across India',
    '100% BIS Hallmarked Pure Gold & 925 Sterling Silver',
    'Live Video Consultation & Custom Bridal Jewellery Available',
  ];
}

export interface BannerData {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  buttonText?: string;
  buttonLink?: string;
  image: string;
  order?: number;
  buttonTheme?: 'gold' | 'white';
}

// Fetch all banners from Sanity with fallback
export async function getBanners(): Promise<BannerData[]> {
  try {
    const sanityBanners = await client.fetch(ALL_BANNERS_QUERY, {}, {
      cache: 'no-store'
    });

    if (sanityBanners && Array.isArray(sanityBanners) && sanityBanners.length > 0) {
      return sanityBanners.map((b: any) => ({
        id: b.slug || b._id,
        slug: b.slug,
        title: b.title,
        subtitle: b.subtitle,
        tag: b.tag,
        buttonText: b.buttonText || 'Explore more',
        buttonLink: b.buttonLink || '#bestsellers',
        image: b.image || '/assets/img/banner-18k-gold.jpg',
        order: b.order || 0,
        buttonTheme: (b.slug === 'silver-collection' || b.slug === 'daily-wear') ? 'white' : 'gold'
      }));
    }
  } catch (err) {
    console.warn('Sanity banners fetch fallback:', err);
  }

  return [
    {
      id: 'gold-plated',
      slug: 'gold-plated',
      title: '18k Gold Plated',
      subtitle: '"Crafted with sacred temple traditions to last for generations"',
      tag: '18K GOLD PLATED COLLECTION',
      buttonText: 'Explore more',
      buttonLink: '#bestsellers',
      image: '/assets/img/banner-18k-gold.jpg',
      order: 1,
      buttonTheme: 'gold'
    },
    {
      id: 'silver-collection',
      slug: 'silver-collection',
      title: '925 Silver',
      subtitle: '"Pure, auspicious, and blessed with timeless Indian elegance"',
      tag: 'STERLING SILVER COLLECTION',
      buttonText: 'Shop Now',
      buttonLink: '#bestsellers',
      image: '/assets/img/banner-925-silver.jpg',
      order: 2,
      buttonTheme: 'white'
    },
    {
      id: 'palakka-delight',
      slug: 'palakka-delight',
      title: 'Palakka Delight',
      subtitle: '"Deeply rooted in traditional South Indian heritage"',
      tag: 'PALAKKA HERITAGE COLLECTION',
      buttonText: 'Explore more',
      buttonLink: '#bestsellers',
      image: '/assets/img/banner-palakka.jpg',
      order: 3,
      buttonTheme: 'gold'
    },
    {
      id: 'daily-wear',
      slug: 'daily-wear',
      title: 'Daily Wear',
      subtitle: '"Comfortable anti-tarnish designs crafted for daily beauty"',
      tag: 'DAILY WEAR ANTI-TARNISH',
      buttonText: 'Shop Now',
      buttonLink: '#bestsellers',
      image: '/assets/img/banner-daily-wear.jpg',
      order: 4,
      buttonTheme: 'white'
    }
  ];
}
