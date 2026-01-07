'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { containerVariants, fadeUpVariant, fadeInBadge } from '@/utils/animation.util'
import WaitlistDialog from '@/components/Dialogs/waitlistDialog/WaitlistDialog.component'

interface PricingTier {
  name: string
  price: {
    monthly: string
    yearly: string
  }
  features: string[]
  buttonText: string
  buttonVariant: 'default' | 'secondary'
  isPopular?: boolean
  biomarkers: string
  reTests: string
  addOnDiscount: string
  telehealthConsults: string
  support: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Core',
    price: {
      monthly: '$99/month',
      yearly: '$699/year',
    },
    biomarkers: '100 key biomarkers',
    reTests: '25',
    addOnDiscount: 'Affiliate discounts',
    telehealthConsults: '2 per year',
    support: 'Standard Support',
    features: ['Biological Age (PhenoAge)', 'Portal Access', 'AI Analysis & Clinical Summary', 'Health Action Plan'],
    buttonText: 'Join Our Waitlist',
    buttonVariant: 'default',
  },
  {
    name: 'Plus',
    price: {
      monthly: '$99/month',
      yearly: '$999/year',
    },
    biomarkers: '100 key biomarkers',
    reTests: '50',
    addOnDiscount: 'Plus discounts',
    telehealthConsults: '6 per year',
    support: 'Priority Support',
    features: ['Biological Age (PhenoAge)', 'Portal Access', 'AI Analysis & Clinical Summary', 'Health Action Plan', 'Genetics Check (DNA + Methylation)'],
    buttonText: 'Join Our Waitlist',
    buttonVariant: 'secondary',
    isPopular: true,
  },
  {
    name: 'Prime',
    price: {
      monthly: '$199/month',
      yearly: '$1999/year',
    },
    biomarkers: '200 key biomarkers',
    reTests: '100',
    addOnDiscount: 'Prime discounts',
    telehealthConsults: 'Monthly (12 per year)',
    support: 'VIP Support',
    features: [
      'Biological Age (PhenoAge)',
      'Portal Access',
      'AI Analysis & Clinical Summary',
      'Health Action Plan',
      'Add-On Test Discount: Prime discounts',
      'Genetics Check (DNA + Methylation)',
      'Full Body MRI Scan',
      'Personal Health Coach: Dedicated coach',
      'Exclusive Events: Access to exclusive events',
    ],
    buttonText: 'Join Our Waitlist',
    buttonVariant: 'default',
  },
]

// Using predefined animations from utils

export default function PricingCards() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start divide-y md:divide-y-0 md:divide-x-0 ">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative group bg-white hover:rounded-2xl hover:shadow-lg hover:border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-fit ${
                tier.isPopular ? 'hover:border-primary bg-primary/5' : 'hover:border-[#0B3029]/50'
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] text-white px-4 py-1 rounded-full text-sm font-semibold animate-bounce">Most Popular</div>
                </div>
              )}

              <div className="p-8 ">
                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-[#16AF9D] transition-all duration-300">{tier.name}</h3>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{tier.price.monthly}</div>
                  <div className="text-lg text-gray-600">or {tier.price.yearly}</div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {/* Key Features */}
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{tier.biomarkers}</span>
                  </div>

                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Mid-Year Re-Tests: {tier.reTests}</span>
                  </div>

                  {/* Additional Features */}
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}

                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Add-On Test Discount: {tier.addOnDiscount}</span>
                  </div>

                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Telehealth Consults: {tier.telehealthConsults}</span>
                  </div>

                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{tier.support}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <WaitlistDialog
                  planName={tier.name}
                  buttonText={tier.buttonText}
                  subscriptionType={tier.name.toLowerCase()}
                  buttonClassName={`w-full py-3 text-base font-semibold transition-all duration-300 hover:scale-105 ${tier.isPopular ? 'bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] hover:bg-primary/90 text-white' : 'bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] hover:bg-gray-800 text-white'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
