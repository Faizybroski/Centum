import { Biomarker } from '@/dto'

export type BiomarkerData = Record<string, Biomarker>

export type OutputItem = {
  title: string
  description: string
  recommendation: string
}

export type BiomarkerObject = Record<string, Biomarker>
