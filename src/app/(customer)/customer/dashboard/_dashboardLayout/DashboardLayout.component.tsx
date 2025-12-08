'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReduxSelector } from '@/hooks'

import VO2Maxcard from '../_components/v02Maxcard/VO2Maxcard.component'
import ActionPlan from '../_components/actionPlan/ActionPlan.component'
import Biomarkers from '../_components/biomarkers/Biomarkers.component'
import BiologicalAgecard from '../_components/biologicalAgecard/BiologicalAgecard.component'
import ClinicalSummaryCard from '../_components/clinicalSummaryCard/ClinicalSummaryCard.component'
import DashboardHeader from '@/_layouts/customer/dashboardHeader/DashboardHeader.component'
import { useGetDashboardDataQuery } from '@/redux/services/dashboard.api'
import { useExportHealthReport } from '@/hooks'

export default function DashboardLayout() {
  const { userProfile } = useReduxSelector((state) => state.user)
  const { data: dashboardData, isSuccess } = useGetDashboardDataQuery()

  const { exportReportToPDF, loading } = useExportHealthReport()

  return (
    <div className="p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <DashboardHeader title={`Welcome back, ${userProfile?.full_name || 'Patient'}`} subtitle="Your health insights dashboard" />
        {isSuccess && dashboardData && (
          <div className="flex justify-end">
            <button className="text-primary px-4 py-2 rounded cursor-pointer" disabled={loading} onClick={() => exportReportToPDF(dashboardData)}>
              {loading ? 'Downloading...' : ' Health Report Download'}
            </button>
          </div>
        )}

        <motion.div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8`} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: 'keyframes', stiffness: 50 }}>
          {/* Biomarkers Card */}
          <Biomarkers data={dashboardData || undefined} />

          <div className="lg:col-span-4">
            <div className="space-y-4 sm:space-y-6">
              {/* Biological Age Card */}
              <BiologicalAgecard biologicalAge={Number(dashboardData?.biological_age) || 0} chronologicalAge={Number(dashboardData?.chronological_age) || 0} />

              {/* VO2 Max Card */}
              <VO2Maxcard vo2Max={dashboardData?.vo2_max || '0'} chronologicalAge={Number(dashboardData?.chronological_age) || 0} />
            </div>
          </div>

          {/* Action Plan Card */}
          <ActionPlan data={dashboardData || undefined} />
        </motion.div>

        {/* Clinical Summary Card */}
        <ClinicalSummaryCard summary={dashboardData?.summary || ''} critical_concerns={dashboardData?.critical_concerns || []} section_summary={dashboardData?.section_summary || {}} />
      </div>
    </div>
  )
}
