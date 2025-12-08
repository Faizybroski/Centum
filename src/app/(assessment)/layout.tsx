import React from 'react'

import AuthGraud from '@/components/authGraud/AuthGraud.component'
import AssessmentGuard from '@/components/assessmentGraud/AssessmentGuard.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Health Assessment',
  })
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="customer">
      <AssessmentGuard>{children}</AssessmentGuard>
    </AuthGraud>
  )
}
