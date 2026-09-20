'use client';

import React from 'react';
import Link from 'next/link';
import SketchUnderline from '@/components/ui/SketchUnderline';

interface ChapterItem {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  desc: string;
  mainImg: string;
  detailImg: string;
  alt: string;
  href: string;
  tag: string;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: 'gold-plated',
    chapter: '01',
    title: 'Gold Plated Collection',
    subtitle: 'Sacred Temple Radiance',
    desc: 'Temple jewellery sculpted with intricate nakshi motifs and rich 24K gold polish for festive celebrations.',
    mainImg: '/assets/img/tile-gold.png',
    detailImg: '/assets/img/p-antique-gold-earrings.png',
    alt: 'Gold Plated Fine Heritage Jewellery',
    href: '#bestsellers',
    tag: '24K Gold Polish'
  },
  {
    id: 'silver-collection',
    chapter: '02',
    title: '925 Silver Heirlooms',
    subtitle: 'Pure & Auspicious Silver',
    desc: 'BIS certified 925 sterling silver crafted with delicate filigree work and auspicious motifs.',
    mainImg: '/assets/img/tile-silver.png',
    detailImg: '/assets/img/p-lotus-silver-pendant.png',
    alt: '925 Sterling Silver Heirlooms',
    href: '#bestsellers',
    tag: '925 Hallmarked'
  },
  {
    id: 'bridal-edit',
    chapter: '03',
    title: 'Royal Bridal Heritage',
    subtitle: 'Made for Your Wedding Day',
    desc: 'Imperial bridal harams, chokers, and jadau necklaces created to make your special day memorable.',
    mainImg: '/assets/img/p-bridal-gold-choker.png',
    detailImg: '/assets/img/p-maharani-gold-kada.png',
    alt: 'Bridal Heritage Fine Jewellery',
    href: '#bestsellers',
    tag: 'Bridal Special'
  },
  {
    id: 'daily-wear',
    chapter: '04',
    title: 'Everyday Grace',
    subtitle: 'Comfortable Daily Wear',
    desc: 'Lightweight anti-tarnish chains, delicate rings, and earrings designed for everyday beauty and ease.',
    mainImg: '/assets/img/p-contemporary-silver-earrings.png',
    detailImg: '/assets/img/p-pearl-silver-bracelet.png',
    alt: 'Daily Wear Anti-Tarnish Jewellery',
    href: '#bestsellers',
    tag: 'Daily Wear'
  }
];

export default function FeaturedCollections() {
  return (
    <section className="section featured-section" id="featured" aria-labelledby="featured-heading">
      <div className="featured-container">
        {/* Header with Title and Counter */}
        <div className="featured-intro" data-reveal>
          <div className="featured-intro__text">
            <p className="eyebrow" id="featured-heading">TRADITIONAL CHAPTERS</p>
            <h2 className="featured-heading-title">Auspicious Jewellery for Every <SketchUnderline text="Celebration" variant="emerald-line" /></h2>
          </div>
          <div className="featured-intro__counter">
            <span className="counter-current">01</span>
            <span className="counter-line"></span>
            <span className="counter-total">04</span>
          </div>
        </div>

        {/* 4 Chapter Editorial Cards */}
        <div className="featured-grid">
          {CHAPTERS.map((item) => (
            <Link 
              key={item.id} 
              href={item.href}
              className="chapter-card"
              data-collection={item.title}
            >
              {/* Card Top Index & Tag */}
              <div className="chapter-card__top">
                <span className="chapter-card__num">{item.chapter}</span>
                <span className="chapter-card__tag">{item.tag}</span>
              </div>

              {/* Main Media Showcase */}
              <div className="chapter-card__media">
                <img 
                  src={item.mainImg} 
                  alt={item.alt} 
                  loading="lazy" 
                  width={600} 
                  height={720} 
                  className="chapter-card__main-img"
                />
                <div className="chapter-card__media-overlay"></div>

                {/* Floating Artisan Detail Thumbnail */}
                <div className="chapter-card__detail-badge" title="Artisan Craftsmanship Detail">
                  <img 
                    src={item.detailImg} 
                    alt={`${item.title} detail`}
                    loading="lazy"
                    width={140}
                    height={140}
                  />
                </div>
              </div>

              {/* Card Copy & Description */}
              <div className="chapter-card__copy">
                <p className="chapter-card__kicker">{item.subtitle}</p>
                <h3 className="chapter-card__title">{item.title}</h3>
                <p className="chapter-card__desc">{item.desc}</p>
                
                <div className="chapter-card__action">
                  <span className="chapter-card__link">
                    Explore Chapter
                    <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
