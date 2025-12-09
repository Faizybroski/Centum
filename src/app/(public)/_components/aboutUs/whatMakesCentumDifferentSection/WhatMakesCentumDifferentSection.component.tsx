'use client'
import { Award, DollarSign, Target, TrendingUp, Zap } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeDownVariant } from '@/utils/animation.util'
const differences = [
  {
    title: 'First in Australia',
    description: 'No other platform offers this level of comprehensive, AI-powered, privacy-first health tracking in a single membership.',
    icon: Award,
  },
  {
    title: 'No Hidden Fees',
    description: 'Transparent, all-inclusive pricing. No Medicare or insurance hassles.',
    icon: DollarSign,
  },
  {
    title: 'Continuous Improvement',
    description: 'Our AI learns from every doctor review, making the system smarter and safer for everyone.',
    icon: TrendingUp,
  },
  {
    title: 'Proven Results',
    description: 'Members see measurable improvements in health, energy, and peace of mind—supported by real clinical data.',
    icon: Target,
  },
  {
    title: 'AI+Doctor Hybrid',
    description: 'Typical GP diagnosis accuracy is ≈ 86%. Cutting-edge AI alone achieves ≈ 87% in lab studies. With our AI+Doctor Hybrid approach, accuracy jumps to 92–95%. AI speed + Doctor insight = Centum Precision.',
    icon: Zap,
  },
]

export default function WhatMakesCentumDifferentSection() {
  return (
    <motion.div variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {' '}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">What Makes Centum Different?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the unique advantages that set us apart in the health optimization industry</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 shadow-[0_0_15px_rgba(0,0,0,0.15)] px-16 py-10 rounded-lg">
            {differences.map(({ title, description, icon: Icon }, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-6 h-6 bg-primary rounded-full flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
