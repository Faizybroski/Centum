// components/DocumentsDialog.tsx
import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import UploadedDocuments from '@/components/reportSummary/UploadedDocuments/UploadedDocuments.component'

type UploadedDocument = {
  file_name: string
  file_path: string
}

interface DocumentsDialogProps {
  title: string
  documents?: UploadedDocument[]
}

export default function DocumentDialog({ title, documents }: DocumentsDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:underline text-primary px-2 py-1 rounded-md text-sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          <UploadedDocuments documents={documents} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
