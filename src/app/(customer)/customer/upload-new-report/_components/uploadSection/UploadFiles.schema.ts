import * as z from 'zod'
import { pdfFileValidator } from '@/utils/zodValidation'
import { charLimitMax_50, charLimitMin_1 } from '@/utils/constantMessage.utils'

export const schema = z.object({
  reportTitle: z.string().trim().min(charLimitMin_1, "Title is required").max(charLimitMax_50),
  reportDate: z.date(),
  reportCategory: z.string().min(1, "Category is required"),
  reportNotes: z.string().optional(),
  file: pdfFileValidator(),
})

export type TSchema = z.infer<typeof schema>
