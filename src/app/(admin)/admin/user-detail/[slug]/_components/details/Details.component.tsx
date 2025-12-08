import { UserDTO } from '@/dto'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Briefcase, Calendar, Heart, Pencil } from 'lucide-react'
import Image from 'next/image'

export default function ProfileCard({ data }: { data: UserDTO }) {
  return (
    <Card className="shadow-none border-none rounded-xl overflow-hidden bg-white">
      <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
        {/* Profile Image */}
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
            <AvatarImage alt={data?.full_name} />
            <AvatarFallback className="text-gray-500 text-4xl">{data?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-medium text-gray-700">{data?.full_name}</h2>
            {/* <Badge variant="outline" className={`px-2 py-1 rounded-full ${data?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {data?.status || 'Active'}
            </Badge> */}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-4 text-sm lg:grid-cols-2">
            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap break-words gap-2 sm:gap-4 font-medium text-gray-500">
              <Mail size={20} className="text-gray-500" />
              <p>{data?.email || 'N/A'}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap break-words gap-2 sm:gap-4 font-medium text-gray-500">
              <Phone size={20} className="text-gray-500" />
              <p>{data?.phone_number || 'N/A'}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap break-words gap-2 sm:gap-4 font-medium text-gray-500">
              <Calendar size={20} className="text-gray-500" />
              <p>{data?.date_of_birth || 'N/A'}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap break-words gap-2 sm:gap-4 font-medium text-gray-500">
              <Heart size={20} className="text-gray-500" />
              <p>{data?.gender || 'N/A'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
