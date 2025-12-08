import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { SuccessDialogProps } from './SuccessDialog.type'

export default function SuccessDialog({ showSuccessDialog, setShowSuccessDialog, title, message, buttonText, onClick }: SuccessDialogProps) {
  const handleButtonClick = () => {
    setShowSuccessDialog(false)
    onClick()
  }

  return (
    <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary/60" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleButtonClick} className="bg-primary/60 hover:bg-primary/70">
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
