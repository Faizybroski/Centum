import { useMemo } from 'react'
import { HealthReportDetail } from '@/dto'

export function useBiomarkerArrays(reportData: HealthReportDetail | undefined) {
  if (!reportData) return { normalBiomarkers: [], criticalBiomarkers: [], goodBiomarkers: [], invalidBiomarkers: [] }

  const normalBiomarkers = useMemo(() => {
    return convertBiomarkers(reportData?.normal_biomarkers || {})
  }, [reportData?.normal_biomarkers])

  const criticalBiomarkers = useMemo(() => {
    return convertBiomarkers(reportData?.critical_biomarkers || {})
  }, [reportData?.critical_biomarkers])

  const goodBiomarkers = useMemo(() => {
    return convertBiomarkers(reportData?.good_biomarkers || {})
  }, [reportData?.good_biomarkers])

  const invalidBiomarkers = useMemo(() => {
    return convertBiomarkers(reportData?.invalid_biomarkers || {})
  }, [reportData?.invalid_biomarkers])

  return { normalBiomarkers, criticalBiomarkers, goodBiomarkers, invalidBiomarkers }
}

function convertBiomarkers(obj: Record<string, any>) {
  return Object.entries(obj).map(([key, value]) => ({
    ...value,
  }))
}
