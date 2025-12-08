'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariant, slideLeftVariant, slideRightVariant } from '@/utils/animation.util'

export default function PricingHero() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[url('/assets/background_images/how-it-works-bg.png')] bg-cover bg-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-10 right-20 w-32 h-32 bg-green-200 rounded-full" animate={{ y: [0, -70, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" variants={fadeUpVariant} initial="hidden" animate="show">
          Membership Tiers & Pricing
        </motion.h1>

        <motion.p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" variants={fadeUpVariant} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          Choose the membership that best fits your health optimization journey
        </motion.p>
      </div>
    </section>
  )
}
