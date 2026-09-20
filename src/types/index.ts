export type ProductCategory = 
  | 'Rings' 
  | 'Earrings' 
  | 'Necklaces' 
  | 'Harams'
  | 'Kante'
  | 'Diamond Finishing'
  | 'Jadau'
  | 'Victorian Style'
  | 'Pure 92.5 Silver Chains'
  | 'Italian Chains & Bracelets'
  | 'Gents Kadas'
  | 'Bangles' 
  | 'Bracelets'
  | 'Pendants'
  | 'Chains'
  | string;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categorySlug?: string;
  price: number;
  oldPrice?: number | null;
  discount?: string;
  badge?: string | null;
  material: string;
  metal?: 'gold' | 'silver';
  label?: string;
  reviews?: number;
  rating?: number;
  collection?: string;
  image?: string;
  images?: string[];
  description?: string;
  metalWeight?: string;
  purity?: string;
  sku?: string;
  sizes?: string[];
  specs?: Record<string, Record<string, string>>;
}

export interface CartItem {
  id: string;
  size: string;
  quantity: number;
}

export interface CareContentItem {
  title: string;
  paragraphs: string[];
}

export interface CategoryMetaItem {
  title: string;
  subtitle: string;
  description: string;
}

