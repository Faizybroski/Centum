'use client'

import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import React from 'react'
import { Biomarker, BiomarkerType } from './BiomarkerCard.type'

const config = {
  good: {
    icon: <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />,
    bg: 'bg-green-50',
    title: 'text-green-800 font-medium',
    subtitle: 'text-green-600',
    description: 'text-green-600',
    badge: 'bg-green-100 text-green-800',
    label: 'Optimal',
  },
  normal: {
    icon: <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />,
    bg: 'bg-orange-50',
    title: 'text-orange-800 font-medium',
    subtitle: 'text-orange-600',
    description: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-800',
    label: 'Average',
  },
  critical: {
    icon: <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />,
    bg: 'bg-red-50',
    title: 'text-red-800 font-medium',
    subtitle: 'text-red-600',
    description: 'text-red-600',
    badge: 'bg-red-100 text-red-800',
    label: 'Needs Attention',
  },
  invalid: {
    icon: <AlertTriangle className="h-4 w-4 text-gray-600 flex-shrink-0" />,
    bg: 'bg-gray-50',
    title: 'text-gray-800 font-medium',
    subtitle: 'text-gray-600',
    description: 'text-gray-600',
    badge: 'bg-gray-100 text-gray-800',
    label: 'Invalid',
  },
} as const

export function BiomarkerCard({ biomarker, type }: { biomarker: Biomarker; type: BiomarkerType }) {
  const style = config[type]

  return (
    <div
      className={`
      flex items-center gap-3 p-3 rounded-lg ${style.bg}
      max-[340px]:flex-col max-[340px]:items-start
    `}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span>{style.icon}</span>
          <span className={`font-medium text-sm ${style.title}`}>{biomarker?.name}</span>
        </div>

        <div className={`text-xs ${style.subtitle}`}>
          {biomarker?.value} {biomarker?.unit} (Normal: {biomarker?.reference_range})
        </div>
        {biomarker?.expected_unit && <div className={`text-xs ${style.subtitle}`}>Expected Unit: {biomarker.expected_unit}</div>}
        <p className={`text-xs my-2 ${style.description}`}>{biomarker?.description || ''}</p>
        {biomarker?.reason && <p className={`text-xs mt-1 ${style.description} font-medium`}>Reason: {biomarker.reason}</p>}
      </div>

      <div className="max-[340px]:mt-2">
        <Badge className={`text-xs ${style.badge}`}>{style.label}</Badge>
      </div>
    </div>
  )
}
