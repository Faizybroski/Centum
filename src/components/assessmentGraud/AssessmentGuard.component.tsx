'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useReduxSelector } from '@/hooks'
import { paths } from '@/navigate/paths'
import SectionLoading from '../ui/section-loading'

export default function AssessmentGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const user = useReduxSelector((state) => state.user.userProfile)

  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!user) return

    if (!user.is_health_assessment_complete && pathname !== paths.customerHealthAssessment()) {
      router.replace(paths.customerHealthAssessment())
      return
    }

    if (user.is_health_assessment_complete && pathname === paths.customerHealthAssessment()) {
      router.replace(paths.customerDashboard())
      return
    }

    setShouldRender(true)
  }, [user, pathname, router])

  if (!user || !shouldRender) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SectionLoading />
      </div>
    )
  }

  return <>{children}</>
}
