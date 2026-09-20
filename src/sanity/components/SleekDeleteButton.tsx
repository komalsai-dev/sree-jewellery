import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useClient, useFormValue } from 'sanity';
import { usePaneRouter } from 'sanity/structure';

export function SleekDeleteButton() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const docId = useFormValue(['_id']) as string | undefined;
  const nameValue = useFormValue(['name']) as string | undefined;
  const titleValue = useFormValue(['title']) as string | undefined;
  const paneRouter = usePaneRouter();

  const productName = nameValue || titleValue || 'this document';

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    if (!docId) return;
    setIsDeleting(true);

    try {
      const baseId = docId.replace('drafts.', '');
      
      // Delete both published and draft versions from Sanity
      await Promise.allSettled([
        client.delete(baseId),
        client.delete(`drafts.${baseId}`),
      ]);

      setShowConfirm(false);
      setIsDeleting(false);

      // Smoothly close the document pane without reloading the entire page
      if (paneRouter && typeof paneRouter.closeCurrentAndAfter === 'function') {
        paneRouter.closeCurrentAndAfter();
      } else if (paneRouter && typeof paneRouter.closeCurrent === 'function') {
        paneRouter.closeCurrent();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete item. Please try again.');
      setIsDeleting(false);
    }
  };

  if (!docId) return null;

  const modalContent = showConfirm && mounted ? (
    createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isDeleting) {
            setShowConfirm(false);
          }
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px 28px',
            maxWidth: '420px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            border: '1px solid #e2e8f0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#991b1b' }}>
              Delete Document?
            </h3>
          </div>

          <p style={{ margin: '0 0 22px 0', fontSize: '13.5px', color: '#475569', lineHeight: '1.55' }}>
            Are you sure you want to permanently delete <strong>"{productName}"</strong>? This will remove it from Sanity Studio and your website. This action cannot be undone.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.7 : 1,
                boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)',
              }}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <div style={{ paddingTop: '16px', marginTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-start' }}>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        style={{
          backgroundColor: '#dc2626',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          boxShadow: '0 2px 6px rgba(220, 38, 38, 0.22)',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#b91c1c';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#dc2626';
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        <span>Delete Product</span>
      </button>

      {modalContent}
    </div>
  );
}
