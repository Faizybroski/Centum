import React from 'react'

import AuthGraud from '@/components/authGraud/AuthGraud.component'
import CustomerHeader from '../../_layouts/customer/customerHeader/CustomerHeader.component'
import AssessmentGuard from '@/components/assessmentGraud/AssessmentGuard.component'
import { generateMeta } from '@/lib/seo'
import { Container } from '@/components/ui/container'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Dashboard',
    description: 'CENTUM Health Glance',
    keywords: ['about', 'company', 'mission'],
  })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="customer">
      <AssessmentGuard>
        <CustomerHeader />
        <Container>{children}</Container>
      </AssessmentGuard>
    </AuthGraud>
  )
}
