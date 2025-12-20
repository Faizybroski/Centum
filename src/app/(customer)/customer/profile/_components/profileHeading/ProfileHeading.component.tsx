import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useReduxSelector } from '@/hooks'
import { getInitials } from '@/utils'
import { Card } from '@/components/ui/card'
import { Calendar, Edit, Mail, Phone } from 'lucide-react'

interface Props {
  onEdit: () => void
}

export default function ProfileHeading({ onEdit }: Props) {
  const { userProfile } = useReduxSelector((state) => state.user)

  return (
    <Card className="mb-6 sm:mb-8 py-[33px] pl-[33px] pr-[26px]">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 lg:items-start">
        {/* Left: Avatar + Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
          <div className="border-4 border-[#0B342D1A] rounded-[3px]">
            <Avatar className="w-16 h-16 sm:w-22 sm:h-22 rounded-none">
              {/* {userProfile?.profile_image ? (
            <AvatarImage
              src={userProfile.profile_image}
              alt={userProfile.full_name}
              className="rounded-none"
            />
          ) : ( */}
              <AvatarFallback className="bg-primary text-white text-lg sm:text-xl font-semibold rounded-none">{userProfile ? getInitials(userProfile.full_name) : 'U'}</AvatarFallback>
              {/* )} */}
            </Avatar>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{userProfile?.full_name ?? 'User'}</h2>
              <p className="text-sm sm:text-base">Centum Health Member</p>
            </div>
            <div className="flex flex-colb gap-4 lg:gap-32 lg:flex-row items-center">
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-[#0B342D]" />
                <p className="text-sm sm:text-base text-[#0B342D]">{userProfile?.email ?? ''}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-[#0B342D]" />
                <p className="text-sm sm:text-base text-[#0B342D]">{userProfile?.phone_number ?? '000'}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="w-4 h-4 text-[#0B342D]" />
              <p className="text-sm sm:text-base text-[#0B342D]">Member since {userProfile?.created_at ?? 'January 2025'}</p>
            </div>
          </div>
        </div>

        {/* Right: Edit Button */}
        <Button size="sm" onClick={onEdit} className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)]">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </Card>
  )
}
