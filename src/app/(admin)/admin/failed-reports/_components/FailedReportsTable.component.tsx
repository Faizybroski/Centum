'use client'

import * as React from 'react'

import { DataTable } from '@/components/dataTable/DataTable.component'
import { CircleX } from 'lucide-react'
import { useUsersWithFailedReportsQuery } from '@/redux/services/admin/reports.api'

import useFailedReportsTableColumns from './useFailedReportsTableColumns.hook'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { pageSize } from '@/utils'

// 4. Main Table Component
function UsersTable() {
  const [page, setPage] = React.useState(1)

  const { data, isFetching, isError } = useUsersWithFailedReportsQuery({
    page,
    limit: pageSize,
  })

  const { columns } = useFailedReportsTableColumns()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <CircleX className="w-6 h-6 text-red-700" />
        <h2 className="text-xl font-medium text-gray-700">Failed Reports of Users</h2>
      </div>

      <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={data?.list || []} page={page} setPage={setPage} totalPages={data?.total_pages || 1} isPaginationEnabled />
      </RenderComponent>
    </div>
  )
}

export default UsersTable
