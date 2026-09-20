'use client';

import React, { useEffect, useState } from 'react';

export default function LogoSplashIntro() {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery.matches;
    let introFinished = false;

    function runLogoIntro() {
      const logo = document.querySelector("#logo") as HTMLElement | null;
      const logoSlot = document.querySelector(".logo-slot") as HTMLElement | null;
      const splash = document.querySelector("#splash") as HTMLElement | null;

      if (!logo || !logoSlot) {
        requestAnimationFrame(runLogoIntro);
        return;
      }

      const rect = logoSlot.getBoundingClientRect();
      const toX = (rect.left + rect.width / 2) - window.innerWidth / 2;
      const toY = (rect.top + rect.height / 2) - window.innerHeight / 2;

      function completeIntro() {
        if (introFinished) return;
        introFinished = true;
        document.body.classList.add("intro-complete");
        logo!.style.transform = "";
        splash?.classList.add("opening", "dismissed");
        setTimeout(() => {
          setRemoved(true);
          if (logo) logo.style.willChange = "auto";
        }, reducedMotion ? 30 : 1200);
      }

      if (reducedMotion || !logo.animate) {
        completeIntro();
        return;
      }

      // Cloth curtains begin parting smoothly
      const timerOpen = setTimeout(() => {
        splash?.classList.add("opening");
      }, 650);

      // Logo glides from center to navbar slot synchronously as cloth opens
      const animation = logo.animate([
        { transform: "translate(-50%, -50%) scale(2.8)" },
        { transform: `translate(calc(-50% + ${toX}px), calc(-50% + ${toY}px)) scale(1)` }
      ], {
        duration: 950,
        delay: 700,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "both"
      });

      const timer1 = setTimeout(() => splash?.classList.add("dismissed"), 1350);
      const timer2 = setTimeout(() => document.body.classList.add("intro-complete"), 1650);

      animation.onfinish = () => {
        animation.cancel();
        completeIntro();
      };

      const onResize = () => {
        if (!introFinished) {
          animation.finish();
        }
      };

      window.addEventListener("resize", onResize, { once: true });
    }

    requestAnimationFrame(runLogoIntro);
  }, []);

  if (removed) return null;

  return (
    <div id="splash" className="emerald-curtain-intro" aria-hidden="true">
      {/* Left Emerald Cloth Curtain - Pure cloth with no lines */}
      <div className="curtain-panel curtain-panel--left">
        <div className="curtain-sheen" />
      </div>

      {/* Right Emerald Cloth Curtain - Pure cloth with no lines */}
      <div className="curtain-panel curtain-panel--right">
        <div className="curtain-sheen" />
      </div>

      {/* Central Ambient Glow Behind Centered Logo */}
      <div className="curtain-center-glow" />
    </div>
  );
}
