import { useState } from 'react';
import { DocumentActionProps, useDocumentOperation, useClient } from 'sanity';
import { Trash2 } from 'lucide-react';

export function CustomDeleteAction(props: DocumentActionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { delete: deleteOp } = useDocumentOperation(props.id, props.type);
  const client = useClient({ apiVersion: '2024-01-01' });

  const docTitle =
    (props.draft as any)?.name ||
    (props.published as any)?.name ||
    (props.draft as any)?.title ||
    (props.published as any)?.title ||
    'this document';

  return {
    label: isDeleting ? 'Deleting...' : 'Delete',
    title: 'Permanently delete this document',
    icon: Trash2,
    tone: 'critical' as const,
    disabled: isDeleting,
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen
      ? {
          type: 'confirm' as const,
          tone: 'critical' as const,
          message: `Are you sure you want to permanently delete "${docTitle}"? This action cannot be undone.`,
          onConfirm: async () => {
            setIsDeleting(true);
            try {
              const baseId = props.id.replace('drafts.', '');
              await Promise.allSettled([
                client.delete(baseId),
                client.delete(`drafts.${baseId}`),
              ]);
              if (typeof deleteOp.execute === 'function') {
                deleteOp.execute();
              }
            } catch (err) {
              console.error('Delete action error:', err);
              if (typeof deleteOp.execute === 'function') {
                deleteOp.execute();
              }
            } finally {
              setIsDeleting(false);
              setDialogOpen(false);
              props.onComplete();
            }
          },
          onCancel: () => {
            setDialogOpen(false);
            props.onComplete();
          },
        }
      : null,
  };
}
