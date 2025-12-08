import { TApiBase } from '@/types'

export type UserDTO = TApiBase & {
  full_name: string
  date_of_birth: string
  gender: string
  email: string
  phone_number: string
  role: string
  id: string
  is_health_assessment_complete: boolean
  is_newsletter_subscribed: boolean
  created_at?: string
  individual_reference_number?: string
  madicare_card_number?: string
  madicare_expiry_date?: string
}
