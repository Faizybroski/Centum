import { z } from 'zod'
import { FAQ_CATEGORIES } from '@/constants/faqCategories'

export const faqSchema = z.object({
  category: z.enum(FAQ_CATEGORIES, {
    errorMap: () => ({ message: 'Category is required' }),
  }),
  question: z.string().min(5, 'Question is too short'),
  answer: z.string().min(10, 'Answer is too short'),
})

export type TSchema = z.infer<typeof faqSchema>
