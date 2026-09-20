'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#faf7f2', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ==========================================================================
           SREE LUXURY SANITY STUDIO CUSTOM BRAND THEME OVERRIDES
           ========================================================================== */

        /* 1. Selected List Items & Tree Items (Emerald background + Crisp White text) */
        [data-selected="true"],
        [aria-selected="true"],
        [data-ui="PaneItem"][data-selected="true"],
        [data-ui="PaneItemPreview"][data-selected="true"],
        [data-ui="MenuItem"][data-selected="true"] {
          background-color: #123b32 !important;
          color: #ffffff !important;
        }

        /* Force all title, subtitle, kicker, and metadata text inside selected items to be crisp white */
        [data-selected="true"] *,
        [aria-selected="true"] *,
        [data-ui="PaneItem"][data-selected="true"] *,
        [data-ui="PaneItemPreview"][data-selected="true"] *,
        [data-ui="MenuItem"][data-selected="true"] * {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        [data-selected="true"] [data-muted="true"],
        [aria-selected="true"] [data-muted="true"],
        [data-selected="true"] span,
        [data-selected="true"] p,
        [data-selected="true"] [data-ui="Text"] {
          color: rgba(255, 255, 255, 0.92) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.92) !important;
          opacity: 0.95 !important;
        }

        [data-selected="true"] svg,
        [aria-selected="true"] svg {
          color: #ffffff !important;
          stroke: #ffffff !important;
        }

        /* 2. Unselected List Items - Clean Espresso text on soft Ivory card */
        [data-ui="PaneItem"]:not([data-selected="true"]),
        [data-ui="PaneItemPreview"]:not([data-selected="true"]) {
          transition: background-color 0.18s ease, transform 0.18s ease;
        }

        [data-ui="PaneItem"]:not([data-selected="true"]):hover,
        [data-ui="PaneItemPreview"]:not([data-selected="true"]):hover {
          background-color: rgba(18, 59, 50, 0.06) !important;
        }

        /* 3. Product Group / Fieldset Navigation Tabs */
        /* Default / Unselected Tabs */
        [role="tab"],
        [data-ui="Tab"] {
          background-color: #ffffff !important;
          color: #241a16 !important;
          border: 1px solid rgba(201, 161, 90, 0.35) !important;
          border-radius: 6px !important;
          margin-right: 6px !important;
          padding: 6px 14px !important;
          font-weight: 500 !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
          transition: all 0.2s ease !important;
        }

        [role="tab"] *,
        [data-ui="Tab"] * {
          color: #241a16 !important;
          -webkit-text-fill-color: #241a16 !important;
        }

        [role="tab"]:hover,
        [data-ui="Tab"]:hover {
          background-color: rgba(18, 59, 50, 0.08) !important;
          border-color: #123b32 !important;
          color: #123b32 !important;
        }

        [role="tab"]:hover *,
        [data-ui="Tab"]:hover * {
          color: #123b32 !important;
          -webkit-text-fill-color: #123b32 !important;
        }

        /* Selected / Active Tabs (Deep Emerald Green + Crisp White Text) */
        [role="tab"][aria-selected="true"],
        [role="tab"][data-selected="true"],
        [data-ui="Tab"][aria-selected="true"],
        [data-ui="Tab"][data-selected="true"] {
          background-color: #123b32 !important;
          color: #ffffff !important;
          border-color: #123b32 !important;
          box-shadow: 0 3px 10px rgba(18, 59, 50, 0.25) !important;
        }

        [role="tab"][aria-selected="true"] *,
        [role="tab"][data-selected="true"] *,
        [data-ui="Tab"][aria-selected="true"] *,
        [data-ui="Tab"][data-selected="true"] * {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 600 !important;
        }

        /* 4. Luxury Inputs & Form Borders */
        input:focus, textarea:focus, select:focus {
          border-color: #c9a15a !important;
          box-shadow: 0 0 0 1px #c9a15a !important;
        }

        /* 5. Publish Button Styling */
        button[data-testid="action-intent-button"],
        button[data-testid="publish-button"] {
          background-color: #123b32 !important;
          color: #ffffff !important;
          border-radius: 6px !important;
          font-weight: 600 !important;
        }
      `}} />
      <NextStudio config={config} />
    </div>
  );
}
