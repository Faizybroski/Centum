'use client'

import { Brain, Shield, TestTube } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, fadeUpVariant, slideRightVariant } from '@/utils/animation.util'

const features = [
  {
    title: 'Comprehensive Testing',
    description: '100+ biomarkers across 10 health categories—metabolic, cardiovascular, liver, kidney, hormones, nutrients, inflammation, and more.',
    icon: TestTube,
  },
  {
    title: 'AI + Doctor Hybrid',
    description: 'Our AI engine interprets your results, while Australian-registered doctors review and sign off on your personalized action plan. Accuracy jumps to 92–95%.',
    icon: Brain,
  },
  {
    title: 'Privacy-First',
    description: 'Your data is stored securely in Australia, encrypted at rest and in transit. Only you and your assigned clinician can access your information.',
    icon: Shield,
  },
]

export default function WhatIsCentumSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What is Centum?</h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
            Unlock the power of your health data with Australia's most advanced health optimization platform. Centum Health Tracker is a next-generation, membership-based platform that empowers you to take charge of your
            health and longevity. We combine comprehensive biomarker testing, advanced AI-powered analysis, and personalized recommendations delivered securely and conveniently through your own digital health portal.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 ">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <motion.div key={idx} variants={slideRightVariant} className="text-center group">
              <div className="p-4 sm:p-6 bg-gray-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:rotate-10 transition-transform duration-300 ease-out  ">
                <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-green-600">{title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
