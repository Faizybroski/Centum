'use client'
import { Button } from '@/components/ui/button'
import { BarChart3, ChevronRight, TestTube, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useReduxSelector } from '@/hooks'
import { paths } from '@/navigate/paths'
import { AnimatePresence, motion } from 'framer-motion'

const features = [
  {
    title: '100+ Biomarkers',
    subtitle: 'Comprehensive health snapshot',
    icon: TestTube,
  },
  {
    title: 'AI-Powered Analysis',
    subtitle: 'Personalized health insights',
    icon: BarChart3,
  },
  {
    title: 'Expert Network',
    subtitle: 'Access to medical professionals',
    icon: Users,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay each child
      delayChildren: 0.3,
    },
  },
}

export default function HeroSection() {
  const user = useReduxSelector((state) => state.user)

  const texts = ['Know More.', 'Live Better.'] // Array of texts
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length) // Loop through array
    }, 3000) // Change every 3 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <>
    
    <section className="relative bg-[url('/assets/background_images/hero_bg_image.png')] bg-cover bg-center py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-green-50 via-white to-gray-100 py-20 overflow-hidden">

      <div className="max-w-3xl flex ms-auto justify-end items-start px-4 sm:px-6 lg:px-8">
        <div className="text-start">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl max-w-md lg:text-5xl xl:text-6xl font-bold text-white mb-4">
            Take Control of Your Health Journey.
          </h1>
          {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-green-600 mb-4 ">Know More. Live Better.</h1> */}

          <AnimatePresence mode="wait">
            <motion.h1
              key={index} // Important for AnimatePresence
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#16AF9D] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
            >
              {texts[index]}
            </motion.h1>
          </AnimatePresence>
          <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 max-w-xl word-break leading-relaxed">
            Comprehensive health insights through 100+ biomarkers, AI-powered analysis, and personalized recommendations to optimize your longevity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
            <Link href={user?.isLoggedIn ? paths.customerDashboard() : paths.signup()}>
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                Start Your Journey <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href={paths.howItWorks()}>
              <Button
                variant="outlineSecondary"
                size="lg"
                className="text-base text-white sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto hover:border-black hover:bg-white hover:text-black transition-colors duration-300 hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className='py-16'>
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="show">
            {features.map(({ title, subtitle, icon: Icon }, idx) => (
              <motion.div key={idx} className="text-center">
                <motion.div
                  className="p-3 sm:p-4 bg-gray-200 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                </motion.div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
    </section>
    </>
  )
}
