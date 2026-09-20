'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';

const ANNOUNCEMENTS = [
  {
    text: 'Order Easily on WhatsApp · Tap Here to Chat with Us',
    icon: (
      <svg className="announcement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )
  },
  {
    text: 'Free Insured Express Delivery on All Orders Across India',
    icon: (
      <svg className="announcement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    text: '100% BIS Hallmarked Pure Gold & 925 Sterling Silver',
    icon: (
      <svg className="announcement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="5" />
        <path d="m9 13-2 8 5-3 5 3-2-8" />
      </svg>
    )
  },
  {
    text: 'Live Video Consultation & Custom Bridal Jewellery Available',
    icon: (
      <svg className="announcement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
        <line x1="2" y1="9" x2="22" y2="9" />
      </svg>
    )
  }
];

export default function SiteHeader() {
  const { totalItems, totalWishlist, showToast } = useCart();
  const { openCart, openSearch, toggleMobileNav } = useModals();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'collection' | 'design' | null>(null);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const annTimer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 2800);
    return () => clearInterval(annTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);
      if (scrolled) {
        document.body.classList.add('is-scrolled');
      } else {
        document.body.classList.remove('is-scrolled');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (type: 'collection' | 'design') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleAccountClick = () => {
    showToast('Sree Family Suite · Welcome to our traditional jewellery house.');
  };

  const handleWishlistClick = () => {
    if (totalWishlist === 0) {
      showToast('Your wishlist is waiting to be filled with your favourite jewellery.');
    } else {
      showToast(`You have ${totalWishlist} saved jewellery piece${totalWishlist > 1 ? 's' : ''} in your wishlist.`);
    }
  };

  return (
    <div className="header-wrapper" onMouseLeave={handleMouseLeave}>
      {/* Top Announcement Bar - hides on scroll */}
      <div className={`announcement-bar ${isScrolled ? 'is-hidden' : ''}`}>
        <a 
          href="https://wa.me/917995228713?text=Hi%20Sree%20Jewellery%2C%20I%20would%20like%20to%20place%20an%20order" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="announcement-content"
          key={announcementIdx}
        >
          {ANNOUNCEMENTS[announcementIdx].icon}
          <span>{ANNOUNCEMENTS[announcementIdx].text}</span>
        </a>
      </div>

      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="site-header">
        {/* Brand & Animated Logo Intro Anchor */}
        <Link className="brand" href="/" aria-label="Sree Jewellery home">
          <div className="logo-slot">
            <div id="logo" aria-hidden="true">
              <img 
                src="/assets/img/Sree-jewl-logo-icon-bg.png" 
                alt="Sree Jewellery Logo Icon"
                width={66}
                height={66}
                className="logo-icon-img"
                loading="eager"
              />
            </div>
          </div>
          <span className="brand-name nav-reveal">
            SREE JEWELLERY
          </span>
        </Link>

        {/* Primary Desktop Navigation */}
        <nav className="desktop-nav nav-reveal" aria-label="Main navigation">
          <Link href="/gold" className="nav-link">18K Gold Plated</Link>
          <Link href="/silver" className="nav-link">925 Silver</Link>
          <Link href="/#bestsellers" className="nav-link">Family Favourites</Link>
          <Link href="/#bestsellers" className="nav-link">New Arrivals</Link>

          {/* Shop by Collection with Mega Dropdown */}
          <div 
            className={`nav-dropdown-wrap ${activeDropdown === 'collection' ? 'is-active' : ''}`}
            onMouseEnter={() => handleMouseEnter('collection')}
          >
            <Link 
              href="/#featured" 
              className="nav-link dropdown-trigger"
              onClick={() => setActiveDropdown(null)}
            >
              Shop by Collection
              <svg className={`dropdown-arrow ${activeDropdown === 'collection' ? 'is-open' : ''}`} viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
          </div>

          {/* Shop By Design with Mega Dropdown */}
          <div 
            className={`nav-dropdown-wrap ${activeDropdown === 'design' ? 'is-active' : ''}`}
            onMouseEnter={() => handleMouseEnter('design')}
          >
            <Link 
              href="/#designs" 
              className="nav-link dropdown-trigger"
              onClick={() => setActiveDropdown(null)}
            >
              Shop By Design
              <svg className={`dropdown-arrow ${activeDropdown === 'design' ? 'is-open' : ''}`} viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
          </div>
        </nav>

        {/* Right Actions: Search, Wishlist, Account, Cart, Mobile Toggle */}
        <div className="header-actions nav-reveal">
          <button 
            type="button" 
            className="icon-button" 
            id="search-open" 
            aria-label="Search jewellery"
            onClick={openSearch}
          >
            <svg className="icon">
              <use href="#icon-search"></use>
            </svg>
          </button>

          <button 
            type="button" 
            className="icon-button" 
            id="wishlist-btn" 
            aria-label={`Wishlist, ${totalWishlist} items`}
            onClick={handleWishlistClick}
          >
            <svg className="icon">
              <use href="#icon-heart"></use>
            </svg>
            {totalWishlist > 0 && (
              <span className="cart-count wish-count" id="wish-count">{totalWishlist}</span>
            )}
          </button>

          <button 
            type="button" 
            className="icon-button" 
            id="account-btn" 
            aria-label="Account & Concierge"
            onClick={handleAccountClick}
          >
            <svg className="icon">
              <use href="#icon-user"></use>
            </svg>
          </button>

          <button 
            type="button" 
            className="icon-button" 
            id="cart-open" 
            aria-label={`Open shopping bag, ${totalItems} items`}
            onClick={openCart}
          >
            <svg className="icon">
              <use href="#icon-bag"></use>
            </svg>
            <span className="cart-count" id="cart-count">{totalItems}</span>
          </button>

          <button 
            type="button" 
            className="icon-button" 
            id="menu-toggle" 
            aria-label="Open navigation" 
            aria-expanded="false"
            aria-controls="mobile-nav"
            onClick={toggleMobileNav}
          >
            <svg className="icon">
              <use href="#icon-menu"></use>
            </svg>
          </button>
        </div>
      </header>

      {/* Mega Dropdown Menu Panel: Collection */}
      {activeDropdown === 'collection' && (
        <div 
          className="mega-menu" 
          onMouseEnter={() => handleMouseEnter('collection')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mega-menu__container">
            {/* Column 1 */}
            <div className="mega-menu__column">
              <h4>Choker &amp; Necklaces</h4>
              <ul>
                <li><Link href="/necklaces" onClick={() => setActiveDropdown(null)}>View All</Link></li>
                <li><Link href="/necklaces" onClick={() => setActiveDropdown(null)}>Palakka - Kaashu Necklace</Link></li>
                <li><Link href="/necklaces" onClick={() => setActiveDropdown(null)}>Nakshi Temple Necklaces</Link></li>
                <li><Link href="/necklaces" onClick={() => setActiveDropdown(null)}>Layer Necklaces</Link></li>
                <li><Link href="/harams" onClick={() => setActiveDropdown(null)}>Long Necklaces / Haram</Link></li>
                <li><Link href="/kante" onClick={() => setActiveDropdown(null)}>Kante Collars</Link></li>
                <li><Link href="/necklaces" onClick={() => setActiveDropdown(null)}>Royal Bridal Chokers</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="mega-menu__column">
              <h4>Anklets &amp; Chains</h4>
              <ul>
                <li><Link href="/pure-silver-chains" onClick={() => setActiveDropdown(null)}>View All</Link></li>
                <li><Link href="/pure-silver-chains" onClick={() => setActiveDropdown(null)}>Pure 92.5 Silver Chains</Link></li>
                <li><Link href="/italian-chains-bracelets" onClick={() => setActiveDropdown(null)}>Italian Link Chains</Link></li>
                <li><Link href="/pure-silver-chains" onClick={() => setActiveDropdown(null)}>Pair Anklets</Link></li>
                <li><Link href="/pure-silver-chains" onClick={() => setActiveDropdown(null)}>Thread Anklets</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="mega-menu__column">
              <h4>Bangles and Bracelets</h4>
              <ul>
                <li><Link href="/bangles" onClick={() => setActiveDropdown(null)}>View All</Link></li>
                <li><Link href="/italian-chains-bracelets" onClick={() => setActiveDropdown(null)}>Italian Bracelets</Link></li>
                <li><Link href="/bangles" onClick={() => setActiveDropdown(null)}>Pair Bangles</Link></li>
                <li><Link href="/bangles" onClick={() => setActiveDropdown(null)}>Temple Gold Bangles</Link></li>
                <li><Link href="/gents-kadas" onClick={() => setActiveDropdown(null)}>Gents Kadas</Link></li>
                <li><Link href="/gents-kadas" onClick={() => setActiveDropdown(null)}>Maharani Gold Kada</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="mega-menu__column">
              <h4>Earrings &amp; Rings</h4>
              <ul>
                <li><Link href="/earrings" onClick={() => setActiveDropdown(null)}>View All</Link></li>
                <li><Link href="/earrings" onClick={() => setActiveDropdown(null)}>Heritage Jhumkas</Link></li>
                <li><Link href="/earrings" onClick={() => setActiveDropdown(null)}>Hoop / Balis</Link></li>
                <li><Link href="/rings" onClick={() => setActiveDropdown(null)}>Classic &amp; Solitaire Rings</Link></li>
                <li><Link href="/victorian-style" onClick={() => setActiveDropdown(null)}>Victorian Style Filigree</Link></li>
                <li><Link href="/earrings" onClick={() => setActiveDropdown(null)}>Chandbalis &amp; Studs</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mega Dropdown Menu Panel: Design */}
      {activeDropdown === 'design' && (
        <div 
          className="mega-menu" 
          onMouseEnter={() => handleMouseEnter('design')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mega-menu__container">
            <div className="mega-menu__column">
              <h4>Traditional Heritage</h4>
              <ul>
                <li><Link href="/shop" onClick={() => setActiveDropdown(null)}>View All Designs</Link></li>
                <li><Link href="/shop" onClick={() => setActiveDropdown(null)}>Polki Kundan Collection</Link></li>
                <li><Link href="/necklaces" onClick={() => setActiveDropdown(null)}>Antique Temple Lore</Link></li>
                <li><Link href="/jadau" onClick={() => setActiveDropdown(null)}>Royal Jadau Edit</Link></li>
              </ul>
            </div>

            <div className="mega-menu__column">
              <h4>Contemporary Expressions</h4>
              <ul>
                <li><Link href="/shop" onClick={() => setActiveDropdown(null)}>View All Contemporary</Link></li>
                <li><Link href="/shop" onClick={() => setActiveDropdown(null)}>Vogue Hue Enamel Stories</Link></li>
                <li><Link href="/shop" onClick={() => setActiveDropdown(null)}>Natural Stone with Emeralds</Link></li>
                <li><Link href="/victorian-style" onClick={() => setActiveDropdown(null)}>Multi Stone Lace Filigree</Link></li>
              </ul>
            </div>

            <div className="mega-menu__column">
              <h4>Curated Finishes</h4>
              <ul>
                <li><Link href="/gold" onClick={() => setActiveDropdown(null)}>18K Gold Plated Immersion</Link></li>
                <li><Link href="/silver" onClick={() => setActiveDropdown(null)}>925 Sterling Silver Hallmarked</Link></li>
                <li><Link href="/diamond-finishing" onClick={() => setActiveDropdown(null)}>Diamond Finishing &amp; Solitaire</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
