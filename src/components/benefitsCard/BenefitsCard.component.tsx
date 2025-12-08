'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { fadeUpVariant } from '@/utils/animation.util'

interface Benefit {
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    title: 'Comprehensive Health Assessment',
    description: '100+ biomarker analysis',
  },
  {
    title: 'Personalized Action Plan',
    description: 'AI-powered recommendations',
  },
  {
    title: 'Expert Support',
    description: 'Access to health professionals',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your health journey',
  },
]

export default function BenefitsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit">
      <h3 className="text-2xl font-bold text-primary mb-6 text-left">What You'll Get</h3>

      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">{benefit.title}</h4>
              <p className="text-gray-600 text-xs mt-1">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
