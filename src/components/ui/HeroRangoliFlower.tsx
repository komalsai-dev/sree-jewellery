'use client';

import React from 'react';

interface HeroRangoliFlowerProps {
  side: 'left' | 'right';
  className?: string;
}

/**
 * HeroRangoliFlower
 * High-fidelity Indian festive mandala / rangoli floral artwork inspired by royal Diwali motifs.
 * Rendered with layered emerald, gold, sage, and jade geometry that rotates smoothly along screen margins.
 */
export default function HeroRangoliFlower({ side, className }: HeroRangoliFlowerProps) {
  const isLeft = side === 'left';
  const spinClass = isLeft ? 'rangoli-spin-cw' : 'rangoli-spin-ccw';
  const gradientPrefix = isLeft ? 'rf-left' : 'rf-right';

  return (
    <div 
      className={`hero-rangoli-flower ${isLeft ? 'hero-rangoli-left' : 'hero-rangoli-right'} ${className || ''}`}
      aria-hidden="true"
    >
      <svg
        className={`hero-rangoli-svg ${spinClass}`}
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Emerald Royal Gradient */}
          <linearGradient id={`${gradientPrefix}-emerald-main`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a5346" />
            <stop offset="50%" stopColor="#123b32" />
            <stop offset="100%" stopColor="#0a251f" />
          </linearGradient>

          {/* Deep Jade Gradient */}
          <linearGradient id={`${gradientPrefix}-jade-deep`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#246a5a" />
            <stop offset="100%" stopColor="#0d2b24" />
          </linearGradient>

          {/* Antique Gold Metallic Gradient */}
          <linearGradient id={`${gradientPrefix}-gold-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3d48d" />
            <stop offset="45%" stopColor="#c9a15a" />
            <stop offset="85%" stopColor="#9e7939" />
            <stop offset="100%" stopColor="#dfb76c" />
          </linearGradient>

          {/* Bright Gold Highlight */}
          <radialGradient id={`${gradientPrefix}-gold-shine`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff1cc" />
            <stop offset="40%" stopColor="#e2bc6d" />
            <stop offset="100%" stopColor="#a88035" />
          </radialGradient>

          {/* Sage Light Gradient */}
          <linearGradient id={`${gradientPrefix}-sage-light`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#edf2e8" />
            <stop offset="50%" stopColor="#dee4d8" />
            <stop offset="100%" stopColor="#c4cebc" />
          </linearGradient>

          {/* Soft Glow Shadow Filter */}
          <filter id={`${gradientPrefix}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#091f1a" floodOpacity="0.28" />
          </filter>

          {/* 1. Outer Tier 1 - Grand Lotus Petal (16 count) */}
          <g id={`${gradientPrefix}-petal-outer`}>
            {/* Outer Petal Base */}
            <path
              d="M0 -370 C48 -325 58 -260 0 -220 C-58 -260 -48 -325 0 -370 Z"
              fill={`url(#${gradientPrefix}-emerald-main)`}
              stroke={`url(#${gradientPrefix}-gold-grad)`}
              strokeWidth="2"
            />
            {/* Inner Petal Shadow Inlay */}
            <path
              d="M0 -356 C36 -318 42 -268 0 -234 C-42 -268 -36 -318 0 -356 Z"
              fill={`url(#${gradientPrefix}-jade-deep)`}
              opacity="0.9"
            />
            {/* Petal Central Gold Vein Spine */}
            <path
              d="M0 -355 L0 -238"
              stroke={`url(#${gradientPrefix}-gold-grad)`}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Inner Sage Tear Drop Accent */}
            <path
              d="M0 -328 C16 -296 16 -268 0 -252 C-16 -268 -16 -296 0 -328 Z"
              fill={`url(#${gradientPrefix}-sage-light)`}
              stroke={`url(#${gradientPrefix}-gold-grad)`}
              strokeWidth="1.2"
              opacity="0.85"
            />
            {/* Gold Tip Finial Bead */}
            <circle cx="0" cy="-382" r="5.5" fill={`url(#${gradientPrefix}-gold-shine)`} stroke="#123b32" strokeWidth="1" />
            <circle cx="0" cy="-392" r="2.5" fill={`url(#${gradientPrefix}-gold-shine)`} />
          </g>

          {/* 2. Tier 2 - Offset Pointed Lotus Spear (16 count, offset 11.25 deg) */}
          <g id={`${gradientPrefix}-petal-tier2`}>
            <path
              d="M0 -315 C34 -278 40 -220 0 -185 C-40 -220 -34 -278 0 -315 Z"
              fill={`url(#${gradientPrefix}-gold-grad)`}
              stroke="#0a251f"
              strokeWidth="1.5"
            />
            <path
              d="M0 -304 C24 -272 26 -228 0 -196 C-26 -228 -24 -272 0 -304 Z"
              fill={`url(#${gradientPrefix}-emerald-main)`}
            />
            {/* Petite Center Gem */}
            <circle cx="0" cy="-268" r="4" fill={`url(#${gradientPrefix}-gold-shine)`} />
            <path d="M0 -304 L0 -210" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.2" />
          </g>

          {/* 3. Tier 3 - Ornate Heart Petal (16 count) */}
          <g id={`${gradientPrefix}-petal-tier3`}>
            <path
              d="M0 -235 C28 -210 32 -165 0 -140 C-32 -165 -28 -210 0 -235 Z"
              fill={`url(#${gradientPrefix}-jade-deep)`}
              stroke={`url(#${gradientPrefix}-gold-grad)`}
              strokeWidth="1.6"
            />
            <path
              d="M0 -224 C18 -204 20 -170 0 -150 C-20 -170 -18 -204 0 -224 Z"
              fill={`url(#${gradientPrefix}-sage-light)`}
              opacity="0.9"
            />
            <circle cx="0" cy="-192" r="4.5" fill={`url(#${gradientPrefix}-emerald-main)`} stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.2" />
          </g>

          {/* 4. Tier 4 - Central Radiating Lotus Bloom (8 count) */}
          <g id={`${gradientPrefix}-petal-core`}>
            <path
              d="M0 -145 C22 -125 24 -85 0 -68 C-24 -85 -22 -125 0 -145 Z"
              fill={`url(#${gradientPrefix}-gold-grad)`}
              stroke="#0a251f"
              strokeWidth="1.4"
            />
            <path
              d="M0 -136 C14 -120 14 -92 0 -76 C-14 -92 -14 -120 0 -136 Z"
              fill={`url(#${gradientPrefix}-emerald-main)`}
            />
            <circle cx="0" cy="-114" r="3" fill="#f3d48d" />
          </g>
        </defs>

        {/* Master Mandala Assembly Centered at (400, 400) */}
        <g transform="translate(400, 400)" filter={`url(#${gradientPrefix}-shadow)`}>
          {/* Base Ambient Backdrop Rings */}
          <circle r="388" fill="none" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.2" opacity="0.45" strokeDasharray="3 7" />
          <circle r="372" fill="#123b32" fillOpacity="0.14" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.5" />
          <circle r="322" fill="#246a5a" fillOpacity="0.1" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.2" />
          <circle r="248" fill="#123b32" fillOpacity="0.22" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.8" />
          <circle r="158" fill="#0d2b24" fillOpacity="0.35" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="2" />

          {/* Tier 1 Outer 16 Grand Petals */}
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(0)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(22.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(45)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(67.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(90)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(112.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(135)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(157.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(180)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(202.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(225)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(247.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(270)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(292.5)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(315)" />
          <use href={`#${gradientPrefix}-petal-outer`} transform="rotate(337.5)" />

          {/* Tier 2 Offset 16 Spears */}
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(11.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(33.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(56.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(78.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(101.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(123.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(146.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(168.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(191.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(213.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(236.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(258.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(281.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(303.75)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(326.25)" />
          <use href={`#${gradientPrefix}-petal-tier2`} transform="rotate(348.75)" />

          {/* Delicate Concentric Intermediate Filigree Ring */}
          <circle r="238" fill="none" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.8" />
          <circle r="230" fill="none" stroke={`url(#${gradientPrefix}-sage-light)`} strokeWidth="1" strokeDasharray="4 4" />

          {/* Tier 3 16 Ornate Petals */}
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(0)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(22.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(45)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(67.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(90)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(112.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(135)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(157.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(180)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(202.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(225)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(247.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(270)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(292.5)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(315)" />
          <use href={`#${gradientPrefix}-petal-tier3`} transform="rotate(337.5)" />

          {/* Inner Golden Beaded Filigree Circle */}
          <circle r="148" fill="none" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="2.2" />
          <circle r="138" fill="none" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.2" strokeDasharray="3 5" />

          {/* Tier 4 Central 8-Petal Royal Lotus */}
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(0)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(45)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(90)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(135)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(180)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(225)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(270)" />
          <use href={`#${gradientPrefix}-petal-core`} transform="rotate(315)" />

          {/* Core Royal Mandala Center Hub */}
          <circle r="72" fill={`url(#${gradientPrefix}-emerald-main)`} stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="2.4" />
          <circle r="56" fill={`url(#${gradientPrefix}-sage-light)`} stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="1.6" />
          
          {/* Radiating 8 Gold Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line x1="0" y1="-30" x2="0" y2="-52" stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy="-48" r="2" fill={`url(#${gradientPrefix}-emerald-main)`} />
            </g>
          ))}

          {/* Central Emerald & Gold Jewel Boss */}
          <circle r="32" fill={`url(#${gradientPrefix}-emerald-main)`} stroke={`url(#${gradientPrefix}-gold-grad)`} strokeWidth="2" />
          <circle r="20" fill={`url(#${gradientPrefix}-gold-shine)`} stroke="#0a251f" strokeWidth="1.2" />
          <circle r="10" fill={`url(#${gradientPrefix}-emerald-main)`} />
          <circle r="4" fill="#ffffff" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
