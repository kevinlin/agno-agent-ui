import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DeleteSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<void>
  isDeleting: boolean
}

const DeleteSessionModal: FC<DeleteSessionModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  isDeleting
}) => (
  <Dialog onOpenChange={onClose} open={isOpen}>
    <DialogContent className="font-geist">
      <DialogHeader>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogDescription>
          This will permanently delete the session. This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          className="rounded-xl border-border font-geist"
          disabled={isDeleting}
          onClick={onClose}
          variant="outline"
        >
          CANCEL
        </Button>
        <Button
          className="rounded-xl font-geist"
          disabled={isDeleting}
          onClick={onDelete}
          variant="destructive"
        >
          DELETE
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default DeleteSessionModal
