'use client';

import React from 'react';
import { bestSellerIds } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/ui/ProductCard';
import SketchUnderline from '@/components/ui/SketchUnderline';

export default function BestsellersSection() {
  const { products } = useProducts();
  const bestSellers = React.useMemo(() => {
    const sanityBestsellers = products.filter(p => (p.badge || '').toLowerCase().includes('bestseller'));
    if (sanityBestsellers.length >= 4) {
      return sanityBestsellers.slice(0, 8);
    }
    const mapped = bestSellerIds.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
    const combined = [...sanityBestsellers, ...mapped.filter(m => !sanityBestsellers.some(s => s.id === m.id))];
    return (combined.length > 0 ? combined : products).slice(0, 8);
  }, [products]);

  return (
    <section className="section bestseller-section" id="bestsellers" aria-labelledby="bestseller-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">MOST LOVED BY FAMILIES</p>
          <h2 id="bestseller-title">All-Time <SketchUnderline text="Favourites" /></h2>
          <p>Our most cherished traditional designs, chosen for weddings, festive gifts, and family celebrations.</p>
        </div>
        <a className="text-link" href="#categories">
          Explore All Jewellery 
          <svg className="icon">
            <use href="#icon-arrow"></use>
          </svg>
        </a>
      </div>

      <div className="product-grid" id="bestseller-products" aria-label="Eight best-selling jewellery pieces">
        {bestSellers.map((product) => (
          product && <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="grid-footer" data-reveal>
        <a className="button secondary" href="#categories">
          Find Your Family Heirloom 
          <svg className="icon">
            <use href="#icon-arrow"></use>
          </svg>
        </a>
      </div>
    </section>
  );
}
