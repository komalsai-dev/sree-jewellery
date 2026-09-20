'use client';

import React, { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    const observeAll = () => {
      const elementsToObserve = document.querySelectorAll(
        '[data-reveal], .section-heading, .pcard, .chapter-card, .collection-banner-card, .trust-item, .callout, .campaign-banner__copy, .final-heading, .final-copy'
      );
      elementsToObserve.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Re-observe if DOM changes (e.g. products fetched or tabs switched)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
