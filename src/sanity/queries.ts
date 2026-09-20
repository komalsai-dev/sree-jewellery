import { groq } from 'next-sanity';

// 1. Fetch all products with category data
export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(name asc) {
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
  }
`;

// 2. Fetch products for a specific category slug
export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && (category->slug.current == $slug || category->name == $categoryName)] | order(name asc) {
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
  }
`;

// 3. Fetch single product by slug or id
export const SINGLE_PRODUCT_QUERY = groq`
  *[_type == "product" && (slug.current == $slug || _id == $slug)][0] {
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
  }
`;

// 4. Fetch all categories
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    description,
    order,
    isFeatured,
    "bannerImage": bannerImage.asset->url
  }
`;

// 5. Fetch all active banners
export const ALL_BANNERS_QUERY = groq`
  *[_type == "banner" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    tag,
    buttonText,
    buttonLink,
    order,
    "image": image.asset->url
  }
`;

// 6. Fetch site settings & announcements
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    storeName,
    tagline,
    announcements,
    whatsappNumber,
    supportEmail,
    freeShippingThreshold,
    storeAddress,
    footerText
  }
`;
