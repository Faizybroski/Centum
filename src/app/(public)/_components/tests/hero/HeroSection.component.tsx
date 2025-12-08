'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'
export default function HeroSection() {
  return (
    <motion.div variants={fadeUpVariant} initial="hidden" animate="show">
      <section className="py-12 sm:py-16 lg:py-16 bg-[url('/assets/background_images/how-it-works-bg.png')] bg-cover bg-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Centum 100 Biomarker Panel</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">Our membership includes analysis of 100 key biomarkers across 16 essential health categories</p>
        </div>
        </section>

        <section className='py-12'>  
          {/* What's Included Stats */}
          <div className="p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-5xl font-bold sm:text-center lg:text-center text-gray-900 mb-6 sm:mb-8">What's Included</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 items-center gap-6">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-[#0B3029] mb-2">100</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Total Biomarkers</div>
              </div>
              <div className='text-center text-2xl hidden lg:block sm:block'>|</div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-[#0B3029] mb-2">16</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Health Categories</div>
              </div>
            </div>
          </div>
      </section>
    </motion.div>
  )
}
