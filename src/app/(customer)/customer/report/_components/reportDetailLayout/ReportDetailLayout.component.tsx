'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Activity, Apple, ArrowLeft, Heart, Moon, Pill } from 'lucide-react'

import ReportHeader from '../reportHeader/ReportHeader.component'
import ReportProcessing from '@/components/reportProcessing/ReportProcessing.component'
import ClinicalSummary from '@/components/reportSummary/clinicalSummary/ClinicalSummary.component'
import ReportDetailSkeleton from '@/components/skeletons/reportDetail/ReportDetailSkeleton.component'
import UploadedDocuments from '@/components/reportSummary/UploadedDocuments/UploadedDocuments.component'
import DashboardHeader from '@/_layouts/customer/dashboardHeader/DashboardHeader.component'
import RecommendationSection from '@/components/reportSummary/recommendationSection/RecommendationSection.component'
import { pollingIntervalTime } from '@/utils'
import { Button } from '@/components/ui/button'
import { useGetReportByIdQuery } from '@/redux/services/health-report.api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function ReportDetailLayout({ slug, type = 'detail' }: { slug: string; type?: 'detail' | 'summary' }) {
  let pollingStatus = ['ready', 'error', 'failed']
  const router = useRouter()
  const [pollingActive, setPollingActive] = React.useState(true)

  const { data, isLoading, isFetching, isSuccess } = useGetReportByIdQuery({ report_id: slug }, { pollingInterval: pollingActive ? pollingIntervalTime : 0, skip: !slug })

  useEffect(() => {
    if (pollingStatus.includes(data?.status || '')) {
      setPollingActive(false)
    }
  }, [data, isLoading])

  return (
    <div className="p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        {/* Report Header with Animation */}
        {isSuccess && type == 'detail' && <ReportHeader report_title={data?.report_title} report_date={data?.processed_at} report_status={data?.status} />}
        {isSuccess && type == 'summary' && <DashboardHeader title="Health Recommendations" subtitle="Personalized diet and exercise guidance based on your health profile" />}
        {(data?.status == 'processing' || data?.status == 'pending' || isLoading || isFetching) && (
          <>
            {isSuccess && type == 'summary' && <ReportProcessing />}
            <ReportDetailSkeleton />
          </>
        )}

        {isSuccess && ['failed', 'error'].includes(data?.status) && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-100 rounded-lg p-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-4 rounded-full h-22 w-22">
                <Image src="/assets/icons/cancel.png" alt="Report Failed" width={500} height={500} />
              </div>
              <h1 className="font-bold text-red-500">Report Processing Failed</h1>
              <p className="text-red-500 max-w-md">We couldn&apos;t process your report due to file issues.</p>
            </div>
          </div>
        )}

        {/* Report Content with Tabs */}
        {isSuccess && data?.status === 'ready' && (
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
            {/* Left Column - Tabbed Content */}
            <div className="space-y-6">
              <Tabs defaultValue="clinical" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="clinical" className="group flex items-center gap-2 ">
                    <Activity className="h-4 w-4" />
                    <span className="hidden group-data-[state=active]:inline sm:inline">Clinical Summary</span>
                  </TabsTrigger>
                  <TabsTrigger value="action" className="group flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className="hidden group-data-[state=active]:inline sm:inline">Action Plans</span>
                  </TabsTrigger>
                </TabsList>

                {/* Clinical Summary Tab */}
                <TabsContent value="clinical" className="space-y-6 mt-6">
                  {isSuccess && <ClinicalSummary reportData={data} />}
                </TabsContent>

                {/* Action Plans Tab */}
                <TabsContent value="action" className="space-y-6 mt-6">
                  {isSuccess && (
                    <>
                      <RecommendationSection reportData={data} sectionKey="diet" title="Diet Recommendations" Icon={Apple} color="green" />
                      <RecommendationSection reportData={data} sectionKey="exercise" title="Exercise Recommendations" Icon={Activity} color="blue" />
                      <RecommendationSection reportData={data} sectionKey="sleep" title="Sleep Recommendations" Icon={Moon} color="purple" />
                      <RecommendationSection reportData={data} sectionKey="supplement" title="Supplement Recommendations" Icon={Pill} color="orange" />
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Uploaded Documents */}
            <UploadedDocuments documents={data?.uploaded_documents || []} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportDetailLayout
