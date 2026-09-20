'use client';

import React, { useEffect, useRef } from 'react';
import { useModals } from '@/context/ModalContext';
import { careContent } from '@/data/products';

export default function CareInfoModal() {
  const { careInfoKey, closeCareInfo } = useModals();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (careInfoKey) {
      dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      dialog.close();
      document.body.classList.remove('modal-open');
    }
  }, [careInfoKey]);

  if (!careInfoKey) return (
    <dialog id="info-dialog" aria-labelledby="info-title" ref={dialogRef}></dialog>
  );

  const content = careContent[careInfoKey] || {
    title: "Customer Care",
    paragraphs: ["Details are being updated."]
  };

  return (
    <dialog
      ref={dialogRef}
      id="info-dialog"
      aria-labelledby="info-title"
      onClose={closeCareInfo}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeCareInfo();
      }}
    >
      <div className="dialog-header">
        <h2 id="info-title">{content.title}</h2>
        <button 
          type="button" 
          className="icon-button" 
          data-close-dialog 
          aria-label="Close information"
          onClick={closeCareInfo}
        >
          <svg className="icon"><use href="#icon-close"></use></svg>
        </button>
      </div>

      <div id="info-body">
        {content.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {careInfoKey === 'contact' && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a
              href="https://wa.me/917995228713?text=Hi%20Sree%20Jewellery%2C%20I%20would%20like%20to%20connect%20with%20your%20atelier%20concierge."
              target="_blank"
              rel="noopener noreferrer"
              className="drawer__whatsapp-btn"
              style={{ display: 'inline-flex', padding: '12px 24px', width: 'auto', textDecoration: 'none' }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
              </svg>
              Chat on WhatsApp (+91 79952 28713)
            </a>
          </div>
        )}
      </div>
    </dialog>
  );
}
