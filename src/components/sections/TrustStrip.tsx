'use client';

import React from 'react';

const TRUST_PILLARS = [
  {
    title: '100% BIS Hallmarked',
    desc: 'Certified purity on every single piece',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M12 3 4 7v6c0 4.5 3.4 7.4 8 8 4.6-.6 8-3.5 8-8V7l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    title: 'Safe & Secure Orders',
    desc: 'Verified checkout with WhatsApp support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <rect x="4" y="10" width="16" height="10" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    )
  },
  {
    title: 'Pure Gold & Silver',
    desc: '22K gold and 925 sterling silver purity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <circle cx="12" cy="9" r="5" />
        <path d="m9 13-2 8 5-3 5 3-2-8" />
      </svg>
    )
  },
  {
    title: '15-Day Easy Returns',
    desc: 'Simple exchanges with complete peace of mind',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </svg>
    )
  },
  {
    title: 'Master Indian Karigari',
    desc: 'Handcrafted by skilled traditional artisans',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M6 21 18 3M6 3l12 18" />
      </svg>
    )
  },
  {
    title: 'Free Insured Delivery',
    desc: 'Safe delivery to your doorstep across India',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M3 17h13V7H3v10Zm13-6h4l1 3v3h-5" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    )
  }
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why Sree Fine Jewellery">
      <div className="wrap trust-row" data-reveal>
        {TRUST_PILLARS.map((pillar, idx) => (
          <div className="trust-item" key={idx}>
            <div className="trust-icon" aria-hidden="true">
              {pillar.icon}
            </div>
            <h3>{pillar.title}</h3>
            <p>{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
