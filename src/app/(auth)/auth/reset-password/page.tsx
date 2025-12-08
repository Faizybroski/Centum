import React from 'react'
import ResetPasswordForm from './_resetPasswordForm/ResetPasswordForm.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Reset Password',
  })

export default function page() {
  return <ResetPasswordForm />
}
