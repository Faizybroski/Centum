import React from 'react'
import { Badge } from '../ui/badge'
import { getBioMakersCategoryColor } from '@/utils/biomakers.utils'

type BioMakersBadgeProps = {
  status: string
}

export default function BioMakersBadge({ status }: BioMakersBadgeProps) {
  return (
    <div>
      <Badge variant="outline" className={`capitalize ml-2 ${getBioMakersCategoryColor(status)}`}>
        {status}
      </Badge>
    </div>
  )
}
