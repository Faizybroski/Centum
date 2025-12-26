"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { paths } from '@/navigate/paths'
import SubscribeNewsletter from './components/form/SubscribeNewsletter.component'

export default function PublicFooter() {
  return (
    <footer className="text-white py-8 sm:py-12 bg-[#16AF9D] bg-gradient-to-b from-[#FFFFFF]/10 to-[#0B3029]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Image
                src="/assets/icons/centum-health-logo-white.svg"
                alt="Centum Health"
                className="h-18 w-auto object-contain"
                height={56}
                width={200}
                priority
              />
            </div>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Empowering individuals with intelligent health insights to optimize longevity and wellbeing.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-1 sm:space-y-3 text-xs sm:text-sm text-white/70">
              {['Health Analysis', 'Biomarker Testing', 'Progress Tracking', 'Expert Consultation'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-1 sm:space-y-3 text-xs sm:text-sm text-white/70">
              <li>
                <Link href={paths.about()} className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={paths.howItWorks()} className="hover:text-white">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href={paths.pricing()} className="hover:text-white">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href={paths.contact()} className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
          <ul className="space-y-1 sm:space-y-3 text-xs sm:text-sm text-white/70">
            <li>
              <Link href={paths.userGuide()} className="hover:text-white">
                User Guide & Onboarding
              </Link>
            </li>
            <li>
              <Link href={paths.privacy()} className="hover:text-white">
              Term of Services & Privacy Policy 
              </Link>
            </li>
            <li>
              <Link href={paths.securityFaq()} className="hover:text-white">
                {/* Security & Privacy  */}
                FAQ
              </Link>
            </li>
          </ul>
        </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Stay Updated</h4>
            <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">
              Get the latest health insights and updates delivered to your inbox.
            </p>

       {/* subscribe newsletter */}
            <SubscribeNewsletter />
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-white/60">
            © {new Date().getFullYear()} Centum Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
