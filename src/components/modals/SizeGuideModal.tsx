'use client';

import React, { useState } from 'react';
import { useModals } from '@/context/ModalContext';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useModals();
  const [activeTab, setActiveTab] = useState<'rings' | 'bangles' | 'necklaces'>('rings');

  if (!isSizeGuideOpen) return null;

  return (
    <div 
      className="search-scrim" 
      onClick={closeSizeGuide}
      style={{ zIndex: 1300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      aria-modal="true"
      role="dialog"
      aria-label="Jewellery Size Guide & Measurement Chart"
    >
      <div 
        className="size-guide-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#faf7f2',
          border: '1px solid rgba(201, 161, 90, 0.35)',
          borderRadius: '16px',
          width: 'min(680px, 96vw)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 80px rgba(20, 16, 11, 0.3)',
          overflow: 'hidden',
          animation: 'dialog-enter 0.35s ease forwards'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(201, 161, 90, 0.22)',
          background: '#faf7f2'
        }}>
          <div>
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a15a', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
              Precision Sizing Chart
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1a140e', margin: 0, fontWeight: 500 }}>
              Jewellery Size Guide
            </h2>
          </div>
          <button 
            type="button" 
            onClick={closeSizeGuide}
            className="drawer__close-btn"
            aria-label="Close size guide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(201, 161, 90, 0.2)',
          padding: '0 24px',
          gap: '8px',
          background: '#f5efe4'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('rings')}
            style={{
              padding: '12px 18px',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'rings' ? '2.5px solid #123b32' : '2.5px solid transparent',
              color: activeTab === 'rings' ? '#123b32' : 'rgba(26, 20, 14, 0.6)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="14" r="7"></circle>
              <polygon points="12 3 15 7 9 7 12 3"></polygon>
            </svg>
            Ring Sizes (Indian)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bangles')}
            style={{
              padding: '12px 18px',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'bangles' ? '2.5px solid #123b32' : '2.5px solid transparent',
              color: activeTab === 'bangles' ? '#123b32' : 'rgba(26, 20, 14, 0.6)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9"></circle>
              <circle cx="12" cy="12" r="6"></circle>
            </svg>
            Bangles &amp; Kadas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('necklaces')}
            style={{
              padding: '12px 18px',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'necklaces' ? '2.5px solid #123b32' : '2.5px solid transparent',
              color: activeTab === 'necklaces' ? '#123b32' : 'rgba(26, 20, 14, 0.6)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 4c2 8 6 14 8 14s6-6 8-14"></path>
              <circle cx="12" cy="18" r="2"></circle>
            </svg>
            Necklaces &amp; Chains
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* RINGS TAB */}
          {activeTab === 'rings' && (
            <div>
              <div style={{ background: 'rgba(18, 59, 50, 0.05)', border: '1px solid rgba(18, 59, 50, 0.12)', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#123b32" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <p style={{ margin: 0, fontSize: '12px', color: '#123b32', lineHeight: 1.5 }}>
                  <strong>Standard Indian Ring Sizing:</strong> Indian sizes follow the traditional jeweller scale based on inner diameter in millimeters.
                </p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(201, 161, 90, 0.25)' }}>
                <thead>
                  <tr style={{ background: '#123b32', color: '#ffffff', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <th style={{ padding: '10px 14px' }}>Indian Size</th>
                    <th style={{ padding: '10px 14px' }}>Inner Diameter (mm)</th>
                    <th style={{ padding: '10px 14px' }}>Circumference (mm)</th>
                    <th style={{ padding: '10px 14px' }}>US Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ind: 'Size 8', dia: '15.3 mm', circ: '48.0 mm', us: 'US 4.5' },
                    { ind: 'Size 10', dia: '16.0 mm', circ: '50.3 mm', us: 'US 5.5' },
                    { ind: 'Size 12', dia: '16.5 mm', circ: '51.8 mm', us: 'US 6.0' },
                    { ind: 'Size 14', dia: '17.3 mm', circ: '54.4 mm', us: 'US 7.0' },
                    { ind: 'Size 16', dia: '18.0 mm', circ: '56.5 mm', us: 'US 8.0' },
                    { ind: 'Size 18', dia: '18.5 mm', circ: '58.1 mm', us: 'US 8.5' },
                    { ind: 'Size 20', dia: '19.2 mm', circ: '60.3 mm', us: 'US 9.5' },
                    { ind: 'Size 22', dia: '19.8 mm', circ: '62.2 mm', us: 'US 10.0' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(201, 161, 90, 0.15)', background: i % 2 === 0 ? '#faf7f2' : '#ffffff' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: '#123b32' }}>{row.ind}</td>
                      <td style={{ padding: '10px 14px', color: '#1a140e' }}>{row.dia}</td>
                      <td style={{ padding: '10px 14px', color: '#1a140e' }}>{row.circ}</td>
                      <td style={{ padding: '10px 14px', color: 'rgba(26, 20, 14, 0.6)' }}>{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '18px', padding: '14px', background: '#fdfbf7', border: '1px solid rgba(201, 161, 90, 0.25)', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a140e' }}>
                  How to Measure at Home:
                </h4>
                <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', color: 'rgba(26, 20, 14, 0.75)', lineHeight: 1.6 }}>
                  <li>Wrap a strip of paper or string snugly around the base of your intended finger.</li>
                  <li>Mark the spot where the paper overlaps and measure the length in millimeters (Circumference).</li>
                  <li>Match your measurement with the circumference column in the chart above.</li>
                </ol>
              </div>
            </div>
          )}

          {/* BANGLES TAB */}
          {activeTab === 'bangles' && (
            <div>
              <div style={{ background: 'rgba(18, 59, 50, 0.05)', border: '1px solid rgba(18, 59, 50, 0.12)', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#123b32" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <p style={{ margin: 0, fontSize: '12px', color: '#123b32', lineHeight: 1.5 }}>
                  <strong>Traditional Indian Bangle Sizing:</strong> Calculated by inner diameter in inches and sixteenths (e.g., 2.4 = 2 and 4/16 inches).
                </p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(201, 161, 90, 0.25)' }}>
                <thead>
                  <tr style={{ background: '#123b32', color: '#ffffff', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <th style={{ padding: '10px 14px' }}>Indian Size</th>
                    <th style={{ padding: '10px 14px' }}>Inner Diameter (Inches)</th>
                    <th style={{ padding: '10px 14px' }}>Inner Diameter (mm)</th>
                    <th style={{ padding: '10px 14px' }}>Fit Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sz: '2.2', inch: '2 - 2/16" (2.125")', mm: '54.0 mm', fit: 'Extra Small / Petite' },
                    { sz: '2.4', inch: '2 - 4/16" (2.250")', mm: '57.2 mm', fit: 'Small (Standard)' },
                    { sz: '2.6', inch: '2 - 6/16" (2.375")', mm: '60.3 mm', fit: 'Medium (Most Popular)' },
                    { sz: '2.8', inch: '2 - 8/16" (2.500")', mm: '63.5 mm', fit: 'Large / Broad' },
                    { sz: '2.10', inch: '2 - 10/16" (2.625")', mm: '66.7 mm', fit: 'Extra Large' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(201, 161, 90, 0.15)', background: i % 2 === 0 ? '#faf7f2' : '#ffffff' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: '#123b32' }}>{row.sz}</td>
                      <td style={{ padding: '10px 14px', color: '#1a140e' }}>{row.inch}</td>
                      <td style={{ padding: '10px 14px', color: '#1a140e' }}>{row.mm}</td>
                      <td style={{ padding: '10px 14px', color: 'rgba(26, 20, 14, 0.7)' }}>{row.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '18px', padding: '14px', background: '#fdfbf7', border: '1px solid rgba(201, 161, 90, 0.25)', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a140e' }}>
                  How to Measure Bangle Fit:
                </h4>
                <p style={{ margin: 0, fontSize: '11.5px', color: 'rgba(26, 20, 14, 0.75)', lineHeight: 1.6 }}>
                  Take a bangle that already fits you well, place it on a flat ruler, and measure the straight inside edge from inner wall to inner wall in millimeters.
                </p>
              </div>
            </div>
          )}

          {/* NECKLACES TAB */}
          {activeTab === 'necklaces' && (
            <div>
              <div style={{ background: 'rgba(18, 59, 50, 0.05)', border: '1px solid rgba(18, 59, 50, 0.12)', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#123b32" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <p style={{ margin: 0, fontSize: '12px', color: '#123b32', lineHeight: 1.5 }}>
                  <strong>Necklace &amp; Haram Length Standards:</strong> Choose the ideal placement for layering or bridal adornment.
                </p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(201, 161, 90, 0.25)' }}>
                <thead>
                  <tr style={{ background: '#123b32', color: '#ffffff', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <th style={{ padding: '10px 14px' }}>Length</th>
                    <th style={{ padding: '10px 14px' }}>Style Type</th>
                    <th style={{ padding: '10px 14px' }}>Resting Position on Body</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { len: '14 in (35 cm)', style: 'Collar / Kante', pos: 'Tightly around the base of throat' },
                    { len: '16 in (40 cm)', style: 'Choker', pos: 'Rests comfortably at base of neck / collarbone' },
                    { len: '18 in (45 cm)', style: 'Princess (Standard)', pos: 'Rests gracefully just below collarbone' },
                    { len: '20 in (50 cm)', style: 'Matinee', pos: 'Rests at the upper neckline / cleavage' },
                    { len: '24 in (60 cm)', style: 'Opera / Medium Haram', pos: 'Rests at or below the center of bust' },
                    { len: '30 in+ (75 cm+)', style: 'Imperial Long Haram', pos: 'Regal bridal drape near the navel' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(201, 161, 90, 0.15)', background: i % 2 === 0 ? '#faf7f2' : '#ffffff' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: '#123b32' }}>{row.len}</td>
                      <td style={{ padding: '10px 14px', color: '#1a140e', fontWeight: 500 }}>{row.style}</td>
                      <td style={{ padding: '10px 14px', color: 'rgba(26, 20, 14, 0.7)' }}>{row.pos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Footer Contact */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid rgba(201, 161, 90, 0.22)',
          background: '#faf7f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <span style={{ fontSize: '11px', color: 'rgba(26, 20, 14, 0.6)' }}>
            Need help finding your custom fit?
          </span>
          <a
            href="https://wa.me/917995228713?text=Hi%20Sree%20Jewellery%2C%20I%20need%20assistance%20with%20sizing%20and%20measurements."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#123b32',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Ask Atelier Concierge on WhatsApp (+91 79952 28713)</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
