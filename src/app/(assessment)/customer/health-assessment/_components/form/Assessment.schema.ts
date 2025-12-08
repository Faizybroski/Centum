import { z } from 'zod'
import { conditionalRequiredMap } from './AssessmentForm.config'

export function buildZodSchemaFromFormDef(formDef: any, step: number | undefined) {
  const shape: Record<string, z.ZodTypeAny> = {}

  formDef.sections.forEach((section: any) => {
    section.fields.forEach((field: any) => {
      const key = field.key
      const baseMessage = `${field.label || key} is required`
      let rule: z.ZodTypeAny = z.any()

      const isDependentField = Object.values(conditionalRequiredMap).some(({ dependentKey }) => dependentKey === key)

      switch (field.type) {
        case 'text':
          if (field.key === 'physician_phone') {
            rule = z.string().regex(/^0\d{9}$/, { message: 'Enter a valid Australian phone number' })
          } else if (field.key === 'cigarettes_per_day' || field.key === 'nap_duration_minutes') {
            rule = z.string().optional()
          } else {
            rule = z.string().min(1, baseMessage)
          }
          break

        case 'textarea':
        case 'dropdown':
        case 'radio':
          rule = isDependentField ? z.string().optional() : z.string().min(1, baseMessage)
          break

        case 'checkbox_group': {
          rule = z.array(z.string()).min(1, baseMessage)
          const options: string[] | undefined = field.options

          if (options && options.includes('Other')) {
            shape[`${key}_other_text`] = z
              .string()
              .optional()
              .superRefine((val, ctx) => {
                const data = (ctx as any).parent as Record<string, any>
                const selectedArr: string[] = data?.[key] || []

                if (selectedArr.includes('Other') && !val?.trim()) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Please specify',
                  })
                }
              })
          }
          break
        }

        default:
          rule = z.any()
      }

      shape[key] = rule
    })
  })

  return z.object(shape)

  //Note : dont remove below lines

  // return z.object(shape).superRefine((data, ctx) => {
  //   Object.entries(conditionalRequiredMap).forEach(([conditionKey, { dependentKey, step: requiredStep, conditionValue }]) => {
  //     if (step !== requiredStep) return

  //     const userValue = data?.[conditionKey]
  //     const dependentValue = data?.[dependentKey]

  //     if (userValue === conditionValue && (!dependentValue || dependentValue.trim?.() === '')) {
  //       ctx.addIssue({
  //         path: [dependentKey],
  //         code: z.ZodIssueCode.custom,
  //         message: `If ${conditionValue}, description is required`,
  //       })
  //     }
  //   })
  // })
}
