'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types';

interface ModalContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  careInfoKey: string | null;
  openCareInfo: (key: string) => void;
  closeCareInfo: () => void;

  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [careInfoKey, setCareInfoKey] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openCareInfo = (key: string) => setCareInfoKey(key);
  const closeCareInfo = () => setCareInfoKey(null);

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <ModalContext.Provider value={{
      isCartOpen,
      openCart,
      closeCart,
      isSearchOpen,
      openSearch,
      closeSearch,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      careInfoKey,
      openCareInfo,
      closeCareInfo,
      isSizeGuideOpen,
      openSizeGuide,
      closeSizeGuide,
      isMobileNavOpen,
      toggleMobileNav,
      closeMobileNav
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModals must be used within ModalProvider');
  return ctx;
}
