'use client'

import { Check } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeDownVariant, slideRightVariant, fadeInBadge } from '@/utils/animation.util'

const reasons = [
  {
    title: 'Comprehensive Testing',
    description: '100+ biomarkers across 10 health categories—metabolic, cardiovascular, liver, kidney, hormones, nutrients, inflammation, and more.',
  },
  {
    title: 'Accurate & Safe',
    description: 'Every report is double-checked by AI and a doctor, boosting diagnostic accuracy and peace of mind.',
  },
  {
    title: 'Privacy-First Approach',
    description: 'Your data is stored securely in Australia, encrypted at rest and in transit. Only you and your assigned clinician can access your information.',
  },
  {
    title: 'Actionable Insights',
    description: 'Get clear, personalized recommendations—not just numbers—so you know exactly what to do next.',
  },
  {
    title: 'Flexible Memberships',
    description: 'Choose the plan that fits your needs and budget, from Bronze ($59/mo) to Platinum (includes full-body MRI, genetic risk, and VIP support).',
  },
]

export default function WhyChooseCentumSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Why Choose Centum?
          </motion.h2>

          <motion.p className="text-lg text-gray-600 max-w-3xl mx-auto" variants={slideRightVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Discover the key advantages that make Centum your trusted health optimization partner
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {reasons.map(({ title, description }, idx) => (
            <motion.div key={idx} className="flex items-start gap-4" variants={slideRightVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div className="flex-shrink-0" variants={fadeInBadge} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </motion.div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
