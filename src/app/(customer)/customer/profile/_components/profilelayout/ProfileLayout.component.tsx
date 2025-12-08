'use client'
import React, { use } from 'react'
import { ClipboardList, User } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import ProfileForm from '../profileForm/ProfileForm.component'
import AssessmentForm from '@/app/(assessment)/customer/health-assessment/_components/FormLayout.component'
import DashboardHeader from '@/_layouts/customer/dashboardHeader/DashboardHeader.component'
import { useProfileQuery } from '@/redux/services/auth.api'
import SectionLoading from '@/components/ui/section-loading'
import { UserDTO } from '@/dto'

export default function ProfileLayout() {
  const { data, isLoading, error } = useProfileQuery()
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <DashboardHeader title="Profile Settings" subtitle="Manage your personal information and health preferences" />

        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            {/* Health Assessment Alert: it is not required, but it is recommended to complete it  */}
            {/* <HealthProfileAlert /> */}

            {/* Tab Navigation */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal" className="md:flex items-center gap-2 flex-wrap">
                  <User className="h-4 w-4 " />
                  <p className="hidden md:inline-flex">Personal Information</p>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <p className="hidden md:inline-flex">Assessment Questions</p>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-4 sm:mt-6">
                {isLoading ? <SectionLoading /> : <ProfileForm userProfile={data as UserDTO} />}
              </TabsContent>
              <TabsContent value="assessment" className="mt-4 sm:mt-6">
                <AssessmentForm forProfile={true} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
