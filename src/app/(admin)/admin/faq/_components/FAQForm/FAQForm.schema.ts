import '@/lib/zod'
import { z } from 'zod'
import { charLimitMin_10, charLimitMin_15, charLimitMax_100, charLimitMax_255, messages } from '@/utils/constantMessage.utils'

export const faqSchema = z.object({
  question: z.string().trim().min(charLimitMin_10, messages.required).max(charLimitMax_100, messages.invalidType),

  answer: z.string().trim().min(charLimitMin_15, messages.required).max(charLimitMax_255, messages.invalidType),
})

export type TSchema = z.infer<typeof faqSchema>
