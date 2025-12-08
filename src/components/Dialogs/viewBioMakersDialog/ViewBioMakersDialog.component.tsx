import React from 'react'
import { TestTube } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ViewBioMakersDialogProps } from './ViewBiomakersDialog.type'
import { useBiomarkerArrays } from '@/hooks/biomakers/useBiomarkerArrays.hooks'
import { Biomarker } from '@/components/reportSummary/BiomarkerCard/BiomarkerCard.type'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import BioMakersBadge from '@/components/statusBadge/BioMakersBadge.component'
import { getBioMakersTextColor } from '@/utils/biomakers.utils'

export default function ViewBioMakersDialog({ showViewBioMakersOpen, setShowViewBioMakersOpen, selectedKey, data }: ViewBioMakersDialogProps) {
  const { normalBiomarkers, criticalBiomarkers, goodBiomarkers } = useBiomarkerArrays(data)

  // Map key to actual category and data
  const getSelectedBiomarkers = () => {
    switch (selectedKey) {
      case 'good_biomarkers':
        return { data: goodBiomarkers }
      case 'normal_biomarkers':
        return { data: normalBiomarkers }
      case 'critical_biomarkers':
        return { data: criticalBiomarkers }
      default:
        return {
          data: [...goodBiomarkers, ...normalBiomarkers, ...criticalBiomarkers],
        }
    }
  }

  function getBiomarkerLabel(key: 'good_biomarkers' | 'normal_biomarkers' | 'critical_biomarkers' | 'all'): string {
    const biomarkerMap: Record<'good_biomarkers' | 'normal_biomarkers' | 'critical_biomarkers' | 'all', string> = {
      good_biomarkers: 'Optimal Biomarkers',
      normal_biomarkers: 'Average Biomarkers',
      critical_biomarkers: 'Needs Attention',
      all: 'All Biomarkers',
    }

    return biomarkerMap[key] || ''
  }

  const { data: selectedBiomarkers } = getSelectedBiomarkers()

  return (
    <Dialog open={showViewBioMakersOpen} onOpenChange={setShowViewBioMakersOpen}>
      <DialogContent className="max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            {selectedKey ? getBiomarkerLabel(selectedKey) : 'All Biomarkers'}
            <Badge variant="outline" className="ml-2">
              {selectedBiomarkers.length} markers
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedBiomarkers.map((biomarker: Biomarker) => {
                const thisCategory = goodBiomarkers.includes(biomarker) ? 'Optimal' : normalBiomarkers.includes(biomarker) ? 'Average' : criticalBiomarkers.includes(biomarker) ? 'Needs Attention' : 'Unknown'

                return (
                  <Card key={biomarker.name} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{biomarker?.name}</h4>
                        <BioMakersBadge status={thisCategory} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current Value:</span>
                          <span className={`font-semibold ${getBioMakersTextColor(thisCategory)}`}>
                            {biomarker?.value} {biomarker?.unit}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">OPTIMAL RANGE : {biomarker?.reference_range}</div>
                        <div className="text-xs text-gray-400">{biomarker?.description || ''}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedBiomarkers?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <TestTube className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No biomarkers found</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
