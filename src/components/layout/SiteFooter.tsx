'use client';

import React from 'react';
import { useModals } from '@/context/ModalContext';

export default function SiteFooter() {
  const { openCareInfo } = useModals();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#hero" aria-label="Sree Jewellery home">
            <span className="footer-monogram" aria-hidden="true">
              <img 
                src="/assets/img/Sree-jewl-logo-icon-bg.png" 
                alt="Sree Jewellery Logo Icon"
                width={38}
                height={38}
                className="logo-icon-img"
                loading="lazy"
              />
            </span>
            <span className="brand-name">SREE JEWELLERY</span>
          </a>
          <p>
            Pure 22K gold and certified 925 sterling silver jewellery inspired by centuries of Indian temple karigari. Handcrafted with devotion for weddings, festivals, and family celebrations.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="#categories">Shop All Jewellery</a>
          <a href="#bestsellers">Best Sellers</a>
          <a href="#featured">Festive Collections</a>
          <a href="#designs">Shop By Design</a>
          <a href="#editorial">Heritage Spotlight</a>
        </div>

        <div className="footer-column">
          <h3>Customer Care</h3>
          <button type="button" data-info="contact" onClick={() => openCareInfo('contact')}>Contact &amp; WhatsApp</button>
          <button type="button" data-info="shipping" onClick={() => openCareInfo('shipping')}>Shipping &amp; Delivery</button>
          <button type="button" data-info="care" onClick={() => openCareInfo('care')}>Jewellery Care Guide</button>
          <button type="button" data-info="size" onClick={() => openCareInfo('size')}>Bangle &amp; Ring Size Chart</button>
          <button type="button" data-info="privacy" onClick={() => openCareInfo('privacy')}>Purity Guarantee &amp; Privacy</button>
        </div>

        <div className="footer-column">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a 
              className="icon-button" 
              href="https://wa.me/917995228713?text=Hi%20Sree%20Jewellery%2C%20I%20have%20an%20inquiry%20regarding%20your%20collection." 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Chat on WhatsApp"
              title="WhatsApp: +91 79952 28713"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
            <a className="icon-button" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram">
              <svg className="icon"><use href="#icon-instagram"></use></svg>
            </a>
            <a className="icon-button" href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Pinterest">
              <svg className="icon"><use href="#icon-pinterest"></use></svg>
            </a>
            <a className="icon-button" href="#newsletter" aria-label="Join our newsletter">
              <svg className="icon"><use href="#icon-mail"></use></svg>
            </a>
          </div>
          <a 
            href="https://wa.me/917995228713?text=Hi%20Sree%20Jewellery%2C%20I%20would%20like%20to%20place%20an%20order." 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#25D366', fontWeight: 600, fontSize: '0.86rem', marginTop: '4px' }}
          >
            WhatsApp: +91 79952 28713
          </a>
          <a href="#newsletter">Auspicious blessings for your family.</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; <span id="copyright-year">{new Date().getFullYear()}</span> Sree Jewellery. All rights reserved.</p>
        <p>Pure 22K Gold &amp; Certified 925 Sterling Silver Heirlooms</p>
        <a href="#hero">Back to the top ↑</a>
      </div>
    </footer>
  );
}
