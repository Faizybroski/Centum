'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { HealthReportDetail } from '@/dto'
import { getBiomarkerCount, getTotalBiomarkerCount } from '@/utils/biomakers.utils'
import { useBiomarkerArrays } from '@/hooks/biomakers/useBiomarkerArrays.hooks'
import { BiomarkerCard } from '../BiomarkerCard/BiomarkerCard.component'
import { GenerateIcon } from '@/components/GenerateIcon/GenerateIcon.component'
import { IconName } from 'lucide-react/dynamic'
import SectionSummary from '../sectionSummary/SectionSummary.component'

export default function ClinicalSummary({ reportData }: { reportData: HealthReportDetail }) {
  console.log(reportData)

  const bioMarkersOverview = [
    {
      label: 'Optimal Range',
      count: getBiomarkerCount(reportData?.good_biomarkers),
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      icon: 'circle-check',
    },
    {
      label: 'Average Range',
      count: getBiomarkerCount(reportData?.normal_biomarkers),
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      icon: 'triangle-alert',
    },
    {
      label: 'Needs Attention',
      count: getBiomarkerCount(reportData?.critical_biomarkers),
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      icon: 'triangle-alert',
    },
  ]

  const { normalBiomarkers, criticalBiomarkers, goodBiomarkers, invalidBiomarkers } = useBiomarkerArrays(reportData)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Clinical Summary */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Clinical Summary</h4>
            <div className="p-4 bg-blue-50 rounded-lg flex flex-col gap-4 overflow-y-auto max-h-60">
              {reportData?.summary && <div className="text-sm text-blue-700 space-y-2 font-medium">{reportData?.summary}</div>}

              {reportData?.section_summary && <SectionSummary data={reportData?.section_summary} />}

              {/* Critical Concerns */}
              {reportData?.critical_concerns &&
                reportData?.critical_concerns?.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-600">
                      {index + 1}. {item}
                    </p>
                  </div>
                ))}

              {/* <div className="flex flex-col gap-4">
                {extractBiomarkerMakeSummary(reportData?.critical_biomarkers).map((item, index) => (
                  <div key={index}>
                    <p className={`text-sm font-medium text-gray-800 mb-2 ${item.title}`}>{item.title}</p>
                    <p className={`text-sm font-normal text-gray-600 ${item.description}`}>{item.description}</p>
                    <p className={`text-sm font-normal text-gray-600 ${item.recommendation}`}>{item.recommendation}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* Biomarkers Distribution Overview */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Biomarkers Overview</h4>
            <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
              {bioMarkersOverview.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg ${item.bgColor} border`}>
                  <div className="flex items-center gap-2 mb-2">
                    <GenerateIcon name={item.icon as IconName} className={`h-4 w-4 ${item.textColor}`} />
                    <span className={`text-sm font-medium ${item.textColor}`}>{item.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{item.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* All Biomarkers */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-900">All Biomarkers ({getTotalBiomarkerCount(reportData?.good_biomarkers, reportData?.normal_biomarkers, reportData?.critical_biomarkers)} total)</h5>
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {goodBiomarkers?.map((biomarker, index) => (
                <BiomarkerCard key={index} biomarker={biomarker} type="good" />
              ))}

              {normalBiomarkers?.map((biomarker, index) => (
                <BiomarkerCard key={index} biomarker={biomarker} type="normal" />
              ))}

              {criticalBiomarkers?.map((biomarker, index) => (
                <BiomarkerCard key={index} biomarker={biomarker} type="critical" />
              ))}
              {invalidBiomarkers?.map((biomarker, index) => (
                <BiomarkerCard key={index} biomarker={biomarker} type="invalid" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
