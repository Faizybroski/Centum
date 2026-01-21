'use client'

import * as React from 'react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { Clock } from 'lucide-react'
import { useAdminWaitlistsQuery } from '@/redux/services/admin/waitlists.api'
import useWaitlistsColumns from './useWaitlistsColumns.hook'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { pageSize } from '@/utils'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'

// 4. Main Table Component
function WaitlistsTable() {
  const [page, setPage] = React.useState(1)

  const { data, isFetching, isError } = useAdminWaitlistsQuery({
    page,
    limit: pageSize,
  })
  const { columns } = useWaitlistsColumns()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Waitlists {data?.total_count}</h2>
      </div>
      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={data?.list || []} page={page} setPage={setPage} totalPages={data?.total_pages || 1} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default WaitlistsTable
