'use client'
import React from 'react'
import { BarChart3, Heart, TestTube, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'
const features = [
  { icon: BarChart3, title: 'Dashboard', description: 'Health overview' },
  { icon: TestTube, title: 'Test Results', description: 'Raw & clinical data' },
  { icon: Heart, title: 'Recommendations', description: 'Diet & lifestyle' },
  { icon: TrendingUp, title: 'Progress', description: 'Tracking & charts' },
]

export default function HealthPortalIncludes() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Your Health Portal Includes</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Access your comprehensive health dashboard with real-time insights and personalized recommendations.</p>
        </div>

        {/* Features Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto" variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {features.map(({ icon: Icon, title, description }, idx) => (
            <motion.div key={idx} className="text-center group" whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
              <div className="p-8 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Icon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-600 mx-auto group-hover:text-[#16AF9D] transition-colors duration-300" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-3">{title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-600 font-medium text-sm sm:text-base">+ Real-time updates • Secure access • Mobile optimized</p>
        </div>
      </div>
    </section>
  )
}
