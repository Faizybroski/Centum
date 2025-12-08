import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { useReduxSelector } from '@/hooks'
import { getInitials } from '@/utils'

export default function ProfileHeading() {
  const { userProfile } = useReduxSelector((state) => state.user)
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 sm:mb-6">
      <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
        <AvatarFallback className="bg-primary text-white text-lg sm:text-xl">{userProfile ? getInitials(userProfile.full_name) : 'U'}</AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{userProfile ? `${userProfile.full_name}` : 'User'}</h2>
        <p className="text-sm sm:text-base text-gray-600">{userProfile?.email}</p>
      </div>
    </div>
  )
}
