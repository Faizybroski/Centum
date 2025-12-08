import AuthGraud from '@/components/authGraud/AuthGraud.component'
import AdminHeader from '../../_layouts/admin/adminHeader/AdminHeader'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AdminSidebar } from '../../_layouts/admin/adminSidebar/AdminSideBar.component'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="admin">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Sidebar */}
          <div>
            <AdminSidebar />
          </div>
          {/* Main Content */}
          <div className="flex flex-col gap-6 px-4 md:px-6 py-4 w-full md:w-[calc(100%-16rem)]">
            {/* Header */}
            <AdminHeader />

            {/* Scrollable Content Area */}
            <section className="bg-white shadow-lg rounded-lg p-4 md:px-6 md:py-4">{children}</section>
          </div>
        </div>
      </SidebarProvider>
    </AuthGraud>
  )
}
