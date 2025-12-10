import React from 'react'

import AuthGraud from '@/components/authGraud/AuthGraud.component'
import CustomerHeader from '../../_layouts/customer/customerHeader/CustomerHeader.component'
import AssessmentGuard from '@/components/assessmentGraud/AssessmentGuard.component'
import CustomerSidebar from '@/components/customer-sideBar/SideBar.component'
import { generateMeta } from '@/lib/seo'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Container } from '@/components/ui/container'

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
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar (fixed left, full height) */}
            <aside className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col shrink-0 h-full overflow-y-auto">
              <CustomerSidebar />
            </aside>

            {/* Right side: header + scrollable content */}
            <div className="flex flex-col flex-1 h-full">
              {/* Header appears only in content area, NOT behind sidebar */}
              <header className="sticky top-0 z-50 bg-black">
                <CustomerHeader />
              </header>

              {/* Scrollable main area */}
              <main className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-4 sm:p-6 lg:p-8">
                  <Container>{children}</Container>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </AssessmentGuard>
    </AuthGraud>
  )
}
