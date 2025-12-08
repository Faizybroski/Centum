export type SuccessDialogProps = {
  showSuccessDialog: boolean
  setShowSuccessDialog: (value: boolean) => void
  message: string
  title: string
  buttonText: string
  onClick: () => void
}
