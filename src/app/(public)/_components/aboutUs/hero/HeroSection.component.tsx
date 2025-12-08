'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'
export default function HeroSection() {
  return (
    <motion.div variants={fadeUpVariant} initial="hidden" animate="show">
      <section className="py-16 sm:py-24 lg:py-23 bg-[url('/assets/background_images/how-it-works-bg.png')] bg-cover bg-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">About CENTUM </h1>
          <h2 className="text-xl sm:text-2xl text-gray-600 font-semibold mb-4">Revolutionizing healthcare through transparency, prevention, and personalized wellness solutions</h2>
        </div>
      </section>
    </motion.div>
  )
}
