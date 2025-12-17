import React from 'react'

import AuthGraud from '@/components/authGraud/AuthGraud.component'
import CustomerHeader from '../../_layouts/customer/customerHeader/CustomerHeader.component'
import AssessmentGuard from '@/components/assessmentGraud/AssessmentGuard.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Dashboard',
    description: 'CENTUM Health Glance',
    keywords: ['about', 'company', 'mission'],
  })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="customer">
      <AssessmentGuard>

        <CustomerHeader children={children} />

        {/* <SidebarProvider>
          <div className="flex h-screen overflow-hidden">

            <aside className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col shrink-0 h-full overflow-y-auto">
              <CustomerSidebar />
            </aside>

            <div className="flex flex-col flex-1 min-w-0 h-full">
              <header className="">
                <CustomerHeader />
              </header>

              <main className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-4 sm:p-6 lg:p-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider> */}
      </AssessmentGuard>
    </AuthGraud>
  )
}
