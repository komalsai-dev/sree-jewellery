'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import SketchUnderline from '@/components/ui/SketchUnderline';

interface CampaignBannerSectionProps {
  imageSrc?: string;
}

export default function CampaignBannerSection({ imageSrc }: CampaignBannerSectionProps) {
  const { getBannerBySlug } = useProducts();
  const festiveBanner = getBannerBySlug('festive-edit');
  const bgImg = imageSrc || festiveBanner?.image || '/assets/img/banner.png';

  return (
    <section className="campaign-banner" id="edit" aria-label="The Festive Edit campaign">
      {/* Background Image & Emerald Luxury Gradient Backdrop */}
      <div className="campaign-banner__bg" aria-hidden="true">
        {bgImg && (
          <img 
            src={bgImg} 
            alt={festiveBanner?.title || "The Festive Edit jewellery campaign banner"} 
            loading="lazy"
            className="campaign-banner__img" 
          />
        )}
        <div className="campaign-banner__overlay" />
      </div>

      <div className="wrap campaign-banner__wrap">
        <div className="campaign-banner__copy">
          <span className="campaign-banner__kicker">Auspicious Celebrations</span>
          <h2 className="campaign-banner__title">
            The Festive<br />
            <SketchUnderline text="Collection." />
          </h2>
          <p className="campaign-banner__desc">
            Shine in every festival and family wedding with pure temple gold and certified sterling silver, handcrafted for joyous moments.
          </p>
          <div className="campaign-banner__action">
            <Link href="/necklaces" className="button btn--gold">
              Explore Festive Designs
              <svg className="icon">
                <use href="#icon-arrow"></use>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
