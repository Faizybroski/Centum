'use client'
import { BarChart3, Heart, Shield, TestTube } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, slideLeftVariant } from '@/utils/animation.util'
const steps = [
  {
    id: 1,
    title: 'Complete Health Questionnaire',
    description: 'Complete our comprehensive health assessment to understand your unique needs, health goals and any possible symptoms or existing known conditions.',
    icon: TestTube,
  },
  {
    id: 2,
    title: 'Secure Testing & Storage',
    description: 'Book your 100-biomarker blood test at a trusted partner clinic, with all results automatically delivered to your secure health portal.',
    icon: Shield,
  },
  {
    id: 3,
    title: 'AI-Powered Analysis',
    description: 'Our advanced AI software analyzes your data to curate your own personal clinicalsummary of all of your test results in an easy to understand and navigate way.',
    icon: Heart,
  },
  {
    id: 4,
    title: 'Track & Optimize',
    description: 'Monitor progress and optimize your health journey with diet, lifestyle and supplement recommendations.',
    icon: BarChart3,
  },
]

export default function ProcessStep() {
  return (
    <motion.div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16" initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
        {steps.map((step) => (
          <motion.div key={step.id} className="text-center group" variants={slideLeftVariant}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 relative flex flex-col h-full">
              <div className="w-8 h-8 bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] text-white rounded-full flex items-center justify-center absolute -top-3 -left-3 text-sm font-bold">{step.id}</div>
              <div className={`w-12 h-12 bg-[#16AF9D]/15 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <step.icon className="h-6 w-6 text-[#0B3029]" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3  group-hover:text-primary">{step.title}</h3>
              <p className="text-xs sm:text-xs text-gray-600 leading-relaxed flex-1">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
