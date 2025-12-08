import '@/lib/zod'
import z from 'zod'
import { charLimitMax_50, charLimitMin_1 } from '@/utils/constantMessage.utils'

export const schema = z.object({
  email: z.string().min(charLimitMin_1).max(charLimitMax_50).email(),
})

export type TSchema = z.infer<typeof schema>
