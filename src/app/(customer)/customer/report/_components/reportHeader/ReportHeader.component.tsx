import React from 'react'
import { motion } from 'framer-motion'
import { FileStatusType } from '@/types'
import { FileTypeStatusBadge } from '@/components/statusBadge/FileTypeStatusBadge.component'

export default function ReportHeader({ report_title, report_date, report_status, report_notes, report_category }: { report_title: string; report_date: string; report_status: string; report_notes?: string; report_category?: string }) {
  return (
    // <motion.div className="bg-white rounded-lg shadow-sm border p-6 mb-6 " initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    //   <div className="flex items-start justify-between">
    //     <div>
    //       <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{report_title || 'Report Title'}</h1>
    //       <p className="text-gray-600 mb-4">Comprehensive Blood Panel</p>
    //       <div className="flex items-center gap-4 text-sm text-gray-500">
    //         <span>Report Uploaded Date: {report_date}</span>
    //         <FileTypeStatusBadge status={report_status as FileStatusType} />
    //       </div>
    //     </div>
    //   </div>
    // </motion.div>
    <motion.div
      className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-4">
        {/* Title + Status */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
              {report_title || 'Untitled Report'}
            </h1>

            {report_category && (
              <p className="text-sm text-gray-500 mt-1 capitalize">
                {report_category}
              </p>
            )}
          </div>

          <FileTypeStatusBadge status={report_status as FileStatusType} />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <span className="whitespace-nowrap">
            Uploaded on: {report_date}
          </span>
        </div>

        {/* Notes (optional, long-safe) */}
        {report_notes && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Notes
            </p>
            <p className="text-sm text-gray-600 leading-relaxed break-words max-h-32 overflow-y-auto pr-1">
              {report_notes}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
