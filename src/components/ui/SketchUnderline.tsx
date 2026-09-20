import React from 'react';

interface SketchUnderlineProps {
  text: string;
  className?: string;
  variant?: 'emerald-line' | 'gold-line';
}

export default function SketchUnderline({ text, className = '', variant }: SketchUnderlineProps) {
  const variantClass = variant ? `sketch-underline--${variant}` : '';
  return (
    <span className={`hero-underline-wrap ${variantClass} ${className}`.trim()}>
      <em>{text}</em>
      <svg className="hero-sketch-underline" viewBox="0 0 220 24" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M 2 5 C 55 3, 150 4, 218 5" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 215 11 C 155 10, 65 11, 8 12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        <path d="M 18 18 C 75 17, 145 17, 198 18" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      </svg>
    </span>
  );
}
