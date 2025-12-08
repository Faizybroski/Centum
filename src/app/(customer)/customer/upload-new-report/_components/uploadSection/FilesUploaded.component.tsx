'use client'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BarChart3, CheckCircle2, CircleX } from 'lucide-react'

import UploadFileCard from './UploadFileCard.component'
import { paths } from '@/navigate/paths'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useGenerateReportMutation } from '@/redux/services/health-report.api'
import { useRouterTransition } from '@/hooks/useRouterTransition.hook'

export default function FilesUploadedSection({
  uploadedFiles,
  reportTitle,
  setUploadedFiles,
  uploadingFile,
}: {
  uploadedFiles: File[]
  reportTitle: string
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
  uploadingFile: boolean
}) {
  const [generateReport, { isLoading }] = useGenerateReportMutation()
  const { isPending, navigate } = useRouterTransition()

  const getFileStats = () => {
    const failed = uploadedFiles?.filter((item: any) => item?.status === 'failed')
    const ready = uploadedFiles?.filter((item: any) => item?.status === 'ready')

    return {
      failed,
      ready,
      failedCount: failed?.length,
      readyCount: ready?.length,
      hasFailed: failed?.length > 0,
      hasReady: ready?.length > 0,
    }
  }

  const fileStats = getFileStats()

  const handleRemove = (item: any) => {
    const updatedFiles = [...uploadedFiles]
    updatedFiles.splice(updatedFiles.indexOf(item), 1)
    setUploadedFiles(updatedFiles)
  }

  const handleGenerateReport = async () => {
    if (reportTitle.trim() === '') {
      toast.error('Please Enter a Report Title')
      return
    } else if (reportTitle.trim().length < 1) {
      toast.error('Report Title must be at least 1 character long')
      return
    } else if (reportTitle.trim().length > 50) {
      toast.error('Report Title must be at most 50 characters long')
      return
    } else if (fileStats?.hasFailed) {
      toast.error('Please remove failed files')
      return
    }

    let fileIds: string[] = []
    uploadedFiles?.forEach((item: any) => {
      fileIds.push(item.id)
    })

    try {
      const response = await generateReport({ report_title: reportTitle?.trim(), fileIds }).unwrap()
      if (response?.report_id) {
        navigate(paths.customerReportSummary(response.report_id))
      }
    } catch (error) {
      console.error('Error generating report:', error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 space-y-6">
              {fileStats?.hasFailed && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                      <CircleX className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                      Failed Files ({fileStats?.failedCount})
                    </CardTitle>
                    <p className="text-gray-600 text-sm sm:text-base">Your uploaded medical reports failed for analysis.</p>
                  </div>

                  {fileStats.failed.map((item: any, index: number) => (
                    <UploadFileCard key={index} file_name={item.file_name} size={item.size} status={item.status} onRemove={() => handleRemove(item)} />
                  ))}
                </div>
              )}

              {fileStats?.hasReady && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                      Uploaded Files ({fileStats?.readyCount})
                    </CardTitle>
                    <p className="text-gray-600 text-sm sm:text-base">Your uploaded medical reports are ready for analysis</p>
                  </div>

                  {fileStats?.ready?.map((item: any, index: number) => (
                    <UploadFileCard key={index} file_name={item.file_name} size={item.size} status={item.status} onRemove={() => handleRemove(item)} />
                  ))}
                </div>
              )}
            </div>

            {/* Generate Report Button */}
            {fileStats?.hasReady && (
              <div className="flex justify-center">
                <Button onClick={handleGenerateReport} disabled={isPending || isLoading || uploadingFile}>
                  <div className="flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span className="text-sm sm:text-base">{isLoading || isPending ? 'Generating...' : `Generate Report`}</span>
                  </div>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
