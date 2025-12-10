'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { IconName } from 'lucide-react/dynamic'
import { LogOut, Menu, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { paths } from '@/navigate/paths'
import { useReduxSelector } from '@/hooks'
import { Button } from '@/components/ui/button'
import { getInitials, handleLogout } from '@/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { GenerateIcon } from '@/components/GenerateIcon/GenerateIcon.component'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Container } from '@/components/ui/container'

export type NavigationItem = {
  label: string
  path: string
  icon: string
}

export default function CustomerHeader() {
  const pathname = usePathname()
  const user = useReduxSelector((state) => state.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => path === pathname

  // Navigation items for reuse
  const navigationItems: NavigationItem[] = [
    { path: paths.customerDashboard(), icon: 'chart-column', label: 'Dashboard' },
    { path: paths.customerUpload(), icon: 'upload', label: 'Upload New Report' },
    { path: paths.customerHistory(), icon: 'history', label: 'Report History' },
    { path: paths.customerBlog(), icon: 'rss', label: 'Blog' },
  ]

  return (
    <header className="bg-white border-b border-px border-border sticky top-0 z-40">
      <Container>
        <div className="flex justify-between items-center mx-auto h-20">
          {/* Left side - Logo and Sidebar Toggle */}
          <div className="flex flex-col px-3 py-1 h-20 justify-center">
            <h2 className="text-lg font-bold">Welcome Back, {user ? user.userProfile.full_name : 'U'}</h2>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening with your health today</p>
          </div>

          {/* Center - Desktop Navigation */}
          {/* <nav className="hidden lg:flex gap-3 absolute left-1/2 transform -translate-x-1/2">
            {navigationItems.map((item) => {
              return (
                <Link key={item.path} href={item.path} className={`flex items-center rounded-lg gap-2 px-3 py-2 text-md ${isActive(item.path) ? 'bg-green-400/20 text-green-400' : 'text-white hover:text-gray-300'}`}>
                  <GenerateIcon className="h-4 w-4" name={item.icon as IconName} />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav> */}

          {/* Right side - Mobile Menu, Profile */}
          <div className="flex items-center gap-2 sm:gap-4 pr-4 sm:pr-6 lg:pr-8">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0 text-black hover:text-white hover:bg-primary">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    {/* <img src={CentumLogo} alt="Centum Health" className="h-6" /> */}
                    <Image src="/assets/icons/centum_logo_black.svg" alt="Centum Health" className="h-10 object-contain" height={750} width={750} priority />
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col space-y-4 px-4 ">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white text-sm font-bold">{user ? getInitials(user?.userProfile?.full_name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user ? `${user?.userProfile?.full_name}` : 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.userProfile?.email || 'user@example.com'}</p>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map((item) => {
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`flex items-center gap-2 justify-start h-12 px-3 rounded-lg ${
                            isActive(item.path) ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <GenerateIcon className="h-5 w-5 mr-3" name={item.icon as IconName} />
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Mobile Menu Actions */}
                  <div className="pt-4 border-t">
                    <Link href={paths.customerProfile()} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 justify-start h-12 px-3 w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      <User className="h-5 w-5 mr-3" />
                      Profile
                    </Link>
                    <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 justify-start h-12 px-3 w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="h-5 w-5 mr-3" />
                      Log out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white text-sm font-bold">{user ? getInitials(user.userProfile.full_name) : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
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
        </div>
      </Container>
    </header>
  )
}
