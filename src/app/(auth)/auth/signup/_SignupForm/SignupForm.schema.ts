import { z } from 'zod'
import '@/lib/zod'
import { australianPhoneValidator } from '@/utils/zodValidation'
import { passwordComplexity, realisticDateValidator } from '@/utils/zodValidation'
import { charLimitMax_50, charLimitMax_75, charLimitMin_1, messages } from '@/utils/constantMessage.utils'

export const schema = z.object({
  full_name: z.string().trim().min(charLimitMin_1).max(charLimitMax_75),
  email: z.string().trim().min(charLimitMin_1).max(charLimitMax_50).email(),
  phone_number: australianPhoneValidator(),
  password: passwordComplexity(),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: messages.required }),
  date_of_birth: realisticDateValidator({
    invalidMessage: messages.invalidDate,
  }),
  beta_code: z
    .string()
    .trim()
    .min(1)
    .refine((value) => value === process.env.NEXT_PUBLIC_BETA_CODE, { message: 'Invalid BETA CODE' }),
})

export type TSchema = z.infer<typeof schema>
