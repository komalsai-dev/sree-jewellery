import React, { useState } from 'react';
import { useClient, useFormValue } from 'sanity';

export function DeleteProductButton() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const docId = useFormValue(['_id']) as string | undefined;
  const productName = (useFormValue(['name']) as string) || 'this product';

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    if (!docId) return;
    setIsDeleting(true);
    setError(null);

    try {
      const baseId = docId.replace('drafts.', '');
      
      // Delete both published document and draft if present
      await Promise.allSettled([
        client.delete(baseId),
        client.delete(`drafts.${baseId}`),
      ]);

      setDeleted(true);
      setShowConfirm(false);

      // Redirect back to studio root or list after brief delay
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/studio/structure';
        }
      }, 1000);
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(err?.message || 'Failed to delete product. Please check permissions.');
      setIsDeleting(false);
    }
  };

  if (!docId) {
    return null;
  }

  if (deleted) {
    return (
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#ecfdf5',
          border: '1px solid #10b981',
          color: '#065f46',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        ✅ Product successfully deleted! Redirecting to studio...
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: '12px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff1f2',
        border: '1px solid #fecdd3',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#be123c', marginBottom: '3px' }}>
            🗑️ Mobile & Desktop Quick Delete
          </div>
          <div style={{ fontSize: '12px', color: '#881337' }}>
            Permanently remove <strong>{productName}</strong> from the database.
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          style={{
            backgroundColor: '#e11d48',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(225, 29, 72, 0.25)',
          }}
        >
          🗑️ Delete Product
        </button>
      </div>

      {error && (
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#b91c1c' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#be123c', fontWeight: 700 }}>
              Permanently Delete Product?
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
              Are you sure you want to permanently delete <strong>"{productName}"</strong>? This will remove it from your live website and Sanity Studio. This action cannot be undone.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                style={{
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '13px',
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
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#be123c',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  opacity: isDeleting ? 0.7 : 1,
                }}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
