'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useModals } from '@/context/ModalContext';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types';

const POPULAR_TAGS = ['Necklaces', 'Jhumkas', 'Kada', 'Gold', 'Silver'];

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useModals();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setResults([]);
      document.body.classList.add('modal-open');
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const handleSearch = (term: string) => {
    setQuery(term);
    const normalized = term.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!normalized) {
      setResults([]);
      return;
    }
    const filtered = products.filter(p => {
      const text = `${p.name} ${p.category} ${p.material} ${p.description || ''}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return text.includes(normalized);
    }).slice(0, 8);
    setResults(filtered);
  };

  const handleTagClick = (tag: string) => {
    handleSearch(tag);
    inputRef.current?.focus();
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isSearchOpen) return null;

  return (
    <>
      {/* Scrim / Backdrop overlay */}
      <div 
        className="search-scrim is-open" 
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Top Search Dropdown Overlay */}
      <div 
        className="search-ov is-open" 
        role="dialog" 
        aria-modal="true" 
        aria-label="Search jewellery"
      >
        <div className="search-ov__inner">
          {/* Main Search Input Bar */}
          <div className="search-ov__bar">
            <svg className="icon search-bar-icon" aria-hidden="true">
              <use href="#icon-search"></use>
            </svg>
            
            <input 
              ref={inputRef}
              type="search" 
              className="search-ov__input"
              placeholder="Search necklaces, jhumkas, kada…" 
              aria-label="Search jewellery"
              autoComplete="off"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <button 
              type="button" 
              className="icon-button search-close-btn" 
              aria-label="Close search"
              onClick={closeSearch}
            >
              <svg className="icon"><use href="#icon-close"></use></svg>
            </button>
          </div>

          {/* Popular Tag Chips */}
          <div className="search-ov__hints">
            <span className="hints-label">POPULAR:</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className="hint-chip"
                onClick={() => handleTagClick(tag)}
              >
                {tag.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Results Area */}
          {query.trim() && (
            <div className="search-ov__results" aria-live="polite">
              {results.length === 0 ? (
                <p className="search-ov__none">
                  Nothing found for “{query}”. Try “necklace”, “ring”, “jhumka”, or “silver”…
                </p>
              ) : (
                results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="sres-item"
                    onClick={closeSearch}
                  >
                    <div className="sres-thumb">
                      <img 
                        src={product.image || `https://placehold.co/120x150/dee4d8/241a16?text=${encodeURIComponent(product.name)}&font=playfair-display`} 
                        alt={product.name} 
                        loading="lazy" 
                      />
                    </div>
                    <div className="sres-info">
                      <strong className="sres-name">{product.name}</strong>
                      <span className="sres-meta">
                        {product.material} · {formattedPrice(product.price)}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
