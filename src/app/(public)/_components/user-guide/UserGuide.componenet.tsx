'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const steps = [
  {
    title: '1. Account Creation & Onboarding',
    items: [
      `Go to Centum Health and click "Sign Up."`,
      'Enter your email, create a password, and verify your email.',
      'Complete the Onboarding Health Questionnaire  to personalize your experience.',
      'Review and accept our Privacy & Security Policy and Terms of Service.',
    ],
  },
  {
    title: '2. Uploading Lab Results',
    items: ['Log in to your account.', 'Click "Upload Results" on your dashboard.', 'Choose PDF file.', 'Upload your lab results. Our system automatically analyzes your data securely.'],
  },
  {
    title: '3. Viewing Your Dashboard',
    items: [' Your dashboard provides a snapshot of your health.', 'View latest results, historical trends, and AI summaries. ', 'Download reports (PDF) for sharing with your healthcare provider. '],
  },
  {
    title: '4. Understanding AI Insights',
    items: ['AI analyzes lab results and provides traffic-light indicators. ', ' Summaries explain your results clearly.', 'Suggestions include diet, lifestyle, and preventive recommendations. '],
  },
  {
    title: '5. Managing Your Account',
    items: ['Access your account settings from your profile icon. ', 'Update profile information, change your password, adjust your privacy settings.'],
  },
  {
    title: '6. Support & Help',
    items: [
      <>
        Contact us at{' '}
        <a href="mailto:info@centum.health" className="text-primary font-medium">
          info@centum.health
        </a>{' '}
        for help
      </>,
      'Visit our Security & Privacy FAQ for common questions and best practices. ',
    ],
  },
]

const checklistItems = ['Complete your profile', 'Upload your lab results', 'Review your dashboard', 'Explore AI-driven insights', 'Read the Privacy & Security Policy and FAQs']

export default function UserGuide() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Centum Health Tracker</h1>
          <p className="text-lg sm:text-xl text-gray-600">User Guide & Onboarding Materials</p>

          {/* Intro Paragraph */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            Welcome to Centum Health Tracker! This guide will help you get started with our platform and make the most out of its features.
          </p>
        </motion.div>

        {/* Collapsible Steps */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <Collapsible key={idx} className="bg-white rounded-lg shadow-md border">
              <CollapsibleTrigger className="group w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-900 text-md sm:text-lg hover:no-underline focus:no-underline">
                {step.title}
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 text-gray-700">
                <ul className="list-disc list-inside space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Onboarding Checklist */}
        <motion.div initial="hidden" whileInView="visible" variants={fadeUpVariant} viewport={{ once: true }}>
          <Card className="shadow-lg border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Onboarding Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {checklistItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
