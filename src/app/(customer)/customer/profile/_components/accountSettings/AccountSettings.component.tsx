import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bell, Lock, Trash2 } from 'lucide-react'

export default function AccountSettings() {

  return (
    <Card className="mb-6 sm:mb-8 py-[33px] pl-[33px] pr-[26px]">
      <div className="flex flex-col  gap-1">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Account Settings</h3>
        <p className="text-sm sm:text-base text-[#0B342D]">Manage your account security and preferences</p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-4">
        <Card className="flex items-center gap-4 py-[17px] pr-[38px] pl-[17px]">
          <div className="size-10 rounded-full bg-[#0B342D1A] flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#0B342D]" />
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-[#0B342D] text-base">Change Password</h3>
            <p className="text-[#0B342D] text-sm">Update your account password</p>
          </div>
          <Button variant="outline" className="bg-gray-50 border-gray-150 text-gray-900">
            Update
          </Button>
        </Card>
        <Card className="flex items-center gap-4 py-[17px] pr-[38px] pl-[17px]">
          <div className="size-10 rounded-full bg-[#0B342D1A] flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#0B342D]" />
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-[#0B342D] text-base">Notification Settings</h3>
            <p className="text-[#0B342D] text-sm">Manage email and push notifications</p>
          </div>
          <Button variant="outline" className="bg-gray-50 border-gray-150 text-gray-900">
            Manage
          </Button>
        </Card>

        <Card className="flex items-center gap-4 py-[17px] pr-[38px] pl-[17px] border-red-300">
          <div className="size-10 rounded-full bg-red-200 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-[#0B342D] text-base">Delete Account</h3>
            <p className="text-[#0B342D] text-sm">Delete your account permanently</p>
          </div>
          <Button variant="destructive" className="text-white">
            Delete
          </Button>
        </Card>
      </div>
    </Card>
  )
}