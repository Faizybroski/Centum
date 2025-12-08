'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { BarChart3 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import moment from 'moment'

import { SkeletonComparison } from '@/components/skeletons/reportCompare/ReportCompareSkeleton'
import { renderMarkdown } from '@/utils/renderMarkdown'

export default function CompareReportDialog({
  selectedReports,
  reports,
  showComparison,
  setShowComparison,
  summary,
  loading,
}: {
  selectedReports: any
  reports: any
  showComparison: any
  setShowComparison: any
  summary: string
  loading: boolean
}) {
  const [report1, setReport1] = useState<any>(null)
  const [report2, setReport2] = useState<any>(null)

  useEffect(() => {
    if (selectedReports?.length === 2 && reports?.length) {
      const found1 = reports.find((r: any) => r.id === selectedReports[0])
      const found2 = reports.find((r: any) => r.id === selectedReports[1])
      setReport1(found1)
      setReport2(found2)
    } else {
      setReport1(null)
      setReport2(null)
    }
  }, [selectedReports, reports])

  return (
    <Dialog open={showComparison} onOpenChange={setShowComparison}>
      <DialogContent className="w-full max-w-4xl max-h-[80vh] overflow-y-auto px-3 sm:px-6 ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <BarChart3 className="h-5 w-5 shrink-0" />
            Report Comparison
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <SkeletonComparison />
        ) : (
          <div className="space-y-6">
            {/* Comparison Overview */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <CardTitle className="text-sm font-medium break-words capitalize">{report1?.report_title}</CardTitle>
                    <Badge className="px-2 py-1 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium break-words" variant={report1?.status === 'ready' ? 'default' : 'secondary'}>
                      {report1?.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">{moment(report1?.reportDate).format('DD MMM YYYY')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-600">Health Score</span>
                      <span className="font-semibold text-base sm:text-lg">{report1?.health_score || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <CardTitle className="text-sm font-medium break-words capitalize">{report2?.report_title}</CardTitle>
                    <Badge className="px-2 py-1 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium break-words" variant={report2?.status === 'ready' ? 'default' : 'secondary'}>
                      {report2?.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">{moment(report2?.reportDate).format('DD MMM YYYY')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-600">Health Score</span>
                      <span className="font-semibold text-base sm:text-lg capitalize">{report2?.health_score || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compared Summary */}
            <div className="grid grid-cols-1">
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="text-sm sm:text-base">Compared Report Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-2">{summary ? renderMarkdown(summary) : <div>No summary available.</div>}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
