import '@/lib/zod'
import { z } from 'zod'
import { passwordComplexity } from '@/utils/zodValidation'

export const schema = z
  .object({
    password: passwordComplexity(),
    confirmPassword: passwordComplexity(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm Password does not match the New Password. Please re-enter.',
    path: ['confirmPassword'], // error confirmPassword field par dikhega
  })

export type TSchema = z.infer<typeof schema>
