import { BiomarkerObject } from '@/components/reportSummary/clinicalSummary/ClinicalSummary.type'

type BiomarkerData = {
  critical_biomarkers?: BiomarkerObject
  good_biomarkers?: BiomarkerObject
  normal_biomarkers?: BiomarkerObject
}

type BiomarkerPercentages = {
  critical: number
  good: number
  normal: number
  total: number
}

export type { BiomarkerData, BiomarkerPercentages }
