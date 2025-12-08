import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function HowToCompareReports() {
  return (
    <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">How to Compare Reports</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 hover:shadow-orange-100">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white bg-orange-400 font-bold transition-all duration-300 hover:bg-orange-600 hover:scale-110">1</div>
            <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 hover:text-primary">Select Reports</h3>
            <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-700">Click on any two reports you want to compare</p>
          </CardContent>
        </Card>

        <Card className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 hover:shadow-green-100">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold transition-all duration-300 hover:bg-green-500 hover:scale-110">2</div>
            <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 hover:text-green-600">Compare</h3>
            <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-700">Click the compare button to view side-by-side analysis</p>
          </CardContent>
        </Card>

        <Card className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 hover:shadow-purple-100">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold transition-all duration-300 hover:bg-purple-500 hover:scale-110">3</div>
            <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 hover:text-purple-600">Insights</h3>
            <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-700">Get detailed analytics and trend information</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
