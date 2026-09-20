'use client';

import React from 'react';
import { useModals } from '@/context/ModalContext';
import { useProducts } from '@/context/ProductContext';
import SketchUnderline from '@/components/ui/SketchUnderline';

export default function EditorialSection() {
  const { openQuickView } = useModals();
  const { getProductById } = useProducts();

  const handleProductClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const prod = getProductById(id);
    if (prod) openQuickView(prod);
  };

  return (
    <section className="editorial-section" id="editorial" aria-labelledby="editorial-title">
      {/* Editorial Luxury Backdrop */}
      <div className="editorial-backdrop" data-parallax>
        <img 
          id="editorial-image" 
          src="/assets/img/poster.png"
          alt="The Muse Edit — High Jewellery Lifestyle Campaign" 
          loading="lazy" 
          width={1920} 
          height={1300} 
        />
        <div className="editorial-backdrop__overlay" />
      </div>

      {/* Editorial Headline Hero Card */}
      <div className="editorial-copy" data-reveal>
        <span className="editorial-copy__pill">HERITAGE SPOTLIGHT</span>
        <h2 id="editorial-title">
          Crafted with Devotion.<br />
          Worn with <SketchUnderline text="Pride." />
        </h2>
        <p className="editorial-copy__desc">
          Every ornament is blessed with the touch of traditional Indian karigars. Made with pure precious metals and auspicious motifs that stay close to your family for generations.
        </p>
        <div className="editorial-copy__actions">
          <a href="#bestsellers" className="button primary">
            Explore Collection
            <svg className="icon">
              <use href="#icon-arrow"></use>
            </svg>
          </a>
        </div>
      </div>

      {/* Floating Interactive Spotlight Cards */}
      <article className="callout callout-one" onClick={(e) => handleProductClick('lakshmi-gold-necklace', e)}>
        <div className="callout__thumb">
          <img 
            src="/assets/img/p-lakshmi-gold-necklace.png" 
            alt="Lakshmi Gold Necklace" 
            loading="lazy" 
            width={180} 
            height={220} 
          />
        </div>
        <div className="callout__info">
          <span className="callout__tag">22K Temple Gold</span>
          <h3>Lakshmi Necklace</h3>
          <p className="callout__price">₹1,48,500</p>
          <span className="callout__link">
            Quick View <span>→</span>
          </span>
        </div>
      </article>

      <article className="callout callout-two" onClick={(e) => handleProductClick('heritage-jhumkas', e)}>
        <div className="callout__thumb">
          <img 
            src="/assets/img/p-heritage-jhumkas.png" 
            alt="Heritage Gold Jhumkas" 
            loading="lazy" 
            width={180} 
            height={220} 
          />
        </div>
        <div className="callout__info">
          <span className="callout__tag">Jaipur Granulation</span>
          <h3>Heritage Jhumkas</h3>
          <p className="callout__price">₹58,900</p>
          <span className="callout__link">
            Quick View <span>→</span>
          </span>
        </div>
      </article>

      <article className="callout callout-three" onClick={(e) => handleProductClick('classic-gold-ring', e)}>
        <div className="callout__thumb">
          <img 
            src="/assets/img/p-classic-gold-ring.png" 
            alt="Royal Solitaire Ring" 
            loading="lazy" 
            width={180} 
            height={220} 
          />
        </div>
        <div className="callout__info">
          <span className="callout__tag">18K Solid Gold</span>
          <h3>Royal Solitaire Ring</h3>
          <p className="callout__price">₹34,200</p>
          <span className="callout__link">
            Quick View <span>→</span>
          </span>
        </div>
      </article>

      <p className="editorial-caption">Sree Jewellery · Serving Indian Families with Pure Trust Since 1994</p>
    </section>
  );
}
