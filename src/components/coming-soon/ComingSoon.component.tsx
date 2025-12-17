'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { paths } from '@/navigate/paths'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ComingSoon({
  title = 'Coming Soon',
  subtitle = 'We are working on bringing you the latest health insights, research updates, and expert advice. Stay tuned for comprehensive articles on biomarkers, longevity science, and personalized health optimization.',
  features = false,
}: {
  title?: string
  subtitle?: string
  features?: boolean
}) {
  const pathname = usePathname()
  return (
    <motion.div className="text-center" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      <Card className="border-0 shadow-[#0B342D]/20 shadow-lg bg-white mx-auto">
        <CardContent className="p-6 sm:p-8 lg:p-12">
          <div className="mb-6 sm:mb-8">
            {pathname === paths.customerBlog() && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-[#0B342D]" />
              </div>
            )}
            {pathname != paths.customerBlog() && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-[#0B342D]" />
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">{subtitle}</p>
          </div>

          {/* Features Preview */}
          {features && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-3 sm:p-4 bg-[#0B342D]/5 rounded-lg">
                <Clock className="h-3 w-3 sm:h-8 sm:w-8 text-[#0B342D] mx-auto mb-3" />
                <h3 className="text-2xl sm:text-base font-semibold text-gray-900 mb-2">Weekly Updates</h3>
                <p className="text-xs sm:text-sm text-gray-600">Fresh content every week covering the latest in health science</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-[#0B342D]/5 rounded-lg">
                <Calendar className="h-3 w-3 sm:h-8 sm:w-8 text-[#0B342D] mx-auto mb-3" />
                <h3 className="text-2xl sm:text-base font-semibold text-gray-900 mb-2">Expert Insights</h3>
                <p className="text-xs sm:text-sm text-gray-600">Articles written by healthcare professionals and researchers</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
