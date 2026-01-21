import { TApiBase } from '@/types'

export type WaitlistDTO = TApiBase & {
  subscription_type: string
  email: string
  created_at?: string
}
