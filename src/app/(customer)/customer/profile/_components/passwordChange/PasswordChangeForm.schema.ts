import { z } from "zod"

export const passSchema = z
  .object({
    current_password: z.string().min(8, "Current password is required"),
    new_password: z.string().min(8, "New password must be at least 8 characters"),
    confirm_new_password: z.string().min(8),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  })

export type TSchema = z.infer<typeof passSchema>
