// Types for the API-driven form
export type Field = {
  label: string
  key: string
  type: string
  placeholder?: string
  options?: string[]
  answer?: any // Optional, for prefilled answer from API
}

export type Section = {
  title: string
  sequence: number
  fields: Field[]
}

export type FormDef = {
  form: boolean
  form_title: string
  form_description?: string
  sections: Section[]
}

export type AssessmentFormProps = {
  formDef: FormDef
  onFormChange?: (formData: Record<string, any>) => void
  step?: number
}

export type FieldRendererProps = {
  field: Field
  isConsentStep?: boolean
  value?: any
  onChange?: (key: string, value: any) => void
  methods: any
}
