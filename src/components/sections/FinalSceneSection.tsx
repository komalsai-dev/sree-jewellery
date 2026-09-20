'use client';

import React from 'react';
import SketchUnderline from '@/components/ui/SketchUnderline';

export default function FinalSceneSection() {
  return (
    <section className="final-section" id="final-scene" aria-labelledby="final-title">
      <div className="final-heading" data-reveal>
        <p className="eyebrow">TRADITION THAT LIVES FOREVER</p>
        <h2 id="final-title">Auspicious Blessings.<br />Timeless <SketchUnderline text="Beauty." /></h2>
      </div>

      <p className="final-edition">The Signature Ring<span>Sree Masterpiece</span></p>

      <div className="scene-anchor" id="final-ring-anchor">
        <svg className="flat-ring scene-fallback" role="img" aria-label="The Sree signature solitaire ring">
          <use href="#flat-ring-art"></use>
        </svg>
      </div>

      <div className="final-copy" data-reveal>
        <p>Precious today. Cherished for generations.<br />Find the traditional jewellery crafted for your family.</p>
        <a className="button" href="#bestsellers">
          Explore Full Collection 
          <svg className="icon">
            <use href="#icon-arrow"></use>
          </svg>
        </a>
      </div>
    </section>
  );
}
