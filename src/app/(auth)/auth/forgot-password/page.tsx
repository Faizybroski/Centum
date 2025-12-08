import React from 'react'
import ForgotPasswordForm from './_forgotPasswordForm/ForgotPasswordForm.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Forgot Password',
  })

export default function page() {
  return <ForgotPasswordForm />
}
