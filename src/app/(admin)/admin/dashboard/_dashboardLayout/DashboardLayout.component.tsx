'use client'
import React from 'react'
import DashboardCards from '../_components/DashboardCards.component'
import DashboardUsersTable from '../_components/DashboardUsersTable.component'
import AdminDashboardSkeleton from '@/components/skeletons/dashboard/AdminDashboardSkeleton.component'
import { useGetDashboardDataQuery } from '@/redux/services/admin/dashboard.api'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'

export default function DashboardLayout() {
  const { data, isFetching, isError } = useGetDashboardDataQuery()

  return (
    <div className="flex flex-col gap-6">
      <RenderComponent isLoading={isFetching} isError={isError} loader={<AdminDashboardSkeleton />}>
        <DashboardCards data={data} />
        <DashboardUsersTable data={data?.users || []} />
      </RenderComponent>
    </div>
  )
}
