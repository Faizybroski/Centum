import '@/lib/zod'
import { z } from 'zod'
import { realisticDateValidator, australianPhoneValidator, medicareIRNValidator, medicareCardNumberValidator, medicareExpiryValidator } from '@/utils/zodValidation'
import { charLimitMax_50, charLimitMax_75, charLimitMin_1, messages } from '@/utils/constantMessage.utils'

export const schema = z.object({
  full_name: z.string().trim().min(charLimitMin_1).max(charLimitMax_75),
  email: z.string().trim().min(charLimitMin_1).max(charLimitMax_50).email(),
  phone_number: australianPhoneValidator(),
  gender: z.string().min(charLimitMin_1).max(charLimitMax_50),
  date_of_birth: realisticDateValidator({
    invalidMessage: messages.invalidDate,
  }),
  individual_reference_number: medicareIRNValidator(),
  madicare_card_number: medicareCardNumberValidator(),
  madicare_expiry_date: medicareExpiryValidator({
    invalidMessage: 'Invalid Medicare expiry date (MM/YYYY format)',
    requiredMessage: 'Medicare expiry date is required',
  }),
})

export type TSchema = z.infer<typeof schema>
