'use client'

import { Brain, Shield, TestTube, Users, Eye, Heart } from 'lucide-react'
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

export default function WhatIsCentumSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">What is Centum?</h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
            Unlock the power of your health data with Australia's most advanced health optimization platform. Centum Health Tracker is a next-generation, membership-based platform that empowers you to take charge of your
            health and longevity. We combine comprehensive biomarker testing, advanced AI-powered analysis, and personalized recommendations delivered securely and conveniently through your own digital health portal.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 ">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <motion.div key={idx} variants={slideRightVariant} className="text-center group shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-md px-3 py-8">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:rotate-10 transition-transform duration-300 ease-out">
                <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-primary">{title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
