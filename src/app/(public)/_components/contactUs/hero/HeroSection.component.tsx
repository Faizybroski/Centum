'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeDownVariant } from '@/utils/animation.util'
export default function HeroSection() {
  return (
    <motion.div variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <section className="py-12 sm:py-16 lg:py-24 bg-[url('/assets/background_images/how-it-works-bg.png')] bg-cover bg-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Contact Us</h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">Get in touch with our team. We're here to help you with your health management needs.</p>
        </div>
      </section>
    </motion.div>
  )
}
