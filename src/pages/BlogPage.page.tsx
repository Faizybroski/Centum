'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { paths } from '@/navigate/paths'
import ComingSoon from '@/components/coming-soon/ComingSoon.component'

export default function BlogPage() {
  const pathname = usePathname()
  return (
    <>
      {pathname != paths.customerBlog() && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8 bg-[url('/assets/background_images/how-it-works-bg.png')] bg-cover bg-center">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Health Insights Blog</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Expert insights, research updates, and practical tips for optimizing your health journey.</p>
          </div>
        </div>
      )}
      {pathname === paths.customerBlog() && (
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Health Insights Blog</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Expert insights, research updates, and practical tips for optimizing your health journey.</p>
        </div>
      )}
      {pathname === paths.customerBlog() && (
        <div className="max-w-5xl mx-auto">
          <div className="py-1">
            <ComingSoon features={true} />
          </div>
        </div>
      )}
      {pathname != paths.customerBlog() && (
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Section */}
          <div className="py-16">
            <ComingSoon features={true} />
          </div>
        </div>
      )}
    </>
  )
}
