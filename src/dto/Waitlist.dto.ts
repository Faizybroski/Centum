import { TApiBase } from '@/types'

export type WaitlistDTO = TApiBase & {
  subscription_type: string
  _id: string
  email: string
  questionnaire?: any
  created_at?: string
}

export const HEALTH_GOAL_LABELS: Record<string, string> = {
  athletic: 'Optimize athletic performance',
  chronic: 'Manage chronic condition',
  proactive: 'Proactive monitoring',
  weight: 'Weight management',
  sleep: 'Improve energy / sleep',
  other: 'Other',
}

export const FEATURE_LABELS: Record<string, string> = {
  biomarkers: 'Personalized biomarker insights',
  wearables: 'Wearable integrations',
  ai_recommendations: 'AI recommendations',
  secure_storage: 'Secure data sharing',
  education: 'Educational content',
  progress_tracking: 'Progress tracking',
  addon_tests: 'Add-on tests',
}

export const PRICING_LABELS: Record<string, string> = {
  '40_60': '$40 – $60',
  '60_80': '$60 – $80',
  '80_100': '$80 – $100',
  '100_plus': 'More than $100',
  not_sure: 'Not sure yet',
}

export const TRACKING_LABELS: Record<string, string> = {
  manually: 'Manually (journal / spreadsheet)',
  wearable: 'Wearable device',
  apps: 'Other health apps',
  doctor_only: "Doctor's visits / lab tests only",
  none: 'Not currently tracking',
}

export const NA = 'Not provided'
