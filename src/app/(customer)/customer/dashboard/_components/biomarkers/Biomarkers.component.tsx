import React, { useState } from 'react'
import BiomarkerRange from './components/BioMakersRange.component'
import BioMakersHeader from './components/BioMakersHeader.component'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserDashboardDTO } from '@/dto/userDashboard.dto'
import { getBiomarkerCount } from '@/utils/biomakers.utils'
import { getTotalBiomarkerCount } from '@/utils/biomakers.utils'
import { useBiomarkerPercentage } from '../../../../../../hooks/biomakers/useBiomarkerPercentage.hook'
import ViewBioMakersDialog from '@/components/Dialogs/viewBioMakersDialog/ViewBioMakersDialog.component'

export default function Biomarkers({ data }: { data: UserDashboardDTO | undefined }) {
  const [viewAllBioMakersOpen, setViewAllBioMakersOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState<'critical_biomarkers' | 'good_biomarkers' | 'normal_biomarkers' | 'all' | null>('good_biomarkers')

  const percentages = useBiomarkerPercentage({
    critical_biomarkers: data?.critical_biomarkers,
    good_biomarkers: data?.good_biomarkers,
    normal_biomarkers: data?.normal_biomarkers,
  })

  const handleBiomarkerRange = (key: 'good_biomarkers' | 'normal_biomarkers' | 'critical_biomarkers' | 'all') => {
    setSelectedKey(key)
    setViewAllBioMakersOpen(true)
  }

  const handleViewAllBiomarkers = (key: 'good_biomarkers' | 'normal_biomarkers' | 'critical_biomarkers' | 'all') => {
    setSelectedKey(key)
    setViewAllBioMakersOpen(true)
  }

  return (
    <div className="lg:col-span-4">
      <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-6 relative">
          {/* <BioMakersHeader totalMarkers={getTotalBiomarkerCount(data?.good_biomarkers, data?.normal_biomarkers, data?.critical_biomarkers)} percentage={percentages?.good || 0} /> */}
          <BioMakersHeader />

          <div className='flex flex-col mb-5 space-y-1'>
            <span className='text-2xl font-bold'>
              {percentages?.good}%
            </span>
            <span className='text-sm font-medium text-gray-700'>
              Optimal Range
            </span>
          </div>

          <BiomarkerRange label="Optimal Range" value={getBiomarkerCount(data?.good_biomarkers)} percentage={percentages?.good || 0} category="good" onClick={() => handleBiomarkerRange('good_biomarkers')} />
          <BiomarkerRange
            label="Average Range"
            value={getBiomarkerCount(data?.normal_biomarkers)}
            percentage={percentages?.normal || 0}
            category="average"
            delay={200}
            onClick={() => handleBiomarkerRange('normal_biomarkers')}
          />
          <BiomarkerRange
            label="Needs Attention"
            value={getBiomarkerCount(data?.critical_biomarkers)}
            percentage={percentages?.critical || 0}
            category="bad"
            delay={400}
            onClick={() => handleBiomarkerRange('critical_biomarkers')}
          />

          {/* View All Button */}
          <div className="mt-4 pt-4">
            <Button variant="ghost" size="sm" className="w-full rounded-lg bg-gray-100 border border-gray-200 text-sm font-medium text-gray-700 hover:text-primary/70 hover:bg-primary/10" onClick={() => handleViewAllBiomarkers('all')}>
              View All Biomarkers
            </Button>
          </div>
        </CardContent>
      </Card>

      <ViewBioMakersDialog data={data} showViewBioMakersOpen={viewAllBioMakersOpen} setShowViewBioMakersOpen={setViewAllBioMakersOpen} selectedKey={selectedKey} />
    </div>
  )
}
