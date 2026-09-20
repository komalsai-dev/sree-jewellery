'use client';

import React from 'react';
import Link from 'next/link';
import HeroRangoliFlower from '@/components/ui/HeroRangoliFlower';
import HeroBgRangoliArt from '@/components/ui/HeroBgRangoliArt';
import SketchUnderline from '@/components/ui/SketchUnderline';

export default function HeroSection() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      
      {/* Subtle Blurred Rangoli Art Scattered Across Hero Background */}
      <HeroBgRangoliArt />

      {/* Traditional Indian Festive Rangoli Flower Mandala Art (Rotating along Left & Right Margins) */}
      <div className="hero-floral-canvas" aria-hidden="true">
        {/* Left Margin Semi-Flower Rangoli */}
        <HeroRangoliFlower side="left" />

        {/* Right Margin Semi-Flower Rangoli */}
        <HeroRangoliFlower side="right" />
      </div>

      {/* Centerpiece 3D Ring Anchor */}
      <div className="scene-anchor" id="hero-ring-anchor">
        <svg className="flat-ring scene-fallback" role="img" aria-label="Traditional silver ring with floral artisan setting">
          <use href="#flat-ring-art"></use>
        </svg>
      </div>

      {/* Hero Content, Typography & CTAs */}
      <div className="hero-content hero-reveal">
        <h1 id="hero-title">
          Handcrafted in Tradition,<br />
          Worn for Every <SketchUnderline text="Generation." />
        </h1>
        
        <p className="hero-description">
          Auspicious 22K gold and certified 925 silver jewellery, handcrafted with ancient temple karigari. Made with devotion for weddings, festive moments, and family blessings.
        </p>

        <div className="hero-cta-group">
          <Link className="button" href="/#categories">
            Explore Jewellery
            <svg className="icon">
              <use href="#icon-arrow"></use>
            </svg>
          </Link>
          <Link className="button secondary" href="/#featured">
            Festive &amp; Bridal Edit
          </Link>
        </div>

        {/* Traditional Heritage Micro-Pillars */}
        <div className="hero-trust-row">
          <span className="trust-pill">100% BIS Hallmarked Purity</span>
          <span className="trust-dot">•</span>
          <span className="trust-pill">Authentic Temple Karigari</span>
          <span className="trust-dot">•</span>
          <span className="trust-pill">Free Insured Delivery Across India</span>
        </div>
      </div>
    </section>
  );
}
