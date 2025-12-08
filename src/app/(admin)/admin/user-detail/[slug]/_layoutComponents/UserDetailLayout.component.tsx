'use client'

import React from 'react'
import { useUserDetailQuery } from '@/redux/services/admin/users.api'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import Details from '../_components/details/Details.component'
import ReportsTable from '../_components/reportsTable/ReportsTable.component'

export default function UserDetailLayout({ slug }: { slug: string }) {
  const [page, setPage] = React.useState(1)
  const limit = 5

  const { data, isFetching, isError } = useUserDetailQuery({
    id: slug,
    page,
    limit,
  })

  return (
    <div>
      <RenderComponent isLoading={isFetching} isError={isError}>
        <div className="flex flex-col gap-6">
          <Details data={data?.user || {}} />

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-gray-700">Reports</h2>
            <ReportsTable data={data?.list || []} page={page} setPage={setPage} totalPages={data?.total_pages || 1} />
          </div>
        </div>
      </RenderComponent>
    </div>
  )
}
