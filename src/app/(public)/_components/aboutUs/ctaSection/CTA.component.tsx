'use client'
import { Button } from '@/components/ui/button'
import { paths } from '@/navigate/paths'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
export default function CTA() {
  // return (
  //   <section className="relative  sm:py-16 lg:py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-700 py-20 overflow-hidden">
  //     {/* Animated Background Shapes */}
  //     <div className="absolute inset-0 opacity-10 pointer-events-none">
  //       <motion.div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} />

  //       <motion.div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full" animate={{ y: ['-25%', '0%', '-25%'] }} transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} />

  //       <motion.div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full" animate={{ y: [0, -10, 0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} />
  //     </div>
  //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  //       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
  //       <p className="text-lg sm:text-xl text-green-100 mb-8 leading-relaxed">
  //         Join Centum Health Tracker and experience the future of preventive healthcare. Take control, get clarity, and optimize your health—today and for years to come.
  //       </p>
  //       <Link href={paths.signup()}>
  //         <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 font-bold  hover:scale-130 transition-transform duration-300">
  //           Get Started Today
  //         </Button>
  //       </Link>
  //     </div>
  //   </section>
  // )
  return (
    <section className="relative bg-[url('/assets/background_images/bg-image-home-page.png')] bg-center bg-cover sm:py-16 lg:py-20 py-20 overflow-hidden">
      {/* CTA Content */}
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Health?</h2>
        <p className="text-lg sm:text-xl text-green-100 mb-6 sm:mb-8 leading-relaxed">Join thousands of members who have taken control of their health journey with expert guidance.</p>
        <Link href="/auth/signup">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto hover:scale-105 transition-transform duration-300">
            Join Now! <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
