'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ProductCategory } from '@/types';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/ui/ProductCard';
import SketchUnderline from '@/components/ui/SketchUnderline';

const ALL_CATEGORIES: { id: ProductCategory; label: string; slug: string; img: string; alt: string; types?: string[] }[] = [
  { id: 'Rings', label: 'Rings', slug: 'rings', img: '/assets/img/p-classic-gold-ring.png', alt: 'Gold & silver rings' },
  { id: 'Necklaces', label: 'Necklaces', slug: 'necklaces', img: '/assets/img/p-lakshmi-gold-necklace.png', alt: 'Nakshi, Temple & Gold finishing necklaces', types: ['All Necklaces', 'Nakshi Work', 'Temple Karigari', 'Gold Finishing'] },
  { id: 'Earrings', label: 'Earrings', slug: 'earrings', img: '/assets/img/p-heritage-jhumkas.png', alt: 'Heritage jhumkas & earrings' },
  { id: 'Bangles', label: 'Bangles', slug: 'bangles', img: '/assets/img/p-temple-gold-bangles.png', alt: 'Temple gold & silver bangles' },
  { id: 'Harams', label: 'Harams', slug: 'harams', img: '/assets/img/p-bridal-gold-choker.png', alt: 'Royal bridal harams & long sets' },
  { id: 'Kante', label: 'Kante', slug: 'kante', img: '/assets/img/banner-daily-wear.jpg', alt: 'Traditional rigid kante neck collars' },
  { id: 'Diamond Finishing', label: 'Diamond Finishing', slug: 'diamond-finishing', img: '/assets/img/p-meenakari-gold-pendant.png', alt: 'Diamond finishing fine jewellery' },
  { id: 'Jadau', label: 'Jadau', slug: 'jadau', img: '/assets/img/p-antique-gold-earrings.png', alt: 'Antique jadau karigari' },
  { id: 'Victorian Style', label: 'Victorian Style', slug: 'victorian-style', img: '/assets/img/p-filigree-silver-jhumkas.png', alt: 'Victorian lace silver filigree' },
  { id: 'Pure 92.5 Silver Chains', label: 'Pure 92.5 Silver Chains', slug: 'pure-silver-chains', img: '/assets/img/p-sterling-silver-chain.png', alt: 'Hand-linked 925 sterling silver chains' },
  { id: 'Italian Chains & Bracelets', label: 'Italian Chains & Bracelets', slug: 'italian-chains-bracelets', img: '/assets/img/p-pearl-silver-bracelet.png', alt: 'Italian chains and fine bracelets' },
  { id: 'Gents Kadas', label: 'Gents Kadas', slug: 'gents-kadas', img: '/assets/img/p-silver-kada.png', alt: 'Brushed solid 925 silver & gold kadas' },
  { id: 'Pendants', label: 'Pendants', slug: 'pendants', img: '/assets/img/p-lotus-silver-pendant.png', alt: 'Handcrafted spiritual and heirloom pendants' }
];

export default function CategorySection() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Rings');
  const [selectedType, setSelectedType] = useState<string>('All Necklaces');
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 300;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleCategorySelect = (catId: ProductCategory) => {
    setActiveCategory(catId);
    setSelectedType('All Necklaces');
  };

  const currentCategoryMeta = ALL_CATEGORIES.find(c => c.id === activeCategory) || ALL_CATEGORIES[0];

  // Strictly filter products belonging ONLY to this Sanity category
  const matching = products.filter(p => {
    const prodCat = (p.category || '').trim().toLowerCase();
    const targetCat = activeCategory.trim().toLowerCase();
    const targetSlug = (currentCategoryMeta?.slug || '').toLowerCase();
    const prodSlug = (p.categorySlug || '').trim().toLowerCase();

    // Strict 1:1 match against category name or category slug
    const isCatMatch = prodCat === targetCat || (targetSlug && (prodSlug === targetSlug || prodCat === targetSlug));
    if (!isCatMatch) return false;

    // Sub-style filtering (strictly applied within Necklaces category only)
    if (activeCategory === 'Necklaces' && selectedType && selectedType !== 'All Necklaces') {
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const coll = (p.collection || '').toLowerCase();
      const mat = (p.material || '').toLowerCase();

      if (selectedType === 'Nakshi Work') {
        return name.includes('nakshi') || desc.includes('nakshi') || coll.includes('nakshi') || desc.includes('filigree');
      }
      if (selectedType === 'Temple Karigari') {
        return coll.includes('temple') || name.includes('lakshmi') || name.includes('temple') || desc.includes('temple');
      }
      if (selectedType === 'Gold Finishing') {
        return p.metal === 'gold' || mat.includes('gold') || name.includes('gold');
      }
    }

    return true;
  });

  const displayProducts = matching;

  return (
    <section className="section category-section-container" id="categories" aria-labelledby="category-title">
      {/* Centered Heading */}
      <div className="section-heading centered">
        <p className="eyebrow">AUTHENTIC INDIAN JEWELLERY</p>
        <h2 id="category-title">Shop By <SketchUnderline text="Category" /></h2>
      </div>

      {/* Category Bubble Carousel with Snug Arrows */}
      <div className="category-track-wrapper">
        <button 
          type="button" 
          className="category-nav-arrow prev" 
          id="category-prev" 
          aria-label="Scroll categories left"
          onClick={() => scrollTrack('left')}
        >
          <svg className="icon" style={{ transform: 'rotate(180deg)' }}>
            <use href="#icon-arrow"></use>
          </svg>
        </button>

        <div className="category-track" id="category-track" ref={trackRef} aria-label="Jewellery categories">
          {ALL_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const isRings = cat.id === 'Rings';

            // Dynamically obtain the first product's image for this category
            const firstProductForCat = products.find(p => {
              const prodCat = (p.category || '').trim().toLowerCase();
              const targetCat = cat.id.trim().toLowerCase();
              const targetSlug = (cat.slug || '').toLowerCase();
              const prodSlug = (p.categorySlug || '').trim().toLowerCase();
              return prodCat === targetCat || (targetSlug && (prodSlug === targetSlug || prodCat === targetSlug));
            });

            const thumbnailSrc = firstProductForCat?.image || (firstProductForCat?.images && firstProductForCat.images[0]) || cat.img;

            return (
              <button
                key={cat.id}
                type="button"
                className={`category-item ${isSelected ? 'active' : ''}`}
                data-category={cat.id}
                aria-pressed={isSelected}
                onClick={() => handleCategorySelect(cat.id)}
              >
                <span className="category-bubble" id={isRings ? "rings-bubble" : undefined}>
                  {isRings ? (
                    <svg className="flat-ring scene-fallback" id="category-flat-ring" aria-hidden="true">
                      <use href="#flat-ring-art"></use>
                    </svg>
                  ) : (
                    <img 
                      src={thumbnailSrc}
                      alt={firstProductForCat?.name || cat.alt}
                      loading="lazy"
                      width={110}
                      height={110}
                    />
                  )}
                </span>
                <span className="category-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <button 
          type="button" 
          className="category-nav-arrow next" 
          id="category-next" 
          aria-label="Scroll categories right"
          onClick={() => scrollTrack('right')}
        >
          <svg className="icon">
            <use href="#icon-arrow"></use>
          </svg>
        </button>
      </div>

      {/* Optional Sub-Types Chips Bar (for Necklaces: Nakshi, Temple, Gold finishing) */}
      {currentCategoryMeta.types && (
        <div className="category-subtypes-bar">
          <span className="category-subtypes-label">Styles:</span>
          <div className="category-subtypes-list">
            {currentCategoryMeta.types.map((type) => (
              <button
                key={type}
                type="button"
                className={`category-subtype-chip ${selectedType === type ? 'is-active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="wrap">
        {displayProducts.length > 0 ? (
          <div className="grid-products" id="category-products" aria-labelledby="category-title">
            {displayProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} isNew={prod.category === activeCategory} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty" style={{ margin: '30px auto 20px', textAlign: 'center', padding: '48px 24px', background: '#faf7f2', borderRadius: '14px', border: '1px dashed rgba(201, 161, 90, 0.4)' }}>
            <h3 style={{ fontFamily: "var(--serif), serif", fontSize: '24px', color: 'var(--espresso)', marginBottom: '8px' }}>
              New Designs Coming Soon in {currentCategoryMeta.label}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'rgba(26, 20, 14, 0.65)', maxWidth: '480px', margin: '0 auto 18px', lineHeight: 1.6 }}>
              Our traditional karigars are creating new handcrafted designs for this collection. Please explore our other categories or chat with us on WhatsApp for custom jewellery.
            </p>
          </div>
        )}

        {/* Centered Show All Button */}
        {displayProducts.length > 0 && (
          <div className="category-show-all-wrap">
            <Link href={`/${currentCategoryMeta.slug}`} className="button secondary">
              Explore All {currentCategoryMeta.label}
              <svg className="icon">
                <use href="#icon-arrow"></use>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
