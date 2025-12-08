import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    iconSrc: '/assets/icons/process.gif',
    bgColor: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200',
    title: 'Secure Processing',
    textHoverColor: 'hover:text-blue-600',
    description: 'Your medical data is processed securely with enterprise-grade encryption.',
  },
  {
    iconSrc: '/assets/icons/ai-analysis.gif',
    bgColor: 'bg-green-100',
    hoverColor: 'hover:bg-green-200',
    title: 'AI Analysis',
    textHoverColor: 'hover:text-green-600',
    description: 'Get instant insights and trends from your health data using advanced AI.',
  },
  {
    iconSrc: '/assets/icons/instant-result.gif',
    bgColor: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200',
    title: 'Instant Results',
    textHoverColor: 'hover:text-purple-600',
    description: 'Receive comprehensive health analysis and recommendations immediately.',
  },
]

export default function FeatureSection() {
  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {features.map((feature, index) => (
        <Card key={index} className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 ${feature.hoverColor}`}>
              <Image src={feature.iconSrc} alt={feature.title} width={100} height={100} unoptimized />
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 transition-colors duration-300 ${feature.textHoverColor}`}>{feature.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base transition-colors duration-300 hover:text-gray-700">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  )
}
