import ComingSoon from '@/components/coming-soon/ComingSoon.component'
import React from 'react'

export default function BlogPage() {
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8 bg-[url('/assets/background_images/how-it-works-bg.png')] bg-cover bg-center">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Health Insights Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Expert insights, research updates, and practical tips for optimizing your health journey.</p>
        </div>
      </div>
       <div className='max-w-4xl mx-auto'>
        {/* Coming Soon Section */}
        <div className='py-16'>
        <ComingSoon features={true} />
        </div>
      </div>
    </>
  )
}
