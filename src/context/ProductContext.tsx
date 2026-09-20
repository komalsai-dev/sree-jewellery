'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '@/types';
import { products as initialFallbackProducts } from '@/data/products';
import { BannerData } from '@/sanity/fetch';

const initialFallbackBanners: BannerData[] = [
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

interface ProductContextType {
  products: Product[];
  productMap: Map<string, Product>;
  banners: BannerData[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getBannerBySlug: (slug: string) => BannerData | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({
  children,
  initialProducts = initialFallbackProducts,
  initialBanners = initialFallbackBanners,
}: {
  children: React.ReactNode;
  initialProducts?: Product[];
  initialBanners?: BannerData[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [banners, setBanners] = useState<BannerData[]>(initialBanners);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state if server initial products change
  useEffect(() => {
    if (Array.isArray(initialProducts) && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  useEffect(() => {
    if (Array.isArray(initialBanners) && initialBanners.length > 0) {
      setBanners(initialBanners);
    }
  }, [initialBanners]);

  // Map for fast O(1) lookups
  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((p) => {
      map.set(p.id.toLowerCase(), p);
    });
    return map;
  }, [products]);

  const fetchLiveProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
          if (Array.isArray(data.banners) && data.banners.length > 0) {
            setBanners(data.banners);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch live Sanity data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync with Sanity on client mount & window focus
  useEffect(() => {
    fetchLiveProducts();

    const handleFocus = () => {
      fetchLiveProducts();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchLiveProducts]);

  const getProductById = useCallback(
    (id: string) => {
      const normalized = (id || '').toLowerCase().trim();
      return productMap.get(normalized) || products.find((p) => p.id.toLowerCase() === normalized);
    },
    [productMap, products]
  );

  const getBannerBySlug = useCallback(
    (slug: string) => {
      const normalized = (slug || '').toLowerCase().trim();
      return banners.find(b => (b.slug || b.id).toLowerCase() === normalized);
    },
    [banners]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        productMap,
        banners,
        isLoading,
        refreshProducts: fetchLiveProducts,
        getProductById,
        getBannerBySlug,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    const fallbackMap = new Map<string, Product>();
    initialFallbackProducts.forEach((p) => fallbackMap.set(p.id.toLowerCase(), p));
    return {
      products: initialFallbackProducts,
      productMap: fallbackMap,
      banners: initialFallbackBanners,
      isLoading: false,
      refreshProducts: async () => {},
      getProductById: (id: string) => fallbackMap.get((id || '').toLowerCase().trim()),
      getBannerBySlug: (slug: string) => initialFallbackBanners.find(b => (b.slug || b.id).toLowerCase() === (slug || '').toLowerCase().trim()),
    };
  }
  return context;
}
