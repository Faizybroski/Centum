export const steps = [
  { id: 1, label: 'Medical' },
  { id: 2, label: 'Lifestyle' },
  { id: 3, label: 'Goals' },
  { id: 4, label: 'Consent' },
]

export type Step = (typeof steps)[number]

export const conditionalFieldPairs: {
  dropdownKey: string
  textareaKey: string
  step: number
}[] = [
  {
    dropdownKey: 'dietary_restrictions',
    textareaKey: 'dietary_restrictions_details',
    step: 1,
  },
  {
    dropdownKey: 'consumes_processed_sugar',
    textareaKey: 'processed_sugar_details',
    step: 1,
  },
  {
    dropdownKey: 'smokes',
    textareaKey: 'cigarettes_per_day',
    step: 1,
  },
  {
    dropdownKey: 'uses_recreational_drugs',
    textareaKey: 'recreational_drugs_details',
    step: 1,
  },
  {
    dropdownKey: 'vaccination_status',
    textareaKey: 'missing_vaccines',
    step: 0,
  },
]

export const conditionalRequiredMap: Record<string, { dependentKey: string; step: number; conditionValue: string }> = {
  dietary_restrictions: { dependentKey: 'dietary_restrictions_details', step: 1, conditionValue: 'Yes' },
  consumes_processed_sugar: { dependentKey: 'processed_sugar_details', step: 1, conditionValue: 'Yes' },
  smokes: { dependentKey: 'cigarettes_per_day', step: 1, conditionValue: 'Yes' },
  uses_recreational_drugs: { dependentKey: 'recreational_drugs_details', step: 1, conditionValue: 'Yes' },
  vaccination_status: { dependentKey: 'missing_vaccines', step: 0, conditionValue: 'No' },
  take_nap_during_day: { dependentKey: 'nap_duration_minutes', step: 1, conditionValue: 'Yes' },
  sleep_disorder_diagnosed: { dependentKey: 'sleep_disorder_details', step: 1, conditionValue: 'Yes' },
}
