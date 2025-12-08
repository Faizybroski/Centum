export type Biomarker = {
  name: string
  value: number
  unit: string
  reference_range: string
}

export type LifestyleRecommendations = {
  diet: {
    do: string[]
    dont: string[]
    foods_to_limit?: string[]
    recommended_foods?: string[]
    recommended_exercises?: string[]
    activities_to_limit?: string[]
    recommended_sleep?: string[]
    sleep_hygiene_tips?: string[]
    recommended_supplements?: string[]
    supplements_to_limit?: string[]
    summary: string
    why_this_matters_for_you: string
  }
  exercise: {
    do: string[]
    dont: string[]
    foods_to_limit?: string[]
    recommended_foods?: string[]
    recommended_exercises?: string[]
    activities_to_limit?: string[]
    recommended_sleep?: string[]
    sleep_hygiene_tips?: string[]
    recommended_supplements?: string[]
    supplements_to_limit?: string[]
    summary: string
    why_this_matters_for_you: string
  }
  sleep: {
    do: string[]
    dont: string[]
    foods_to_limit?: string[]
    recommended_foods?: string[]
    recommended_exercises?: string[]
    activities_to_limit?: string[]
    recommended_sleep?: string[]
    sleep_hygiene_tips?: string[]
    recommended_supplements?: string[]
    supplements_to_limit?: string[]
    summary: string
    why_this_matters_for_you: string
  }
  supplement: {
    do: string[]
    dont: string[]
    foods_to_limit?: string[]
    recommended_foods?: string[]
    recommended_exercises?: string[]
    activities_to_limit?: string[]
    recommended_sleep?: string[]
    sleep_hygiene_tips?: string[]
    recommended_supplements?: string[]
    supplements_to_limit?: string[]
    summary: string
    why_this_matters_for_you: string
  }
}

export type HealthReportDetail = {
  report_title: string
  status: string
  critical_biomarkers: Record<string, Biomarker>
  good_biomarkers: Record<string, Biomarker>
  normal_biomarkers: Record<string, Biomarker>
  critical_concerns: string[]
  invalid_biomarkers: Record<string, Biomarker>
  lifestyle_recommendations: LifestyleRecommendations
  health_score: number
  summary: string
  id: string
  documents: string[]
  processed_at: string
  section_summary?: Record<
    string,
    {
      findings: string
      interpretation: string
    }
  >
  uploaded_documents?: { file_path: string; file_name: string }[]
}

export type FailedReportDTO = {
  report_title: string
  status: string
  id: string
  updated_at: string
  user_name: string
  email: string
  gender: string
  phone_number: string
  date_of_birth: string
}
