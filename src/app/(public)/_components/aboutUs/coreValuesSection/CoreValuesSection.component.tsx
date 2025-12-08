'use client'

import { Eye, Heart, Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, slideLeftVariant } from '@/utils/animation.util'

const values = [
  {
    title: 'Transparent & Inclusive',
    description:
      "Pre-existing conditions are simply additional data points that help us better understand your health journey. We don't see them as red flags or barriers - they're valuable insights that guide our personalized approach to your wellness.",
    icon: Users,
  },
  {
    title: 'No Hidden Surprises',
    description:
      'Experience complete transparency with no waiting periods, exclusions, or hidden fees. CENTUM is built on trust and clarity, with one singular mission: empowering our members to optimize their health and live longer, more vibrant lives through informed decision-making.',
    icon: Eye,
  },
  {
    title: 'Proactive Prevention',
    description:
      "We champion a forward-thinking, preventative approach to health management. Rather than waiting to treat problems after they arise, we focus on understanding your body's unique needs and helping you stay ahead of potential health challenges.",
    icon: Heart,
  },
]

export default function CoreValuesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {values.map(({ title, description, icon: Icon }, idx) => (
            <motion.div key={idx} variants={slideLeftVariant} className="text-cente group">
              <div className="p-4 sm:p-6 bg-gray-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 ease-out">
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
