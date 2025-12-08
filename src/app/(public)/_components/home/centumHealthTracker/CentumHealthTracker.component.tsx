'use client'
import { Card } from '@/components/ui/card'
import { Activity, FileText, Shield, TestTube, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, popVariant, slideLeftVariant } from '@/utils/animation.util'

const features = [
  {
    title: '100+ Biomarkers',
    description: 'Comprehensive bloodwork covering all essential health indicators for a complete picture of your wellness.',
    icon: TestTube,
  },
  {
    title: 'Secure & Private',
    description: 'Your health data is encrypted and stored with bank-level security. Complete privacy guaranteed.',
    icon: Shield,
  },
  {
    title: 'Progress Tracking',
    description: 'Visual charts and trends show your health improvements over time with actionable insights.',
    icon: TrendingUp,
  },
  {
    title: 'Expert Network',
    description: 'Access to medical professionals and AI-powered recommendations for optimal health outcomes.',
    icon: Users,
  },
  {
    title: 'Regular Follow-ups',
    description: 'Scheduled retesting of key biomarkers at 3-6 month intervals to monitor your progress.',
    icon: Activity,
  },
  {
    title: 'Personalized Plans',
    description: 'Custom diet, lifestyle, and supplement recommendations based on your unique biomarker profile.',
    icon: FileText,
  },
]

export default function CentumHealthTracker() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#16AF9D] bg-gradient-to-b from-[#FFFFFF]/10 to-[#0B3029]/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-sm mx-auto mb-4">
            Why Choose CENTUM Health?
          </h2>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto">Advanced health monitoring and personalized insights to help you optimize your overall. health and longevity.</p>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {features.map(({ title, description, icon: Icon }, idx) => (
            <motion.div variants={slideLeftVariant} initial="hidden" whileInView="show" viewport={{ once: true }} key={idx}>
              <Card className="bg-white border border-gray-200 shadow-lg text-center p-4 sm:p-6 transition-all duration-300 group">
                <motion.div className="p-3 sm:p-4 bg-gray-200 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:animate-pulse" variants={popVariant}>
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-900 " />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#16AF9D] transition-colors duration-300">{title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
