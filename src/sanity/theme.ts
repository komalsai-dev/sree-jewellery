import { buildLegacyTheme } from 'sanity';

// Sree Luxury Ivory & Emerald Brand Studio Theme
export const sreeTheme = buildLegacyTheme({
  /* Base colors */
  '--black': '#241a16',           // Deep Espresso text
  '--white': '#ffffff',           // Pure white
  '--gray-base': '#78716c',       // Muted Stone gray

  /* Component colors */
  '--component-bg': '#faf7f2',    // Sree Ivory
  '--component-text-color': '#241a16', // Espresso

  /* Brand / Primary */
  '--brand-primary': '#123b32',   // Deep Emerald

  /* Default buttons */
  '--default-button-color': '#78716c',
  '--default-button-primary-color': '#123b32', // Deep Emerald
  '--default-button-success-color': '#10b981',
  '--default-button-warning-color': '#c9a15a', // Antique Gold
  '--default-button-danger-color': '#ef4444',

  /* State indicators */
  '--state-info-color': '#123b32',
  '--state-success-color': '#10b981',
  '--state-warning-color': '#c9a15a',
  '--state-danger-color': '#ef4444',

  /* Main navigation */
  '--main-navigation-color': '#123b32',         // Deep Emerald Header
  '--main-navigation-color--inverted': '#faf7f2', // Ivory text/icons
  '--focus-color': '#c9a15a',                    // Gold outline on focus
});
