import React from 'react';

export default function SvgSprites() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style={{ position: 'absolute', overflow: 'hidden' }}>
      <defs>
        <symbol id="icon-arrow" viewBox="0 0 24 24">
          <path d="M4 12h15M13 5l7 7-7 7"></path>
        </symbol>
        <symbol id="icon-search" viewBox="0 0 24 24">
          <circle cx="10.5" cy="10.5" r="6.5"></circle>
          <path d="m16 16 5 5"></path>
        </symbol>
        <symbol id="icon-bag" viewBox="0 0 24 24">
          <path d="M5 7h14l1 14H4L5 7Z"></path>
          <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
        </symbol>
        <symbol id="icon-close" viewBox="0 0 24 24">
          <path d="m6 6 12 12M18 6 6 18"></path>
        </symbol>
        <symbol id="icon-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </symbol>
        <symbol id="icon-gem" viewBox="0 0 24 24">
          <path d="m3 8 4-5h10l4 5-9 13L3 8ZM3 8h18M7 3l5 18 5-18M7 3l5 5 5-5"></path>
        </symbol>
        <symbol id="icon-heart" viewBox="0 0 24 24">
          <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 6l-1-1.2a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"></path>
        </symbol>
        <symbol id="icon-craft" viewBox="0 0 24 24">
          <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"></path>
        </symbol>
        <symbol id="icon-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"></circle>
          <ellipse cx="12" cy="12" rx="4" ry="9"></ellipse>
          <path d="M3 12h18"></path>
        </symbol>
        <symbol id="icon-return" viewBox="0 0 24 24">
          <path d="M4 10a8 8 0 1 1 0 5M4 4v6h6"></path>
        </symbol>
        <symbol id="icon-user" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.3"></circle>
          <path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.3"></path>
        </symbol>
        <symbol id="icon-instagram" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M17.5 6.5h.01"></path>
        </symbol>
        <symbol id="icon-pinterest" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="m9 21 3-13M10.5 14c4 5 9-5 3-7-5-2-8 4-5 7"></path>
        </symbol>
        <symbol id="icon-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="1"></rect>
          <path d="m3 6 9 7 9-7"></path>
        </symbol>
        <symbol id="flat-ring-art" viewBox="0 0 240 280">
          {/* Silver Band */}
          <ellipse cx="120" cy="180" rx="72" ry="80" fill="none" stroke="#d5dee6" strokeWidth="15"></ellipse>
          <ellipse cx="120" cy="180" rx="72" ry="80" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.8"></ellipse>
          <ellipse cx="120" cy="180" rx="64" ry="72" fill="none" stroke="#9baab8" strokeWidth="1.5"></ellipse>
          
          {/* 6-Prong Crown Base */}
          <path d="M96 100 L120 114 L144 100 L140 88 L120 92 L100 88 Z" fill="#c4d1de" stroke="#8fa1b3" strokeWidth="1"></path>
          
          {/* 6 Prongs */}
          <path d="M98 94 L86 52 M142 94 L154 52 M108 98 L104 46 M132 98 L136 46 M116 100 L114 44 M124 100 L126 44" fill="none" stroke="#b0c0d0" strokeWidth="4" strokeLinecap="round"></path>
          <circle cx="86" cy="50" r="3.5" fill="#e8f0f8" stroke="#8fa1b3" strokeWidth="0.8"></circle>
          <circle cx="154" cy="50" r="3.5" fill="#e8f0f8" stroke="#8fa1b3" strokeWidth="0.8"></circle>
          <circle cx="104" cy="44" r="3.5" fill="#e8f0f8" stroke="#8fa1b3" strokeWidth="0.8"></circle>
          <circle cx="136" cy="44" r="3.5" fill="#e8f0f8" stroke="#8fa1b3" strokeWidth="0.8"></circle>
          
          {/* Brilliant Cut Diamond */}
          <path d="M88 56 L120 34 L152 56 L120 96 Z" fill="#f8fcff" stroke="#a0b8cc" strokeWidth="1.5"></path>
          <path d="M102 44 L120 34 L138 44 L152 56 L120 62 L88 56 Z" fill="#ffffff" stroke="#a0b8cc" strokeWidth="1"></path>
          <polygon points="102,44 138,44 120,62" fill="#edf4fa"></polygon>
          <polygon points="88,56 102,44 120,62" fill="#e2edf7"></polygon>
          <polygon points="152,56 138,44 120,62" fill="#d9e6f2"></polygon>
          <polygon points="88,56 120,62 120,96" fill="#f0f6fc"></polygon>
          <polygon points="152,56 120,62 120,96" fill="#e1ecf6"></polygon>
        </symbol>
      </defs>
    </svg>
  );
}
