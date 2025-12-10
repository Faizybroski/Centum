'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { paths } from '@/navigate/paths'
import { useReduxSelector } from '@/hooks'
import { IconName } from 'lucide-react/dynamic'
import { getInitials, handleLogout } from '@/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { GenerateIcon } from '@/components/GenerateIcon/GenerateIcon.component'
import HeaderLogo from '@/components/centum-logos/HeaderLogo.component'
import { LogOut, Menu, LayoutDashboard, Users, Calendar, Settings, UserCheck, BarChart3, Shield, Crown, User, Bell, FileText, UtensilsCrossed, DollarSign, Receipt } from 'lucide-react'

export type NavigationItem = {
  label: string
  path: string
  icon: string
}

const CustomerSidebar = () => {
  const user = useReduxSelector((state) => state.user)
  const pathname = usePathname()

  const isActive = (path: string) => path === pathname
  const currentPath = location.pathname

  const getNavCls = (isActive: boolean) => (isActive ? 'bg-gradient-to-r from-primary/80 to-primary text-primary-foreground shadow-md font-medium' : 'hover:bg-muted/50 hover:text-foreground transition-all duration-200')

  // Define navigation items based on role
  const navigationItems: NavigationItem[] = [
    { path: paths.customerDashboard(), icon: 'house', label: 'Dashboard' },
    { path: paths.customerUpload(), icon: 'upload', label: 'Upload New Report' },
    { path: paths.customerHistory(), icon: 'file-text', label: 'Report History' },
    { path: paths.customerBlog(), icon: 'book-open', label: 'Blog' },
  ]

  // const isExpanded = navigationItems.some((i) => isActive(i.url));

  return (
    <Sidebar className="border-r border-border border-px bg-card/50 backdrop-blur-sm">
      <SidebarContent className="pt-6 flex flex-col h-full">
        <SidebarGroup className="flex-1 flex flex-col">
          {/* <SidebarGroupLabel className="flex items-center space-x-3 px-4 py-3 mb-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mx-3"> */}
          {/* <HeaderLogo /> */}
          <Link href="/" className="flex items-center justify-center h-20 p-1 mb-10">
            {/* <div className="relative h-[50px] w-[200px]"> */}
            <Image src="/assets/icons/centum_health-logo.svg" alt="Centum Health" className="object-contain" height={50} width={200} priority />
            {/* </div> */}
          </Link>
          {/* </SidebarGroupLabel> */}

          <SidebarGroupContent>
            <SidebarMenu className="px-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 justify-start h-12 px-3 rounded-lg ${isActive(item.path) ? 'text-black bg-primary/10 border-l-5 border-black' : 'text-black-600 hover:text-black-900 hover:bg-gray-50'}`}
                >
                  <GenerateIcon className="h-5 w-5 mr-3" name={item.icon as IconName} />
                  {item.label}
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6 p-3 border-t border-border">
          {/* <Link href={paths.customerProfile()} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-white text-sm font-bold">{user ? user.userProfile.full_name : 'U'}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.userProfile.full_name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.userProfile.email || 'user@example.com'}</p>
            </div>
          </Link> */}
        

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative rounded-full flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-white text-sm font-bold">{user ? user.userProfile.full_name : 'U'}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.userProfile.full_name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.userProfile.email || 'user@example.com'}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user ? `${user.userProfile.full_name}` : 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.userProfile.email || 'user@example.com'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={paths.customerProfile()}>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default CustomerSidebar
