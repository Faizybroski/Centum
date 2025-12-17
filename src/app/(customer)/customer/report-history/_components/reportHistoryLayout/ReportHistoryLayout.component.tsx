'use client'

import moment from 'moment'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BarChart3, Calendar } from 'lucide-react'
import { Eye, Download } from 'lucide-react'

import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'
import HowToCompareReports from '../howToCompareReports/HowToCompareReports.component'
import CompareReportDialog from '../compareReportDialog/CompareReportDialog.component'
import { paths } from '@/navigate/paths'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCompareReportsMutation, useGetReportsQuery } from '@/redux/services/health-report.api'
import { FileTypeStatusBadge } from '@/components/statusBadge/FileTypeStatusBadge.component'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { pollingIntervalTime, truncateString } from '@/utils'
import { useRouterTransition } from '@/hooks/useRouterTransition.hook'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function ReportHistoryLayout() {
  const [selectedReports, setSelectedReports] = useState<number[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [loadingReportId, setLoadingReportId] = useState<number | null>(null)
  const { navigate, isPending } = useRouterTransition()

  const [pollingInterval, setPollingInterval] = useState(0)

  const { data, isFetching, isSuccess } = useGetReportsQuery(undefined, { pollingInterval })
  const [compareReports, { data: comparedReportSummary, isSuccess: isSuccessSummary, isLoading: isLoadingSummary }] = useCompareReportsMutation()

  useEffect(() => {
    if (!data?.reports) return
    const hasPending = data.reports.some((r) => r.status === 'pending')
    setPollingInterval(hasPending ? pollingIntervalTime : 0)
  }, [data?.reports])

  const handleReportSelection = (reportId: number, checked: boolean) => {
    console.log('Report Selected:', reportId, checked)
    if (checked) {
      if (selectedReports.length < 2) {
        setSelectedReports([...selectedReports, reportId])
      }
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  const handleCompareReports = () => {
    if (selectedReports.length === 2) {
      console.log('Selected Reports:', selectedReports)
      compareReports({ report_id_1: selectedReports[0].toString(), report_id_2: selectedReports[1].toString() })
      setShowComparison(true)
    }
  }

  useEffect(() => {
    if (selectedReports.length === 2) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedReports])

  return (
    <div className="w-full p-3 md:py-4 md:px-0">
      <div className="md:py-0">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            {/* <Image src="/assets/icons/report-history.gif" alt="Health Report" width={100} height={100} unoptimized /> */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Report History</h1>
              <p className="text-gray-600">Access and manage all your uploaded health reports.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedReports.length > 0 && (
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto">
                {selectedReports.length === 2 && (
                  <Button onClick={handleCompareReports} disabled={isLoadingSummary} className="flex items-center gap-2 w-full sm:w-auto">
                    <BarChart3 className="h-4 w-4" />
                    Compare Reports
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedReports([])} className="text-sm w-full sm:w-auto">
                  Clear Selection
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {isFetching && (
          <div className="grid lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {isSuccess && data?.reports?.length === 0 && <NoRecordsFound title="No Reports Found" description="You don't have any health reports yet." />}

        {isSuccess && data?.reports?.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <Table className="border rounded-lg">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold text-gray-700">Report Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.reports.map((report: any) => (
                  <TableRow key={report.id} className="odd:bg-gray-50 hover:bg-gray-50 transition">
                    {/* Report Name */}
                    <TableCell className="font-medium">{truncateString(report.report_title, 60) || 'N/A'}</TableCell>

                    {/* Category */}
                    <TableCell className="text-gray-600 capitalize">{report.category || 'N/A'}</TableCell>

                    {/* Date */}
                    <TableCell className="text-gray-600">{moment(report.processed_at).format('MMM DD, YYYY')}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <FileTypeStatusBadge status={report.status} />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-center">
                      <Button size="icon" variant="ghost" onClick={() => navigate(paths.customerReportDetail(report.id))} disabled={isPending}>
                        <Eye className="w-4 h-4 text-black" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Download className="w-4 h-4 text-black" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {isSuccess && !isFetching && data?.reports?.length > 0 && (
          <>
            {/* Health Reports Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-12 md:hidden">
              {data?.reports?.map((report: any) => {
                const isSelected = selectedReports.includes(report.id)
                const canSelect = selectedReports.length < 2 || isSelected

                return (
                  <Card
                    key={report.id}
                    className={`group relative transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 hover:scale-[1.02]${
                      isSelected ? 'ring-1 ring-primary' : 'hover:ring-1 hover:ring-blue-100'
                    }`}
                  >
                    {report?.status === 'ready' && (
                      <div className="absolute top-4 right-4 z-10">
                        {!canSelect ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Checkbox checked={isSelected} onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)} disabled className="cursor-not-allowed h-5 w-5 opacity-50" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="font-bold">
                              You can only compare two reports at a time
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Checkbox checked={isSelected} onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)} className="cursor-pointer h-5 w-5" />
                        )}
                      </div>
                    )}

                    <CardHeader className="pb-4 pt-4">
                      <div className="flex items-start gap-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                          <Image src="/assets/icons/file.gif" alt="Health Report" width={100} height={100} unoptimized />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="capitalize text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{truncateString(report?.report_title, 70) || 'N/A'}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {moment(report.processed_at).format('DD MMM YYYY')}
                            </div>
                            <FileTypeStatusBadge status={report?.status} />
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Health Score */}
                        <div className="flex justify-between items-center min-h-10">
                          <span className="text-sm font-medium text-gray-600">Health Score</span>
                          <span className="text-2xl font-bold text-primary">{report.health_score}</span>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4 border-t">
                          <Button
                            variant="outline"
                            className=" w-full transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setLoadingReportId(report.id)
                              console.log('Main grid report clicked:', report.id)
                              navigate(`${paths.customerReportDetail(report.id)}`)
                            }}
                            disabled={isPending}
                          >
                            {isPending && loadingReportId === report.id ? 'Loading...' : 'View Details'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* How to Compare Reports Section */}
            {/* <HowToCompareReports /> */}
          </>
        )}
      </div>
      <CompareReportDialog
        selectedReports={selectedReports}
        reports={data?.reports}
        showComparison={showComparison}
        setShowComparison={setShowComparison}
        summary={comparedReportSummary?.summary || ''}
        loading={isLoadingSummary}
      />
    </div>
  )
}
