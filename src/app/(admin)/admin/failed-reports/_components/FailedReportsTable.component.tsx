'use client'

import * as React from 'react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { CircleX } from 'lucide-react'
import { useUsersWithFailedReportsQuery, useRetryBulkReportGenerationMutation } from '@/redux/services/admin/reports.api'
import { FailedReportDTO } from '@/dto'

import useFailedReportsTableColumns from './useFailedReportsTableColumns.hook'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { pageSize } from '@/utils'
import { Button } from '@/components/ui/button'
import { sendEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { toast } from 'sonner'

// 4. Main Table Component
function UsersTable() {
  const [retryBulkReportGeneration, { isLoading }] = useRetryBulkReportGenerationMutation()
  const [page, setPage] = React.useState(1)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  const handleRetry = async () => {
    const res = await retryBulkReportGeneration({
      report_ids: selectedIds,
    }).unwrap()

    toast.success(`Retry started for ${res.success_count} reports`)

    const failedReports = res.results.filter((r) => r.status !== 'queued')

    failedReports.forEach((r) => {
      toast.error(`${r.report_title}: ${r.message}`, {
        id: r.report_id,
      })
    })
  }

  const { data, isFetching, isError } = useUsersWithFailedReportsQuery({
    page,
    limit: pageSize,
    subscription_type: 'all',
  })

  const { columns } = useFailedReportsTableColumns()

  return (
    // <div className="flex flex-col gap-4">
    //   <div className="flex items-center gap-3">
    //     <CircleX className="w-6 h-6 text-red-700" />
    //     <h2 className="text-xl font-medium text-gray-700">Failed Reports of Users</h2>
    //   </div>
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CircleX className="w-6 h-6 text-red-700" />
          <h2 className="text-xl font-medium text-gray-700">Failed Reports of Users</h2>
        </div>

        {selectedIds.length > 0 && (
          <Button
            onClick={async () => {
              // const res = await retryBulkReportGeneration({ report_ids: selectedIds }).unwrap()
              handleRetry()

              // res.results.forEach((r) => {
              //   if (r.status === 'queued') {
              //     toast.success(`${r.report_title} retry started`)
              //   } else {
              //     toast.error(`${r.report_title}: ${r.message}`)
              //   }
              // })

              sendEvent(ANALYTICS_EVENTS.ADMIN_OCR_ERROR, { action: 'retry_bulk', report_count: selectedIds.length, report_ids: selectedIds.join(',') })
            }}
          >
            Retry Selected ({selectedIds.length})
          </Button>
        )}
      </div>

      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={data?.list || []} page={page} setPage={setPage} totalPages={data?.total_pages || 1} isPaginationEnabled onSelectionChange={setSelectedIds} />
      </RenderComponent>
    </div>
  )
}

export default UsersTable
