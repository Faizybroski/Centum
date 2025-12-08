import React from 'react'
import { motion } from 'framer-motion'
import { FileStatusType } from '@/types'
import { FileTypeStatusBadge } from '@/components/statusBadge/FileTypeStatusBadge.component'

export default function ReportHeader({ report_title, report_date, report_status }: { report_title: string; report_date: string; report_status: string }) {
  return (
    <motion.div className="bg-white rounded-lg shadow-sm border p-6 mb-6 " initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{report_title || 'Report Title'}</h1>
          <p className="text-gray-600 mb-4">Comprehensive Blood Panel</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Report Uploaded Date: {report_date}</span>
            <FileTypeStatusBadge status={report_status as FileStatusType} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
