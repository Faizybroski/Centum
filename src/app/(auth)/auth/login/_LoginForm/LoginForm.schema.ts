import '@/lib/zod'
import { z } from 'zod'

export const schema = z.object({
  email: z.string().trim().min(1).max(50).email(),
  password: z.string().trim().min(6).max(50),
})

export type TSchema = z.infer<typeof schema>
