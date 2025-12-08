import { StringValidation } from 'zod'

export type Biomarker = {
  name: string
  value: number | string
  unit: string
  reference_range: string
  description?: string
  reason?: string
  expected_unit?: string
}

export type BiomarkerType = 'good' | 'normal' | 'critical' | 'invalid'
