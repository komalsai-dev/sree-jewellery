'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categoryMeta } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/ui/ProductCard';

const CATEGORY_MAP: Record<string, string> = {
  'rings': 'Rings',
  'necklaces': 'Necklaces',
  'earrings': 'Earrings',
  'harams': 'Harams',
  'kante': 'Kante',
  'diamond-finishing': 'Diamond Finishing',
  'jadau': 'Jadau',
  'victorian-style': 'Victorian Style',
  'pure-silver-chains': 'Pure 92.5 Silver Chains',
  'italian-chains-bracelets': 'Italian Chains & Bracelets',
  'gents-kadas': 'Gents Kadas',
  'bangles': 'Bangles',
  'bracelets': 'Italian Chains & Bracelets',
  'pendants': 'Pendants',
  'chains': 'Pure 92.5 Silver Chains'
};

const CATEGORY_LIST = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Harams',
  'Kante',
  'Diamond Finishing',
  'Jadau',
  'Victorian Style',
  'Pure 92.5 Silver Chains',
  'Italian Chains & Bracelets',
  'Gents Kadas',
  'Bangles',
  'Pendants'
];

export default function CategoryListingPage() {
  const params = useParams();
  const rawParam = (params?.category as string || '').toLowerCase();
  const { products } = useProducts();
  
  // Determine initial filter state from URL
  const initialMetal = rawParam === 'silver' ? 'silver' : rawParam === 'gold' ? 'gold' : 'all';
  const initialCategory = CATEGORY_MAP[rawParam] || 'all';

  const [selectedMetal, setSelectedMetal] = useState<string>(initialMetal);
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('featured');
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollCategoryChips = (direction: 'left' | 'right') => {
    if (!categoryScrollRef.current) return;
    const distance = 240;
    categoryScrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  // Synchronize state when URL parameter changes
  useEffect(() => {
    const nextMetal = rawParam === 'silver' ? 'silver' : rawParam === 'gold' ? 'gold' : 'all';
    const nextCategory = CATEGORY_MAP[rawParam] || 'all';
    setSelectedMetal(nextMetal);
    setSelectedCat(nextCategory);
  }, [rawParam]);

  // Page title and metadata
  const meta = categoryMeta[rawParam] || {
    title: rawParam === 'shop' 
      ? 'All Jewellery' 
      : rawParam === 'silver' 
        ? 'The Silver House' 
        : rawParam === 'gold' 
          ? 'The Gold House' 
          : (CATEGORY_MAP[rawParam] || rawParam.charAt(0).toUpperCase() + rawParam.slice(1)),
    subtitle: "Artisanal Fine Jewellery Collection",
    description: "22-karat, BIS-hallmarked gold and certified 925 sterling silver — warm, engraved, unforgettable."
  };

  // Smart Filter & Sort Logic matching client taxonomy
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchMetal = selectedMetal === 'all' || p.metal === selectedMetal;
      
      let matchCat = true;
      if (selectedCat !== 'all') {
        const c = selectedCat.toLowerCase();
        const pCat = (p.category || '').toLowerCase();
        const pSlug = (p.categorySlug || '').toLowerCase();
        matchCat = pCat === c || pSlug === c || (CATEGORY_MAP[c] && pCat === CATEGORY_MAP[c].toLowerCase());
      }

      return matchMetal && matchCat;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured / bestseller first
      result.sort((a, b) => (b.badge === 'BESTSELLER' ? 1 : 0) - (a.badge === 'BESTSELLER' ? 1 : 0));
    }

    return result;
  }, [selectedMetal, selectedCat, sortBy]);

  const pageTitle = selectedCat !== 'all' 
    ? selectedCat 
    : selectedMetal === 'gold' 
      ? 'The Gold House' 
      : selectedMetal === 'silver' 
        ? 'The Silver House' 
        : (meta.title || 'All Jewellery');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: '125px', paddingBottom: '90px', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <p className="crumbs" style={{ fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26, 20, 14, 0.5)', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }} aria-label="Breadcrumb">
          <Link href="/" style={{ color: 'rgba(26, 20, 14, 0.6)', transition: 'color 0.2s' }}>Home</Link>
          <span>/</span>
          {selectedMetal === 'gold' ? (
            <span style={{ color: 'var(--espresso)', fontWeight: 600 }}>18K Gold Plated</span>
          ) : selectedMetal === 'silver' ? (
            <span style={{ color: 'var(--espresso)', fontWeight: 600 }}>925 Silver</span>
          ) : selectedCat !== 'all' ? (
            <span style={{ color: 'var(--espresso)', fontWeight: 600 }}>{selectedCat}</span>
          ) : (
            <span style={{ color: 'var(--espresso)', fontWeight: 600 }}>Shop</span>
          )}
        </p>

        {/* Heading & Counter Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', margin: '0 0 4px' }}>
          <h1 style={{ fontFamily: "var(--font-cinzel), 'Cinzel Decorative', 'Cinzel', var(--serif), serif", fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 500, lineHeight: 1.12, margin: 0, color: 'var(--espresso)', letterSpacing: '-0.01em' }}>
            {pageTitle === 'The Gold House' || pageTitle === '18K Gold Plated' ? (
              <>18K <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Gold</em> Plated.</>
            ) : pageTitle === 'The Silver House' || pageTitle === '925 Sterling Silver' ? (
              <>925 <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Silver</em> House.</>
            ) : pageTitle === 'All Jewellery' ? (
              <>All <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Jewellery.</em></>
            ) : (
              <>{pageTitle} <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>· Sree.</em></>
            )}
          </h1>
          <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(26, 20, 14, 0.55)', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
          </span>
        </div>

        {/* Description - Sits right above the category bar with ZERO divider lines */}
        <p style={{ fontSize: '13px', color: 'rgba(26, 20, 14, 0.72)', maxWidth: '62ch', margin: '0 0 14px', lineHeight: 1.55 }}>
          {meta.description || (
            selectedCat !== 'all'
              ? `Handcrafted ${selectedCat.toLowerCase()} from the Sree ateliers — 22K gold & 925 silver.`
              : selectedMetal === 'gold'
                ? '22-karat, BIS-hallmarked gold — warm, engraved, unforgettable.'
                : selectedMetal === 'silver'
                  ? 'Certified 925 sterling silver — cool lines and moonlit finishes.'
                  : 'The complete house — every gold and silver piece currently at the workbench.'
          )}
        </p>

        {/* Refined Filter Toolbar - Sits cleanly between description and products with zero overlap */}
        <div className="shop-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', padding: 0, border: 'none', margin: '14px 0 32px 0', background: 'transparent', position: 'static', top: 'auto', clear: 'both', zIndex: 2 }}>
          {/* Metal Filter Chips */}
          <div className="filter-chips-metal" style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
            <button 
              type="button" 
              className={`chip ${selectedMetal === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedMetal('all')}
            >
              All
            </button>
            <button 
              type="button" 
              className={`chip chip--gold ${selectedMetal === 'gold' ? 'is-active' : ''}`}
              onClick={() => setSelectedMetal('gold')}
            >
              Gold
            </button>
            <button 
              type="button" 
              className={`chip chip--silver ${selectedMetal === 'silver' ? 'is-active' : ''}`}
              onClick={() => setSelectedMetal('silver')}
            >
              Silver
            </button>
          </div>

          {/* Category Filter Chips with Snug Arrow Controls and Hidden Scrollbar */}
          <div className="category-chips-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0, maxWidth: '780px' }}>
            <button 
              type="button" 
              className="chip-arrow prev" 
              aria-label="Scroll categories left"
              onClick={() => scrollCategoryChips('left')}
            >
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div className="category-chips-scroll" ref={categoryScrollRef}>
              <button 
                type="button" 
                className={`chip ${selectedCat === 'all' ? 'is-active' : ''}`}
                onClick={() => setSelectedCat('all')}
              >
                All Categories
              </button>
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`chip ${selectedCat.toLowerCase() === cat.toLowerCase() ? 'is-active' : ''}`}
                  onClick={() => setSelectedCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button 
              type="button" 
              className="chip-arrow next" 
              aria-label="Scroll categories right"
              onClick={() => scrollCategoryChips('right')}
            >
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          {/* Sort Select Dropdown */}
          <div className="shop-sort">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · Low to High</option>
              <option value="price-desc">Price · High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name · A–Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid - Sits 36px below category bar with ZERO overlap */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty">
            <h3>No pieces match this selection — yet.</h3>
            <p>Try selecting all categories or reset your metal filter.</p>
            <button 
              type="button" 
              className="button secondary"
              onClick={() => { setSelectedMetal('all'); setSelectedCat('all'); }}
            >
              View All Pieces
            </button>
          </div>
        ) : (
          <div className="grid-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px 22px', position: 'relative', zIndex: 1, marginTop: '0', clear: 'both' }}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
