import React from 'react';
import Ring3DCanvas from '@/components/3d/Ring3DCanvas';
import HeroSection from '@/sections/HeroSection';
import TrustStrip from '@/sections/TrustStrip';
import CategorySection from '@/sections/CategorySection';
import FeaturedCollections from '@/sections/FeaturedCollections';
import CollectionBannersSection from '@/sections/CollectionBannersSection';
import DesignCoverflowSection from '@/sections/DesignCoverflowSection';
import EditorialSection from '@/sections/EditorialSection';
import CampaignBannerSection from '@/sections/CampaignBannerSection';
import BestsellersSection from '@/sections/BestsellersSection';
import FinalSceneSection from '@/sections/FinalSceneSection';
import NewsletterSection from '@/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <Ring3DCanvas />
      <HeroSection />
      <CategorySection />
      <FeaturedCollections />
      <CollectionBannersSection />
      <DesignCoverflowSection />
      <EditorialSection />
      <CampaignBannerSection />
      <BestsellersSection />
      <TrustStrip />
      <FinalSceneSection />
      <NewsletterSection />
    </>
  );
}
