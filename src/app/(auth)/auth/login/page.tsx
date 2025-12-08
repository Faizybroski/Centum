import React from 'react'
import LoginForm from './_LoginForm/LoginForm.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Login',
  })

export default function page() {
  return <LoginForm />
}
