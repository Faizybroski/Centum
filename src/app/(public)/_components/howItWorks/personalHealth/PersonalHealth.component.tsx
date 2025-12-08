'use client'
import { Card } from '@/components/ui/card'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, fadeUpVariant, slideLeftVariant } from '@/utils/animation.util'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

type BiomarkerType = 'optimal' | 'average' | 'attention'

interface ChartData {
  month: string
  type: BiomarkerType
  value: number
}

const COLORS: Record<BiomarkerType, string> = {
  optimal: '#22c55e', // Tailwind green-500
  average: '#f97316', // Tailwind orange-500
  attention: '#ef4444', // Tailwind red-500
}

export default function PersonalHealth() {
  const data: ChartData[] = [
    { month: 'Jan', type: 'optimal', value: 80 },
    { month: 'Feb', type: 'optimal', value: 75 },
    { month: 'Mar', type: 'average', value: 40 },
    { month: 'Apr', type: 'optimal', value: 85 },
    { month: 'May', type: 'attention', value: 25 },
    { month: 'Jun', type: 'optimal', value: 90 },
    { month: 'Jul', type: 'optimal', value: 78 },
    { month: 'Aug', type: 'average', value: 45 },
    { month: 'Sep', type: 'optimal', value: 88 },
    { month: 'Oct', type: 'attention', value: 20 },
    { month: 'Nov', type: 'optimal', value: 82 },
    { month: 'Dec', type: 'optimal', value: 87 },
  ]
  return (
    <section className="py-12 sm:py-16 bg-[#16AF9D] bg-gradient-to-b from-[#FFFFFF]/10 to-[#0B3029]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Your Personal Health Portal Preview</h2>
          <p className="text-lg sm:text-xl text-white/90">See how your personalized health dashboard will look with comprehensive biomarker tracking and actionable insights</p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {/* Upcoming Lab Visit */}
          <motion.div variants={fadeUpVariant}>
            <Card className="bg-white p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Upcoming Lab Visit
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">March 30, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span>CLIA Lab</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kit Type:</span>
                  <span>At Home Kit (UPS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span>5-7 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span>456 Oak Street, Suite 100</span>
                </div>
              </div>
            </Card>
          </motion.div>
          {/* All Biomarkers */}
          <motion.div variants={fadeUpVariant}>
            <Card className="bg-white p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                All Biomarkers
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-500 text-white text-center p-2 rounded text-sm font-medium">Optimal Range</div>
                  <div className="bg-orange-500 text-white text-center p-2 rounded text-sm font-medium">Average Range</div>
                  <div className="bg-red-500 text-white text-center p-2 rounded text-sm font-medium">Needs Attention</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">42.3</div>
                  <div className="text-sm text-gray-600">Biological Age</div>
                  <div className="text-xs text-gray-500 mt-1">7 years younger than your chronological age</div>
                </div>
              </div>
            </Card>
          </motion.div>
          {/* Key Biomarkers */}
          <motion.div variants={fadeUpVariant}>
            <Card className="bg-white p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Key Biomarkers
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">VO2 max</span>
                  <span className="text-sm font-medium text-green-600">50 ng/mL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Glucose Fasted</span>
                  <span className="text-sm font-medium">85 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hemoglobin</span>
                  <span className="text-sm font-medium">14.2 g/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Testosterone</span>
                  <span className="text-sm font-medium text-red-600">320 ng/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Thyroid TSH</span>
                  <span className="text-sm font-medium">2.1 μIU/mL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Magnesium</span>
                  <span className="text-sm font-medium text-orange-600">1.8 mg/dL</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Biomarkers Progress Over Time Chart */}
        <motion.div variants={slideLeftVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Biomarkers Progress Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />

                  <Bar
                    dataKey="value"
                    // Dynamically set color based on type
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label={false}
                    shape={(props: any) => {
                      const { x, y, width, height, payload } = props
                      return <rect x={x} y={y} width={width} height={height} fill={COLORS[payload.type as BiomarkerType]} ry={4} />
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Optimal Range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Average Range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Needs Attention</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-green-50 border border-green-200 p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">89</div>
            <div className="text-xs sm:text-sm text-green-700">Total biomarkers in optimal range</div>
          </Card>
          <Card className="bg-orange-50 border border-orange-200 p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">11</div>
            <div className="text-xs sm:text-sm text-orange-700">Average Range biomarkers requiring attention</div>
          </Card>
          <Card className="bg-blue-50 border border-blue-200 p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-xs sm:text-sm text-blue-700">Biomarkers showing improvement this quarter</div>
          </Card>
        </div>
        <div className='mx-auto mt-10 text-center'>
        <Link href='/'>
          <Button size="lg" className="bg-white text-black hover:bg-white/90 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto hover:scale-105 transition-transform duration-300">
            Start Your Journey <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
        </div>
      </div>
    </section>
  )
}
