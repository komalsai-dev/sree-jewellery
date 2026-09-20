'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';

export default function CollectionBannersSection() {
  const { banners } = useProducts();

  // Filter 4 homepage collection grid banners (order 1-4 or slug match)
  const gridBanners = banners.filter(b => b.slug !== 'festive-edit').slice(0, 4);

  return (
    <section className="section collection-banners-section" id="collection-banners" aria-label="Curated Jewellery Banners">
      <div className="collection-banners-container">
        <div className="collection-banners-grid">
          {gridBanners.map((banner) => (
            <Link 
              key={banner.id || banner.slug} 
              href={banner.buttonLink || '#bestsellers'}
              className="collection-banner-card"
              data-banner={banner.slug || banner.id}
            >
              <div className="collection-banner-media">
                <img 
                  src={banner.image} 
                  alt={banner.title || 'Fine Jewellery Collection'}
                  loading="lazy"
                  width={960}
                  height={540}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
