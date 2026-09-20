'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModals } from '@/context/ModalContext';
import { DISPLAY_PHONE } from '@/utils/whatsapp';

export default function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useModals();
  const [openSection, setOpenSection] = useState<'collection' | 'design' | 'categories' | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileNavOpen) {
        closeMobileNav();
      }
    };
    if (isMobileNavOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isMobileNavOpen, closeMobileNav]);

  const toggleSection = (sec: 'collection' | 'design' | 'categories') => {
    setOpenSection(openSection === sec ? null : sec);
  };

  return (
    <>
      {/* Dimmed Blurred Scrim Overlay */}
      <div 
        className={`mobile-nav-scrim ${isMobileNavOpen ? 'is-open' : ''}`}
        onClick={closeMobileNav}
        aria-hidden="true"
      />

      {/* Luxury Slide-Out Drawer */}
      <aside 
        className={`mobile-nav-drawer ${isMobileNavOpen ? 'is-open' : ''}`}
        id="mobile-nav"
        aria-label="Mobile menu navigation"
        aria-hidden={!isMobileNavOpen}
      >
        {/* Drawer Header with Logo & Close Button */}
        <div className="mobile-nav__head">
          <Link href="/" className="mobile-nav__brand" onClick={closeMobileNav}>
            <div className="mobile-nav__logo-wrap" aria-hidden="true">
              <img 
                src="/assets/img/Sree-jewl-logo-icon-bg.png" 
                alt="Sree Jewellery Logo"
                className="mobile-nav__logo-img"
              />
            </div>
            <span className="mobile-nav__brand-name">SREE JEWELLERY</span>
          </Link>
          <button 
            type="button" 
            className="mobile-nav__close" 
            onClick={closeMobileNav}
            aria-label="Close mobile navigation menu"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="mobile-nav__body">
          {/* Main Quick Links */}
          <div className="mobile-nav__links">
            <Link href="/#bestsellers" className="mobile-nav-link" onClick={closeMobileNav}>
              <span>Customers Top Picks</span>
              <span className="nav-link-badge">Popular</span>
            </Link>
            <Link href="/#featured" className="mobile-nav-link" onClick={closeMobileNav}>
              <span>New Collections</span>
              <span className="nav-link-badge">New</span>
            </Link>
          </div>

          {/* Accordion: Shop By Category */}
          <div className="mobile-accordion">
            <button 
              type="button" 
              className="mobile-accordion-header"
              onClick={() => toggleSection('categories')}
              aria-expanded={openSection === 'categories'}
            >
              <span>Shop By Category</span>
              <svg className={`accordion-arrow ${openSection === 'categories' ? 'is-open' : ''}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {openSection === 'categories' && (
              <div className="mobile-accordion-body">
                <Link href="/rings" onClick={closeMobileNav}>Rings &amp; Solitaires</Link>
                <Link href="/earrings" onClick={closeMobileNav}>Earrings &amp; Jhumkas</Link>
                <Link href="/necklaces" onClick={closeMobileNav}>Necklaces &amp; Chokers</Link>
                <Link href="/bangles" onClick={closeMobileNav}>Bangles &amp; Kadas</Link>
                <Link href="/harams" onClick={closeMobileNav}>Harams &amp; Bridal Sets</Link>
                <Link href="/kante" onClick={closeMobileNav}>Kante Collars</Link>
                <Link href="/pure-silver-chains" onClick={closeMobileNav}>Pure 92.5 Silver Chains</Link>
                <Link href="/gents-kadas" onClick={closeMobileNav}>Gents Kadas</Link>
              </div>
            )}
          </div>

          {/* Accordion: Shop By Design */}
          <div className="mobile-accordion">
            <button 
              type="button" 
              className="mobile-accordion-header"
              onClick={() => toggleSection('design')}
              aria-expanded={openSection === 'design'}
            >
              <span>Shop By Design</span>
              <svg className={`accordion-arrow ${openSection === 'design' ? 'is-open' : ''}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {openSection === 'design' && (
              <div className="mobile-accordion-body">
                <Link href="/#designs" onClick={closeMobileNav}>Polki Kundan Collection</Link>
                <Link href="/#designs" onClick={closeMobileNav}>Vintage Temple Karigari</Link>
                <Link href="/#designs" onClick={closeMobileNav}>Vogue Hue Colored Gems</Link>
                <Link href="/#designs" onClick={closeMobileNav}>Natural Stone Jewellery</Link>
                <Link href="/#designs" onClick={closeMobileNav}>Multi Stone Lace Filigree</Link>
              </div>
            )}
          </div>

          <div className="mobile-nav__links" style={{ borderTop: '1px solid rgba(201, 161, 90, 0.2)', paddingTop: '6px', marginTop: '6px' }}>
            <Link href="/#editorial" className="mobile-nav-link" onClick={closeMobileNav}>
              <span>The Muse Edit</span>
            </Link>
            <Link href="/#edit" className="mobile-nav-link" onClick={closeMobileNav}>
              <span>The Festive Campaign</span>
            </Link>
          </div>

          {/* WhatsApp Direct Concierge Card */}
          <div className="mobile-nav__concierge-card">
            <div className="concierge-text">
              <strong>Atelier Concierge</strong>
              <span>Custom Karigari &amp; Orders</span>
            </div>
            <a 
              href="https://wa.me/917995228713?text=Hi%20Sree%20Jewellery%2C%20I%20would%20like%20to%20inquire%20about%20your%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-wa-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
            <span className="mobile-wa-phone">+91 79952 28713</span>
          </div>
        </div>
      </aside>
    </>
  );
}

