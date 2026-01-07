'use client'
import { Brain, Heart, Shield, TestTube, Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeDownVariant } from '@/utils/animation.util'
const steps = [
  {
    id: 1,
    title: 'Personalized Onboarding',
    description: 'Complete a detailed health questionnaire to capture your medical history, symptoms, and goals.',
    icon: Users,
  },
  {
    id: 2,
    title: 'Comprehensive Testing',
    description: 'Visit our nationwide labs for comprehensive blood tests covering 100+ key biomarkers stored securely.',
    icon: TestTube,
  },
  {
    id: 3,
    title: 'AI + Doctor Review',
    description: 'AI interprets results while Australian doctors review and approve your personalized action plan.',
    icon: Brain,
  },
  {
    id: 4,
    title: 'Health Dashboard',
    description: 'Access real-time insights, progress tracking, and tailored diet, lifestyle, and supplement plans.',
    icon: Shield,
  },
  {
    id: 5,
    title: 'Ongoing Support',
    description: 'Regular follow-ups, retesting, and access to medical professionals for expert guidance.',
    icon: Heart,
  },
]

export default function HowDoesItWorkSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20  bg-[linear-gradient(to_bottom,#16AF9D_0%,#0B3029_100%)]">
      {/* bg-gradient-to-br from-primary/100 to-old-primary/100 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">How Does It Work?</h2>
          <p className="text-lg max-w-3xl mx-auto">Our streamlined 5-step process makes health optimization simple and accessible</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map(({ id, title, description, icon: Icon }, index) => {
            const isLast = index === steps.length - 1

              // DESKTOP: No arrow after step 3
            const hideDesktopArrow =
              (id === 3) // no arrow from 3 → 4
              
            return (
              <div
                key={id}
                className="relative rounded-xl p-6 border hover:shadow-lg transition-all duration-300 bg-white text-center"
              >
                <motion.div
                  variants={fadeDownVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

                  {/* ===== MOBILE ARROW (always vertical except last) ===== */}
                  {!isLast && (
                    <div className="lg:hidden absolute left-1/2 top-full translate-y-2 flex flex-col items-center">
                      <div className="w-px h-5 bg-gray-300"></div>
                    </div>
                  )}

                  {/* ===== DESKTOP HORIZONTAL LINE ===== */}
                  {!isLast && !hideDesktopArrow && (
                    <div className="hidden lg:flex absolute top-1/2 left-full translate-x-2 items-center">
                      <div className="w-5 h-px bg-gray-300"></div>
                    </div>
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
  {steps.map(({ id, title, description, icon: Icon }) => (
    <div
      key={id}
      className={`relative rounded-xl p-6 border bg-white flex flex-col items-center text-center shadow-sm 
      transition-all duration-300 hover:shadow-lg
      ${id === 4 ? 'lg:col-start-2' : ''}`}
    >
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

      {id < 5 && (
        <div className="absolute left-1/2 top-full w-px h-10 bg-gray-300 transform -translate-x-1/2 lg:hidden"></div>
      )}

      {id === 1 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-10 h-px bg-gray-300"></div>
      )}
      {id === 2 && (
        <>
          <div className="hidden lg:block absolute top-1/2 left-full w-10 h-px bg-gray-300"></div>
          <div className="hidden lg:block absolute top-1/2 right-full w-10 h-px bg-gray-300"></div>
        </>
      )}
      {id === 3 && (
        <div className="hidden lg:block absolute top-1/2 right-full w-10 h-px bg-gray-300"></div>
      )}

      {id === 4 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-10 h-px bg-gray-300"></div>
      )}
      {id === 5 && (
        <div className="hidden lg:block absolute top-1/2 right-full w-10 h-px bg-gray-300"></div>
      )}
    </div>
  ))}
</div> */}


        {/* Process Flow */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 rounded-full px-6 py-3">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className={`w-3 h-3 bg-white rounded-full`}></div>
                {i < steps.length - 1 && <div className="w-4 md:w-8 h-px bg-gray-400"></div>}
              </React.Fragment>
            ))}
          </div>
          {/* <p className="text-sm text-gray-500 mt-3">Start to finish in as little as 2 weeks</p> */}
        </div>
      </div>
    </section>
  )
}
