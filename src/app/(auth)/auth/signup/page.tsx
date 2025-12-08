import React from 'react'
import SignupForm from './_SignupForm/SignupForm.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Sign Up',
  })

export default function page() {
  return <SignupForm />
}
