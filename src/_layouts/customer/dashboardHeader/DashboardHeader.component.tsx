import React from 'react'
import { motion } from 'framer-motion'

export default function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 sm:mb-8 text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{title}</h1>
      {subtitle && <p className="text-base sm:text-lg lg:text-xl text-gray-600">{subtitle}</p>}
    </motion.div>
  )
}
