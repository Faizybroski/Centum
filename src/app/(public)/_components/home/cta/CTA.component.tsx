'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'
export default function CTA() {
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
