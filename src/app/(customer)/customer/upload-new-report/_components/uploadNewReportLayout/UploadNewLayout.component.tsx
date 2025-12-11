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
import { motion } from 'framer-motion'

export default function UploadNewReportLayout() {
  const router = useRouter()
  const { userProfile } = useReduxSelector((state) => state.user)
  const isMedicareValid = !!(userProfile?.individual_reference_number && userProfile?.madicare_card_number && userProfile?.madicare_expiry_date)

  return (
    <div className="w-full p-3 md:py-8 md:px-0">
      <div className="w-full">
        {/* <DashboardHeader title="Upload New Reports" subtitle="Upload your medical reports to get AI-powered health insights and personalized recommendations." /> */}

        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Upload New Report</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Submit your latest health report for analysis</p>
        </motion.div>

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
        {/* <FeatureSection /> */}
      </div>
    </div>
  )
}
