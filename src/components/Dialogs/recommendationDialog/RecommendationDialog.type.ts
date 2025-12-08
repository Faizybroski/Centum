export type RecommendationDialogProps = {
  open: boolean
  setOpen: (val: boolean) => void
  title: string
  icon: React.ReactNode
  summary?: string
  whyThisMattersForYou?: string
  positiveTitle: string
  negativeTitle: string
  positives: string[]
  negatives: string[]
  positiveColor?: 'green' | 'blue' | 'purple' | 'orange'
  foodsToLimit?: string[]
  recommendedFoods?: string[]
  recommendedExercises?: string[]
  activitiesToLimit?: string[]
  recommendedSleep?: string[]
  sleepHygieneTips?: string[]
  recommendedSupplements?: string[]
  supplementsToLimit?: string[]
}
