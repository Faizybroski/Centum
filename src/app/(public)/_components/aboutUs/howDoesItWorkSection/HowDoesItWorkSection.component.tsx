'use client'
import { Brain, Heart, Shield, TestTube, Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeDownVariant } from '@/utils/animation.util'
const steps = [
  {
    number: 1,
    title: 'Personalized Onboarding',
    description: 'Complete a detailed health questionnaire to capture your medical history, symptoms, and goals.',
    icon: Users,
    color: 'green',
  },
  {
    number: 2,
    title: 'Comprehensive Testing',
    description: 'Visit our nationwide labs for comprehensive blood tests covering 100+ key biomarkers stored securely.',
    icon: TestTube,
    color: 'blue',
  },
  {
    number: 3,
    title: 'AI + Doctor Review',
    description: 'AI interprets results while Australian doctors review and approve your personalized action plan.',
    icon: Brain,
    color: 'purple',
  },
  {
    number: 4,
    title: 'Health Dashboard',
    description: 'Access real-time insights, progress tracking, and tailored diet, lifestyle, and supplement plans.',
    icon: Shield,
    color: 'orange',
  },
  {
    number: 5,
    title: 'Ongoing Support',
    description: 'Regular follow-ups, retesting, and access to medical professionals for expert guidance.',
    icon: Heart,
    color: 'pink',
  },
]

export default function HowDoesItWorkSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">How Does It Work?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our streamlined 5-step process makes health optimization simple and accessible</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map(({ number, title, description, icon: Icon, color }) => (
            <div
              key={number}
              className={`relative bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-xl p-6 border border-${color}-200 hover:shadow-lg transition-all duration-300 ${
                number === 5 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="absolute -top-4 left-6">
                <div className={`w-12 h-12 bg-${color}-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg`}>{number}</div>
              </div>
              <motion.div variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col items-center">
                <div className="pt-6">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-gray-100 rounded-full px-6 py-3">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className={`w-3 h-3 bg-${step.color}-600 rounded-full`}></div>
                {i < steps.length - 1 && <div className="w-4 md:w-8 h-0.5 bg-gray-300"></div>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">Start to finish in as little as 2 weeks</p>
        </div>
      </div>
    </section>
  )
}
