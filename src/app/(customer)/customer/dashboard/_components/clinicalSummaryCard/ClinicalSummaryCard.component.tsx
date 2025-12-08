'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SectionSummary from '@/components/reportSummary/sectionSummary/SectionSummary.component'

export default function ClinicalSummaryCard({ summary, critical_concerns, section_summary }: { summary: string; critical_concerns: string[]; section_summary: any }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div className="mb-6 sm:mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, type: 'keyframes', stiffness: 500 }}>
      {summary && (
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold mb-1">Clinical Summary</h3>
            <div className="text-sm leading-relaxed">
              <p>{summary}</p>

              <div className="flex justify-center mt-4">
                <button className="cursor-pointer px-6 py-2 rounded-lg bg-white text-black" onClick={() => setIsExpanded(true)}>
                  View Details
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Clinical Summary</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground mt-2">{summary}</div>

          {section_summary && <SectionSummary data={section_summary} />}

          {/* Critical Concerns */}
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-700">Critical Concerns</h3>
            <div className="flex flex-col justify-center gap-2">
              {critical_concerns?.length > 0 &&
                critical_concerns?.map((item, index) => (
                  <p className="text-sm text-muted-foreground" key={index}>
                    {index + 1}. {item}
                  </p>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
