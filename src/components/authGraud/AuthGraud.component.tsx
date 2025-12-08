'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, handleLogout } from '@/utils'
import { AuthGuardProps, PageType } from './AuthGraud.type'
import { allowedRoles } from '@/utils'
import { useLazyProfileQuery } from '@/redux/services/auth.api'
import { useReduxDispatch } from '@/hooks'
import { updateUser } from '@/redux/slices/user.slice'
import { UserDTO } from '@/dto'
import { paths } from '@/navigate/paths'
import SectionLoading from '../ui/section-loading'
import { toast } from 'sonner'

export default function AuthGuard({ children, pageType }: AuthGuardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [getUser] = useLazyProfileQuery()
  const dispatch = useReduxDispatch()

  const fetchUser = async () => {
    try {
      const data = await getUser().unwrap()
      let dataModifed = { ...data }
      if (dataModifed) {
        console.log(dataModifed)
        setUser(dataModifed as UserDTO)
        dispatch(updateUser(dataModifed as UserDTO))
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Fetch user failed:', err)
      setUser(null)
      handleLogout()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = getCookie('access_token')

    if (pageType === 'public') {
      if (token) {
        fetchUser()
      } else {
        setIsLoading(false)
      }
    } else if (pageType === 'auth') {
      if (token) fetchUser()
      else setIsLoading(false)
    } else {
      if (!token) {
        toast.error('Session Expired! Please login again.')
        router.replace('/auth/login')
        return
      }
      fetchUser()
    }
  }, [pageType])

  useEffect(() => {
    if (isLoading) return

    if (pageType === 'auth' && user) {
      if (user.role === 'customer') {
        router.push(paths.customerDashboard())
      } else if (user.role === 'admin') {
        console.log('admin')
        router.push(paths.adminDashboard())
      } else {
        router.push('/not-found')
      }
    }

    if (allowedRoles.includes(pageType)) {
      const allowedRole = pageType as PageType
      if (user && user.role !== allowedRole) {
        router.replace('/not-found')
      }
    }
  }, [user, isLoading])

  const shouldBlockRendering = isLoading || (pageType !== 'public' && pageType !== 'auth' && !user)

  const isAuthorized = (() => {
    if (pageType === 'public') return true
    if (pageType === 'auth') return !user
    return user?.role === pageType
  })()

  if (shouldBlockRendering) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SectionLoading />
      </div>
    )
  }

  return isAuthorized ? <>{children}</> : null
}
