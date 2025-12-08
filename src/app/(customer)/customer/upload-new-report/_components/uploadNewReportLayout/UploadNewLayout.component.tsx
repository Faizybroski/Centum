'use client'

import DashboardHeader from '@/_layouts/customer/dashboardHeader/DashboardHeader.component'
import React from 'react'
import FeatureSection from '../featureSection/FeatureSection.component'
import UploadFilesSection from '../uploadSection/UploadFiles.component'
import { useRouter } from 'next/navigation'
import { paths } from '@/navigate/paths'
import { useReduxSelector } from '@/hooks'
import HealthProfileAlert from '@/app/(customer)/customer/profile/_components/healthProfileAlert/HealthProfileAlert.component'
import { Info } from 'lucide-react'

export default function UploadNewReportLayout() {
  const router = useRouter()
  const { userProfile } = useReduxSelector((state) => state.user)
  const isMedicareValid = !!(userProfile?.individual_reference_number && userProfile?.madicare_card_number && userProfile?.madicare_expiry_date)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader title="Upload Medical Reports" subtitle="Upload your medical reports to get AI-powered health insights and personalized recommendations." />

        {!isMedicareValid ? (
          <div className="m-6">
            <HealthProfileAlert
              icon={<Info className="h-4 w-4" />}
              title="Medicare details required"
              description={<p>Please complete your Medicare details in your profile before uploading reports.</p>}
              actionLabel="Go to Profile"
              onAction={() => router.push(paths.customerProfile())}
            />
          </div>
        ) : (
          <>
            <UploadFilesSection />
          </>
        )}
        <FeatureSection />
      </div>
    </div>
  )
}
