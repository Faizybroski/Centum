import { useCallback } from 'react'
import { BiomarkerData, BiomarkerPercentages } from './BiomarkerPercentage.type'

export function useBiomarkerPercentage({ critical_biomarkers = {}, good_biomarkers = {}, normal_biomarkers = {} }: BiomarkerData): BiomarkerPercentages {
  const calculatePercentages = useCallback((): BiomarkerPercentages => {
    const criticalCount = Object.keys(critical_biomarkers).length
    const goodCount = Object.keys(good_biomarkers).length
    const normalCount = Object.keys(normal_biomarkers).length

    const total = criticalCount + goodCount + normalCount

    const toPercent = (count: number) => (total > 0 ? parseFloat(((count / total) * 100).toFixed(2)) : 0)

    return {
      critical: toPercent(criticalCount),
      good: toPercent(goodCount),
      normal: toPercent(normalCount),
      total,
    }
  }, [critical_biomarkers, good_biomarkers, normal_biomarkers])

  return calculatePercentages()
}
