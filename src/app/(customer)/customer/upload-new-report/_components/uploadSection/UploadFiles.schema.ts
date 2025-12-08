import * as z from 'zod'
import { pdfFileValidator } from '@/utils/zodValidation'
import { charLimitMax_50, charLimitMin_1 } from '@/utils/constantMessage.utils'

export const schema = z.object({
  reportTitle: z.string().trim().min(charLimitMin_1).max(charLimitMax_50),
  file: pdfFileValidator(),
})

export type TSchema = z.infer<typeof schema>
