'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { makeRoundDiamondGeometry } from './gemGeometry';

gsap.registerPlugin(ScrollTrigger);

const palette = {
  ivory: '#f7f3ec',
  sage: '#dee4d8',
  emerald: '#123b32',
  espresso: '#1a1e24',
  silver: '#f2f6fa',
  silverWhite: '#ffffff',
  silverShadow: '#9fb0c2',
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export default function Ring3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        precision: "highp"
      });
    } catch (e) {
      console.warn("WebGL unavailable for 3D ring canvas.", e);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, viewportWidth < 760 ? 1.5 : 2));
    renderer.setSize(viewportWidth, viewportHeight, false);
    renderer.setClearColor(new THREE.Color(palette.ivory), 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.classList.add('webgl-ready');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, viewportWidth / viewportHeight, 0.1, 100);
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    // Precomputed view frustum world dimensions
    let worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    let worldWidth = worldHeight * camera.aspect;

    // Studio Lights for high-end Silver & Diamond brilliance
    const ambient = new THREE.AmbientLight('#ffffff', 1.4);
    scene.add(ambient);
    const hemisphere = new THREE.HemisphereLight('#ffffff', '#c6d7e8', 1.8);
    scene.add(hemisphere);

    const key = new THREE.DirectionalLight('#ffffff', 5.2);
    key.position.set(-3, 6, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.normalBias = 0.03;
    scene.add(key);

    const rim = new THREE.DirectionalLight('#d6e4f2', 3.4);
    rim.position.set(4, 1, -4);
    scene.add(rim);

    const glint = new THREE.PointLight('#ffffff', 38, 35, 2);
    glint.position.set(3, 2, 5);
    scene.add(glint);

    const coolSilverFill = new THREE.PointLight('#edf3fa', 18, 30, 2);
    coolSilverFill.position.set(-4, -2, 4);
    scene.add(coolSilverFill);

    // Studio reflection box for pristine mirror-sheen silver & diamond facet refraction
    const studio = new THREE.Scene();
    studio.background = new THREE.Color(palette.espresso);
    const studioMaterials: THREE.Material[] = [];
    const studioGeometries: THREE.BufferGeometry[] = [];

    function studioPanel(w: number, h: number, pos: [number, number, number], rot: [number, number, number], col: string, intensity: number) {
      const geometry = new THREE.PlaneGeometry(w, h);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(col).multiplyScalar(intensity),
        side: THREE.DoubleSide
      });
      const panel = new THREE.Mesh(geometry, material);
      panel.position.set(...pos);
      panel.rotation.set(...rot);
      studio.add(panel);
      studioMaterials.push(material);
      studioGeometries.push(geometry);
    }

    studioPanel(6, 12, [-6, 3, 2], [0, Math.PI / 2, 0], '#ffffff', 4.4);
    studioPanel(4, 10, [6, 2, 2], [0, -Math.PI / 2, 0], '#ffffff', 3.6);
    studioPanel(10, 5, [0, 7, 0], [Math.PI / 2, 0, 0], '#ffffff', 4.8);
    studioPanel(9, 9, [0, 0, -7], [0, 0, 0], '#d0deee', 1.8);
    studioPanel(1.5, 8, [2, 0, 6], [0, Math.PI, 0], '#ffffff', 2.4);
    studioPanel(4, 6, [-4, -3, 4], [0, 0, 0.3], '#10141a', 1.2);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(studio, 0.025, 0.1, 50);
    scene.environment = environmentTarget.texture;
    pmrem.dispose();
    studioMaterials.forEach(m => m.dispose());
    studioGeometries.forEach(g => g.dispose());

    // --- High-End Jewellery Materials ---
    // 1. Polished 925 Sterling Silver / Platinum Material
    const silverMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f2f5f9'),
      metalness: 1.0,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      envMapIntensity: 2.8,
    });

    // 2. Crystal Brilliant Round Diamond Material
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.0,
      roughness: 0.012,
      transmission: 0.94,
      thickness: 0.88,
      ior: 2.417,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      attenuationColor: new THREE.Color('#f7fbff'),
      attenuationDistance: 4.0,
      envMapIntensity: 3.6,
      side: THREE.DoubleSide
    });

    // --- 3D Ring Object Assembly ---
    const narrator = new THREE.Group();
    const floatingRig = new THREE.Group();
    const model = new THREE.Group();
    scene.add(narrator);
    narrator.add(floatingRig);
    floatingRig.add(model);
    model.position.y = -0.2;

    // 1. Polished Sterling Silver Shank (Band)
    const bandGeometry = new THREE.TorusGeometry(0.94, 0.095, 32, 160);
    const band = new THREE.Mesh(bandGeometry, silverMaterial);
    band.castShadow = true;
    band.receiveShadow = true;
    model.add(band);

    // Subtle comfort-fit contoured bevel ridges along the shank
    const edgeGeometry = new THREE.TorusGeometry(0.94, 0.024, 16, 120);
    [-0.065, 0.065].forEach(z => {
      const edge = new THREE.Mesh(edgeGeometry, silverMaterial);
      edge.position.z = z;
      model.add(edge);
    });

    // 2. 6-Prong Cathedral / Crown Solitaire Setting
    const setting = new THREE.Group();
    setting.position.set(0, 0.94, 0);
    setting.rotation.x = 0.20; // Natural graceful forward angle for optimal facet viewing
    model.add(setting);

    // Base Collar Ring (at the base of the prongs)
    const baseCollar = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.032, 16, 36),
      silverMaterial
    );
    baseCollar.rotation.x = Math.PI / 2;
    baseCollar.position.y = -0.01;
    setting.add(baseCollar);

    // Gallery Mid-Bridge Ring (stabilizing prongs under diamond girdle)
    const galleryRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.022, 16, 36),
      silverMaterial
    );
    galleryRing.rotation.x = Math.PI / 2;
    galleryRing.position.y = 0.14;
    setting.add(galleryRing);

    // 6 Sculptural Silver Prongs / Claws with rounded tips
    const numProngs = 6;
    const clawTipGeom = new THREE.SphereGeometry(0.032, 14, 12);

    for (let i = 0; i < numProngs; i++) {
      const angle = (i * 2 * Math.PI) / numProngs + Math.PI / 6;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Spline curve: base collar -> gallery ring -> girdle clasp -> inward claw tip
      const pBase = new THREE.Vector3(cosA * 0.17, -0.02, sinA * 0.17);
      const pMid = new THREE.Vector3(cosA * 0.36, 0.14, sinA * 0.36);
      const pGirdle = new THREE.Vector3(cosA * 0.485, 0.28, sinA * 0.485);
      const pTip = new THREE.Vector3(cosA * 0.435, 0.36, sinA * 0.435);

      const curve = new THREE.CatmullRomCurve3([pBase, pMid, pGirdle, pTip]);
      const prongGeom = new THREE.TubeGeometry(curve, 20, 0.027, 12, false);
      const prongMesh = new THREE.Mesh(prongGeom, silverMaterial);
      prongMesh.castShadow = true;
      setting.add(prongMesh);

      // Rounded claw tip gripping the crown facet
      const clawTip = new THREE.Mesh(clawTipGeom, silverMaterial);
      clawTip.position.copy(pTip);
      setting.add(clawTip);
    }

    // 3. Center Brilliant Round Cut Solitaire Diamond
    const diamondGeom = makeRoundDiamondGeometry();
    const diamond = new THREE.Mesh(diamondGeom, diamondMaterial);
    diamond.position.y = 0.28;
    diamond.scale.set(1.02, 1.02, 1.02);
    diamond.castShadow = true;
    setting.add(diamond);

    // 4. Diamond Fire & Sparkle Star Flare
    const sparkleMaterial = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const sparkle = new THREE.Group();
    const sparkleH = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.015), sparkleMaterial);
    const sparkleV = new THREE.Mesh(new THREE.PlaneGeometry(0.015, 0.24), sparkleMaterial);
    const sparkleD1 = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.010), sparkleMaterial);
    sparkleD1.rotation.z = Math.PI / 4;
    const sparkleD2 = new THREE.Mesh(new THREE.PlaneGeometry(0.010, 0.14), sparkleMaterial);
    sparkleD2.rotation.z = Math.PI / 4;
    sparkle.add(sparkleH, sparkleV, sparkleD1, sparkleD2);
    sparkle.position.set(0.18, 1.32, 0.38);
    model.add(sparkle);

    // Dynamic Screen Anchor State
    let targetScroll = window.scrollY;
    let smoothScroll = window.scrollY;
    let contextLost = false;
    let disposed = false;
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let introFinished = false;
    let lastCanvasOpacity = -1;

    // Anchor cache in absolute document space
    const heroAnchor = { x: viewportWidth * 0.5, y: viewportHeight * 0.38, size: Math.min(viewportWidth * 0.45, 320) };
    const bubbleAnchor = { x: viewportWidth * 0.5, y: viewportHeight * 1.2, size: 92 };
    const finalAnchor = { x: viewportWidth * 0.5, y: viewportHeight * 4.5, size: 280 };
    let cachedCatBottom = 1600;
    let cachedFinalTop = 99999;

    function measureAnchors() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      const heroEl = document.querySelector("#hero-ring-anchor");
      const bubbleEl = document.querySelector("#rings-bubble");
      const finalEl = document.querySelector("#final-ring-anchor");
      const categorySectionEl = document.querySelector("#categories");
      const finalSectionEl = document.querySelector("#final-scene");

      if (heroEl) {
        const r = heroEl.getBoundingClientRect();
        heroAnchor.x = r.left + r.width / 2;
        heroAnchor.y = r.top + scrollY + r.height / 2;
        heroAnchor.size = r.height * 0.95 || Math.min(viewportWidth * 0.45, 320);
      }

      if (bubbleEl) {
        const r = bubbleEl.getBoundingClientRect();
        bubbleAnchor.x = r.left + r.width / 2;
        bubbleAnchor.y = r.top + scrollY + r.height / 2;
        bubbleAnchor.size = r.height * 0.86 || 92;
      }

      if (finalEl) {
        const r = finalEl.getBoundingClientRect();
        finalAnchor.x = r.left + r.width / 2;
        finalAnchor.y = r.top + scrollY + r.height / 2;
        finalAnchor.size = r.height || 280;
      }

      if (categorySectionEl) {
        const r = categorySectionEl.getBoundingClientRect();
        cachedCatBottom = r.bottom + scrollY;
      } else {
        cachedCatBottom = bubbleAnchor.y + 600;
      }

      if (finalSectionEl) {
        const r = finalSectionEl.getBoundingClientRect();
        cachedFinalTop = r.top + scrollY;
      } else {
        cachedFinalTop = 99999;
      }
    }

    function computePose(currentScroll: number, smooth: number) {
      // Transition thresholds based on document structure
      const dockStart = Math.max(20, bubbleAnchor.y - viewportHeight * 0.85);
      const dockEnd = Math.max(dockStart + 80, bubbleAnchor.y - viewportHeight * 0.62);
      const dockExitStart = Math.max(dockEnd + 200, cachedCatBottom - viewportHeight * 0.55);
      const dockExitEnd = dockExitStart + 150;

      const finalEnterStart = cachedFinalTop - viewportHeight * 0.55;
      const finalEnterEnd = cachedFinalTop - viewportHeight * 0.35;
      const finalExitStart = cachedFinalTop + viewportHeight * 0.7;
      const finalExitEnd = finalExitStart + 200;

      // 1. HERO TO CATEGORY SEAMLESS TRANSITION
      if (smooth <= dockEnd) {
        const t = clamp(smooth / Math.max(1, dockEnd), 0, 1);
        const e = smoothstep(t);

        // Interpolate document coordinates, then project directly to the current viewport scroll
        const docX = lerp(heroAnchor.x, bubbleAnchor.x, e);
        const docY = lerp(heroAnchor.y, bubbleAnchor.y, e);
        const size = lerp(heroAnchor.size, bubbleAnchor.size, e);
        const floatWeight = lerp(1, 0, e);

        const rx = lerp(0.12, 0.05, e);
        const ry = lerp(-0.42, 0.0, e) + (smooth * 0.0012);
        const rz = lerp(-0.24, -0.01, e);

        return {
          x: docX,
          y: docY - currentScroll,
          size,
          opacity: 1,
          rx,
          ry,
          rz,
          float: floatWeight
        };
      }

      // 2. DOCKED IN CATEGORY CIRCLE (#rings-bubble)
      // Screen coordinates are locked 100% to bubble's exact viewport position
      if (smooth <= dockExitStart) {
        return {
          x: bubbleAnchor.x,
          y: bubbleAnchor.y - currentScroll,
          size: bubbleAnchor.size,
          opacity: 1,
          rx: 0.05,
          ry: (smooth - dockEnd) * 0.0008,
          rz: -0.01,
          float: 0
        };
      }

      // 3. EXITING CATEGORY (Smooth fade-out into the bubble)
      if (smooth <= dockExitEnd) {
        const t = clamp((smooth - dockExitStart) / (dockExitEnd - dockExitStart), 0, 1);
        const e = smoothstep(t);

        return {
          x: bubbleAnchor.x,
          y: bubbleAnchor.y - currentScroll,
          size: lerp(bubbleAnchor.size, bubbleAnchor.size * 0.75, e),
          opacity: lerp(1, 0, e),
          rx: 0.05,
          ry: (dockExitStart - dockEnd) * 0.0008 + e * 0.2,
          rz: -0.01,
          float: 0
        };
      }

      // 4. MIDDLE SECTIONS (Completely hidden to preserve 100% GPU/CPU performance)
      if (smooth < finalEnterStart) {
        return {
          x: -9999,
          y: -9999,
          size: 0,
          opacity: 0,
          rx: 0,
          ry: 0,
          rz: 0,
          float: 0
        };
      }

      // 5. ENTERING FINAL SCENE
      if (smooth <= finalEnterEnd) {
        const t = clamp((smooth - finalEnterStart) / (finalEnterEnd - finalEnterStart), 0, 1);
        const e = smoothstep(t);

        return {
          x: finalAnchor.x,
          y: (finalAnchor.y - 100 * (1 - e)) - currentScroll,
          size: lerp(finalAnchor.size * 0.4, finalAnchor.size, e),
          opacity: lerp(0, 1, e),
          rx: lerp(0.4, 0.18, e),
          ry: lerp(Math.PI * 3, Math.PI * 4 - 0.35, e),
          rz: lerp(-0.25, -0.18, e),
          float: e
        };
      }

      // 6. FINAL SCENE ACTIVE
      if (smooth <= finalExitStart) {
        const t = clamp((smooth - finalEnterEnd) / Math.max(1, finalExitStart - finalEnterEnd), 0, 1);
        return {
          x: finalAnchor.x,
          y: finalAnchor.y - currentScroll,
          size: finalAnchor.size,
          opacity: 1,
          rx: 0.18 + t * 0.04,
          ry: (Math.PI * 4 - 0.35) + t * 0.7,
          rz: -0.18 + t * 0.3,
          float: 1
        };
      }

      // 7. FINAL SCENE EXIT
      if (smooth <= finalExitEnd) {
        const t = clamp((smooth - finalExitStart) / (finalExitEnd - finalExitStart), 0, 1);
        const e = smoothstep(t);
        return {
          x: finalAnchor.x,
          y: (finalAnchor.y + 80 * e) - currentScroll,
          size: lerp(finalAnchor.size, finalAnchor.size * 0.6, e),
          opacity: lerp(1, 0, e),
          rx: 0.22 + e * 0.18,
          ry: (Math.PI * 4 + 0.35) + e * 0.75,
          rz: 0.12 + e * 0.13,
          float: 1 - e
        };
      }

      return {
        x: -9999,
        y: -9999,
        size: 0,
        opacity: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        float: 0
      };
    }

    function renderFrame(now: number) {
      if (disposed) return;
      frameId = requestAnimationFrame(renderFrame);
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (document.hidden || contextLost) return;

      // Silky smooth dampened lerp matching story.js engine
      if (reducedMotion) {
        smoothScroll = targetScroll;
      } else {
        const decay = 10;
        smoothScroll += (targetScroll - smoothScroll) * (1 - Math.exp(-decay * delta));
        if (Math.abs(targetScroll - smoothScroll) < 0.05) {
          smoothScroll = targetScroll;
        }
      }

      if (!reducedMotion) elapsed += delta;

      const currentScroll = targetScroll;
      const pose = computePose(currentScroll, smoothScroll);

      const screenY = pose.y;
      const floatY = reducedMotion ? 0 : Math.sin(elapsed * 0.82) * 9 * pose.float;

      narrator.position.set(
        (pose.x / viewportWidth - 0.5) * worldWidth,
        (0.5 - (screenY + floatY) / viewportHeight) * worldHeight,
        0
      );
      const scale = (pose.size / viewportHeight) * worldHeight / 2.65;
      narrator.scale.setScalar(scale);
      narrator.rotation.set(pose.rx, pose.ry, pose.rz);

      floatingRig.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * 0.28) * 0.3 * pose.float;
      floatingRig.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.36) * 0.045 * pose.float;

      glint.position.set(
        narrator.position.x + Math.cos(elapsed * 0.7) * 3.8,
        narrator.position.y + 2 + Math.sin(elapsed * 0.9) * 2,
        4.5 + Math.sin(elapsed * 0.4)
      );
      const glintPulse = Math.pow(Math.max(0, Math.sin(elapsed * 1.45)), 28);
      sparkleMaterial.opacity = reducedMotion ? 0 : glintPulse * 0.85 * pose.float;
      sparkle.rotation.z = elapsed * 0.18;

      if (!introFinished && document.body.classList.contains("intro-complete")) {
        introFinished = true;
      }

      const offscreen = screenY < -pose.size || screenY > viewportHeight + pose.size ||
        pose.x < -pose.size || pose.x > viewportWidth + pose.size;
      const opacity = clamp(pose.opacity, 0, 1);

      const targetOpacity = introFinished ? opacity : 0;
      if (Math.abs(lastCanvasOpacity - targetOpacity) > 0.005) {
        lastCanvasOpacity = targetOpacity;
        if (canvas) {
          canvas.style.opacity = String(targetOpacity);
        }
      }

      if (opacity < 0.005 || offscreen || !introFinished) {
        narrator.visible = false;
        renderer.clear();
        return;
      }
      narrator.visible = true;
      renderer.render(scene, camera);
    }

    function resizeRenderer() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();

      worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      worldWidth = worldHeight * camera.aspect;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, viewportWidth < 760 ? 1.5 : 2));
      renderer.setSize(viewportWidth, viewportHeight, false);
      measureAnchors();
    }

    const onScroll = () => {
      targetScroll = window.scrollY || window.pageYOffset;
    };

    const onResize = () => {
      targetScroll = window.scrollY || window.pageYOffset;
      resizeRenderer();
      ScrollTrigger.refresh();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Category track horizontal scroll synchronization
    const catTrack = document.getElementById("category-track");
    if (catTrack) {
      catTrack.addEventListener("scroll", () => {
        const bubbleEl = document.getElementById("rings-bubble");
        if (bubbleEl) {
          const r = bubbleEl.getBoundingClientRect();
          const scrollY = window.scrollY || window.pageYOffset;
          bubbleAnchor.x = r.left + r.width / 2;
          bubbleAnchor.y = r.top + scrollY + r.height / 2;
          bubbleAnchor.size = r.height * 0.86 || 92;
        }
      }, { passive: true });
    }

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        measureAnchors();
        ScrollTrigger.refresh();
      });
    }

    // Initial measurements & convergence passes
    setTimeout(() => {
      measureAnchors();
      document.body.classList.add("webgl-ready");
      frameId = requestAnimationFrame(renderFrame);
    }, 150);

    setTimeout(() => {
      measureAnchors();
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse(obj => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) {
          if (Array.isArray(mesh.material)) mesh.material.forEach(m => materials.add(m));
          else materials.add(mesh.material);
        }
      });
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      environmentTarget.dispose();
      renderer.dispose();
      document.body.classList.remove('webgl-ready');
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="ring-canvas" 
      aria-hidden="true"
    />
  );
}
