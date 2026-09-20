'use client';

import React from 'react';

/**
 * HeroBgRangoliArt
 * Single centered mandala art behind the 3D ring — soft blurred ambient backdrop.
 */
export default function HeroBgRangoliArt() {
  return (
    <div className="hero-bg-rangoli-canvas" aria-hidden="true">

      {/* ─── Center behind ring — large radial mandala ─── */}
      <svg
        className="hero-bg-motif hero-bg-motif--center"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hbg-em" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#246a5a" />
            <stop offset="100%" stopColor="#123b32" />
          </linearGradient>
          <linearGradient id="hbg-gd" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3d48d" />
            <stop offset="50%" stopColor="#c9a15a" />
            <stop offset="100%" stopColor="#dfb76c" />
          </linearGradient>
          <linearGradient id="hbg-sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#edf2e8" />
            <stop offset="100%" stopColor="#dee4d8" />
          </linearGradient>
          <radialGradient id="hbg-gd-r" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff1cc" />
            <stop offset="50%" stopColor="#c9a15a" />
            <stop offset="100%" stopColor="#9e7939" />
          </radialGradient>
        </defs>
        <g transform="translate(300, 300)">
          {/* Outermost rings */}
          <circle r="290" fill="none" stroke="url(#hbg-gd)" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 8" />
          <circle r="265" fill="none" stroke="url(#hbg-gd)" strokeWidth="1.8" opacity="0.4" />
          <circle r="235" fill="url(#hbg-em)" fillOpacity="0.08" stroke="url(#hbg-gd)" strokeWidth="1.2" opacity="0.45" />

          {/* 16 outer grand petals */}
          {Array.from({ length: 16 }, (_, i) => i * 22.5).map((deg) => (
            <g key={`o-${deg}`} transform={`rotate(${deg})`}>
              <path
                d="M0 -260 C28 -225 34 -180 0 -155 C-34 -180 -28 -225 0 -260 Z"
                fill="url(#hbg-em)"
                opacity="0.3"
                stroke="url(#hbg-gd)"
                strokeWidth="0.8"
              />
              <path
                d="M0 -242 C16 -215 18 -185 0 -168 C-18 -185 -16 -215 0 -242 Z"
                fill="url(#hbg-sg)"
                opacity="0.2"
              />
              <line x1="0" y1="-255" x2="0" y2="-162" stroke="url(#hbg-gd)" strokeWidth="0.6" opacity="0.35" />
              <circle cx="0" cy="-268" r="3.5" fill="url(#hbg-gd-r)" opacity="0.45" />
            </g>
          ))}

          {/* Inner tier — 16 offset gold spears */}
          <circle r="150" fill="none" stroke="url(#hbg-gd)" strokeWidth="1.2" opacity="0.35" />
          <circle r="142" fill="none" stroke="url(#hbg-sg)" strokeWidth="0.8" opacity="0.2" strokeDasharray="3 5" />

          {Array.from({ length: 16 }, (_, i) => i * 22.5 + 11.25).map((deg) => (
            <g key={`i-${deg}`} transform={`rotate(${deg})`}>
              <path
                d="M0 -145 C16 -122 18 -85 0 -70 C-18 -85 -16 -122 0 -145 Z"
                fill="url(#hbg-gd)"
                opacity="0.2"
              />
              <circle cx="0" cy="-150" r="2.5" fill="url(#hbg-gd-r)" opacity="0.3" />
            </g>
          ))}

          {/* 8 inner core lotus petals */}
          <circle r="95" fill="url(#hbg-em)" fillOpacity="0.06" stroke="url(#hbg-gd)" strokeWidth="1" opacity="0.3" />

          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={`c-${deg}`} transform={`rotate(${deg})`}>
              <path
                d="M0 -90 C12 -72 14 -48 0 -38 C-14 -48 -12 -72 0 -90 Z"
                fill="url(#hbg-em)"
                opacity="0.2"
              />
            </g>
          ))}

          {/* Center ornament */}
          <circle r="35" fill="url(#hbg-sg)" fillOpacity="0.15" stroke="url(#hbg-gd)" strokeWidth="0.8" />
          {/* 8 gold sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={`r-${deg}`} transform={`rotate(${deg})`}>
              <line x1="0" y1="-18" x2="0" y2="-32" stroke="url(#hbg-gd)" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
            </g>
          ))}
          <circle r="16" fill="url(#hbg-gd)" fillOpacity="0.2" />
          <circle r="7" fill="url(#hbg-em)" fillOpacity="0.25" />
        </g>
      </svg>

    </div>
  );
}
