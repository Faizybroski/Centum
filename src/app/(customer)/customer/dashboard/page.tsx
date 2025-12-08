import { Suspense } from 'react'
import DashboardLayout from './_dashboardLayout/DashboardLayout.component'
import DashboardSkeleton from '@/components/skeletons/dashboard/DashboardSkeleton.component'

export default async function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLayout />
    </Suspense>
  )
}
