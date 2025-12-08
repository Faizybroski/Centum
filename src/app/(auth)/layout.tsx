import React from 'react'
import AuthGraud from '@/components/authGraud/AuthGraud.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Auth',
  })

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="auth">
      <main>{children}</main>
    </AuthGraud>
  )
}
