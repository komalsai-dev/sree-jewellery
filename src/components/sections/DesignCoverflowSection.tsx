'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SketchUnderline from '@/components/ui/SketchUnderline';

interface DesignItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  img: string;
  alt: string;
  pill: string;
  badge: string;
}

const DESIGNS: DesignItem[] = [
  {
    id: 'polki-kundan',
    name: 'Polki Kundan Collection',
    tagline: 'Royal Indian bridal splendour with handcrafted gemstone settings',
    category: 'Royal Jadau & Polki',
    img: '/assets/img/banner-palakka.jpg',
    alt: 'Polki Kundan Collection',
    pill: 'Royal Edit',
    badge: '01'
  },
  {
    id: 'antique-collection',
    name: 'Antique Temple Collection',
    tagline: 'Sacred temple karigari inspired by ancient Indian heritage',
    category: 'Vintage Temple Art',
    img: '/assets/img/banner-18k-gold.jpg',
    alt: 'Antique Jewellery Collection',
    pill: 'Heritage',
    badge: '02'
  },
  {
    id: 'vogue-hue',
    name: 'Festive Meenakari Collection',
    tagline: 'Vibrant enamel colours and sparkling gemstones for joyful celebrations',
    category: 'Meenakari & Colored Gems',
    img: '/assets/img/banner-daily-wear.jpg',
    alt: 'Festive Meenakari Fine Jewellery',
    pill: 'Festive Hue',
    badge: '03'
  },
  {
    id: 'natural-stone',
    name: 'Natural Gemstone Collection',
    tagline: 'Precious rubies, emeralds, and pearls set in pure hallmarked metal',
    category: 'Pure Silver & Gems',
    img: '/assets/img/banner-925-silver.jpg',
    alt: 'Natural Gemstone Jewellery Collection',
    pill: 'Artisan',
    badge: '04'
  },
  {
    id: 'multi-stone',
    name: 'Intricate Filigree Craft',
    tagline: 'Delicate Indian lace filigree woven by master karigars',
    category: 'Pure Silver Filigree',
    img: '/assets/img/banner.png',
    alt: 'Handcrafted Filigree Jewelleries',
    pill: 'Handmade',
    badge: '05'
  }
];

export default function DesignCoverflowSection() {
  const [activeIdx, setActiveIdx] = useState(2);

  const updateIndex = (newIdx: number) => {
    setActiveIdx((newIdx + DESIGNS.length) % DESIGNS.length);
  };

  const activeDesign = DESIGNS[activeIdx];

  return (
    <section className="section design-section" id="designs" aria-labelledby="design-title">
      <div className="section-heading" data-reveal>
        <div className="design-heading-wrap">
          <p className="eyebrow">TRADITIONAL ARTISTRY</p>
          <h2 id="design-title">Shop By <SketchUnderline text="Design" /></h2>
          <p className="design-intro">
            From royal Kundan settings and temple motifs to pure silver filigree, discover handcrafted jewellery that reflects timeless Indian beauty.
          </p>
        </div>
      </div>

      {/* 3D Coverflow Stage */}
      <div 
        className="design-stage" 
        id="design-stage" 
        role="region" 
        aria-roledescription="carousel" 
        aria-label="Jewellery design collections" 
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') updateIndex(activeIdx - 1);
          if (e.key === 'ArrowRight') updateIndex(activeIdx + 1);
        }}
      >
        {/* Floating Side Arrow Controls */}
        <button 
          type="button" 
          className="design-nav-btn design-nav-btn--prev" 
          id="design-prev" 
          aria-label="Previous design"
          onClick={() => updateIndex(activeIdx - 1)}
        >
          <svg className="icon" style={{ transform: 'rotate(180deg)' }}>
            <use href="#icon-arrow"></use>
          </svg>
        </button>

        <button 
          type="button" 
          className="design-nav-btn design-nav-btn--next" 
          id="design-next" 
          aria-label="Next design"
          onClick={() => updateIndex(activeIdx + 1)}
        >
          <svg className="icon">
            <use href="#icon-arrow"></use>
          </svg>
        </button>

        {DESIGNS.map((item, idx) => {
          let offset = idx - activeIdx;
          if (offset > 2) offset -= 5;
          if (offset < -2) offset += 5;
          const dist = Math.abs(offset);
          const isSelected = dist === 0;
          const scale = isSelected ? 1.12 : dist === 1 ? 0.90 : 0.74;
          const y = isSelected ? -18 : dist * 14;
          const opacity = isSelected ? 1 : dist === 1 ? 0.85 : 0.65;
          const rot = -offset * 14;

          const cardStyle = {
            '--offset': offset,
            '--card-scale': scale,
            '--card-y': `${y}px`,
            '--card-opacity': opacity,
            '--card-rotation': `${rot}deg`,
            zIndex: 5 - dist,
          } as React.CSSProperties;

          return (
            <button
              key={item.id}
              type="button"
              className={`design-card ${isSelected ? 'is-active' : ''}`}
              data-design={idx}
              style={cardStyle}
              aria-label={`${item.name}${isSelected ? ', selected' : ', select collection'}`}
              aria-pressed={isSelected}
              onClick={() => updateIndex(idx)}
            >
              {/* Full Box Media */}
              <div className="design-card__media">
                <img 
                  src={item.img} 
                  alt={item.alt}
                  loading="lazy"
                  width={660}
                  height={850}
                  className="design-card__img"
                />
              </div>

              {/* Text Layered Directly On Image */}
              <div className="design-card__content">
                <h3 className="design-card__title">{item.name}</h3>
              </div>
            </button>
          );
        })}

        <div className="scene-anchor" id="design-ring-anchor" aria-hidden="true"></div>
      </div>

      {/* Bottom Dots & Action */}
      <div className="design-bottom">
        {/* Pagination Dots */}
        <div className="design-dots" aria-hidden="true">
          {DESIGNS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`design-dot ${i === activeIdx ? 'is-active' : ''}`}
              aria-label={`Go to design ${i + 1}`}
              onClick={() => setActiveIdx(i)}
            />
          ))}
        </div>

        <Link className="button secondary" href="#bestsellers">
          View All {activeDesign.name}
          <svg className="icon">
            <use href="#icon-arrow"></use>
          </svg>
        </Link>
      </div>
    </section>
  );
}
