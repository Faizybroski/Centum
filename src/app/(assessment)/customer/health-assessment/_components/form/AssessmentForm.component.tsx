'use client'
import React, { useEffect, useMemo } from 'react'
import { useForm, FormProvider, useFormContext, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildZodSchemaFromFormDef } from './Assessment.schema'
import { GenerateIcon } from '@/components/GenerateIcon/GenerateIcon.component'
import { AssessmentFormProps, FieldRendererProps } from './AssementForm.type'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { conditionalRequiredMap } from './AssessmentForm.config'
import BmiInfoTooltip from '@/components/bmiInfo/BmiInfoTooltip.component'

export default function AssessmentForm({ formDef, onFormChange, step, formMethodsRef }: AssessmentFormProps & { formMethodsRef?: React.MutableRefObject<any> }) {
  let actualFormDef = formDef

  if (!actualFormDef.sections && actualFormDef.form && typeof actualFormDef.form === 'object' && Array.isArray((actualFormDef.form as any).sections)) {
    actualFormDef = actualFormDef.form
  }
  if (!actualFormDef || !Array.isArray(actualFormDef.sections)) return null

  const buildDefaultValues = (formDef: any) => {
    return formDef.sections.reduce((acc: any, section: any) => {
      section.fields.forEach((field: any) => {
        const answer = field.answer
        switch (field.type) {
          case 'dropdown':
            acc[field.key] = typeof answer === 'string' ? answer : ''
            break
          case 'checkbox_group':
            acc[field.key] = Array.isArray(answer) ? answer : []

            if (Array.isArray(answer) && answer.includes('Other')) {
              const otherTextKey = `${field.key}_other_text`
              acc[otherTextKey] = field[otherTextKey] ?? ''
            }
            break
          case 'checkbox':
            acc[field.key] = !!answer
            break
          case 'number':
            acc[field.key] = answer?.toString() ?? ''
            break
          default:
            acc[field.key] = answer ?? ''
        }
      })
      return acc
    }, {})
  }

  const defaultValues = useMemo(() => buildDefaultValues(actualFormDef), [actualFormDef])

  // const schema = buildZodSchemaFromFormDef(actualFormDef, step)
  const schema = useMemo(() => buildZodSchemaFromFormDef(actualFormDef, step), [actualFormDef, step])
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',

    defaultValues,
  })

  useEffect(() => {
    const newDefaultValues = buildDefaultValues(actualFormDef)
    methods.reset(newDefaultValues)
  }, [actualFormDef, step])

  useEffect(() => {
    if (formMethodsRef) {
      formMethodsRef.current = methods
    }
  }, [formMethodsRef, methods])

  useEffect(() => {
    if (!onFormChange) return
    const subscription = methods.watch((values) => {
      onFormChange(values)
    })
    return () => subscription.unsubscribe()
  }, [methods, onFormChange])

  return (
    <FormProvider {...methods}>
      <form className="space-y-8">
        {/* Card-style header with icon, title, and description */}
        <div className="flex items-start gap-3 my-6">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <GenerateIcon name="clipboard-plus" size={24} />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold tracking-tight text-xl">{actualFormDef.form_title}</h2>
            {actualFormDef.form_description && <div className="text-sm text-gray-600">{actualFormDef.form_description}</div>}
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto">
          {[...actualFormDef.sections]
            .sort((a, b) => a.sequence - b.sequence)
            .map((section, idx) => (
              <div key={section.sequence} className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                    {formDef.form_description && step === 3 && <span className="text-gray-600 text-base font-normal mt-0.5">{formDef.form_description}</span>}
                    {section.sequence === 1 && step !== 3 && formDef.form_description && <span className="text-gray-600 text-base font-normal mt-0.5">{formDef.form_description}</span>}
                  </div>
                </div>
                {step === 3 ? (
                  <div className="flex flex-col gap-4 mt-4">
                    {section.fields.map((field) => (
                      <div key={field.key} className="mb-0">
                        <FieldRenderer field={{ ...field, type: 'checkbox' }} isConsentStep={true} methods={methods} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {section.fields.map((field) => (
                      <div key={field.key} className={field.type === 'textarea' || field.type === 'checkbox_group' ? 'mb-2 min-w-0 break-words md:col-span-2' : 'mb-2 min-w-0 break-words'}>
                        <FieldRenderer field={field} isConsentStep={false} methods={methods} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </form>
    </FormProvider>
  )
}

function FieldRenderer({ field, isConsentStep = false }: FieldRendererProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()

  const value = useWatch({ name: field.key })
  const error = errors?.[field.key]?.message as string | undefined
  if (field.type === 'dropdown' && value === undefined) return null

  switch (field.type) {
    case 'text':
      if (field.key === 'cigarettes_per_day') {
        const smokes = useWatch({ name: 'smokes' })
        if (smokes !== 'Yes') return null
      }

      if (field.key === 'nap_duration_minutes') {
        const takeNap = useWatch({ name: 'take_nap_during_day' })
        if (takeNap !== 'Yes') return null
      }
      return (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
          <Input type="text" className="h-12 border-gray-200 focus:border-primary" placeholder={field.placeholder} {...register(field.key)} />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      )

    case 'textarea': {
      const {
        control,
        register,
        formState: { errors },
      } = useFormContext()

      const conditionalPair = Object.entries(conditionalRequiredMap).find(([, { dependentKey }]) => dependentKey === field.key)

      let shouldRender = true
      if (conditionalPair) {
        const [conditionKey, { conditionValue }] = conditionalPair
        const watchedValue = useWatch({ control, name: conditionKey })
        shouldRender = watchedValue === conditionValue
      }

      if (!shouldRender) return null
      const error = errors?.[field.key]?.message as string

      return (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
          <Textarea placeholder={field.placeholder} className="w-full" {...register(field.key)} />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      )
    }

    case 'radio':
      return (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
          <RadioGroup value={value || ''} onValueChange={(val) => setValue(field.key, val, { shouldValidate: true })} className="flex flex-wrap gap-4">
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.key}-${option}`} />
                <Label htmlFor={`${field.key}-${option}`} className="text-sm text-gray-700">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      )

    case 'number':
      return (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
          <Input type="number" className="h-12 border-gray-200 focus:border-primary" placeholder={field.placeholder} {...register(field.key, { valueAsNumber: true })} />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      )

    case 'dropdown':
      // Ensure value is a string and matches an option, else empty
      const dropdownValue = typeof value === 'string' && field.options?.includes(value) ? value : ''

      console.log(field, '<---------------------dropdownValue')

      return (
        <>
          <div className="space-y-1 ">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 justify-between">
              {field.label}
              {field.key === 'bmi_status' && <BmiInfoTooltip />}
            </label>
            <Select defaultValue={field.answer} value={dropdownValue} onValueChange={(val) => setValue(field.key, val, { shouldValidate: true })}>
              <SelectTrigger className="w-full h-12 border-gray-200 focus:border-primary">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        </>
      )

    case 'checkbox_group':
      const isOtherChecked = Array.isArray(value) && value.includes('Other')

      return (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {field.label}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {field.options?.map((option) => {
              const isChecked = Array.isArray(value) ? value.includes(option) : false
              return (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.key}-${option}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      let newValue = Array.isArray(value) ? [...value] : []
                      if (checked) {
                        newValue.push(option)
                      } else {
                        newValue = newValue.filter((v) => v !== option)
                      }
                      setValue(field.key, newValue, { shouldValidate: true })

                      // Clear the extra textarea when Other is unchecked
                      if (option === 'Other' && !checked) {
                        setValue(`${field.key}_other_text`, '', { shouldValidate: true })
                      }
                    }}
                  />
                  <Label htmlFor={`${field.key}-${option}`} className="text-sm text-gray-700 truncate">
                    {option}
                  </Label>
                </div>
              )
            })}
          </div>

          {isOtherChecked && (
            <div className="mt-2">
              <Textarea className="w-full h-24 border border-gray-300 rounded-md p-2" placeholder="Please specify" {...register(`${field.key}_other_text`)} />
              {errors?.[`${field.key}_other_text`] && <p className="text-xs text-red-500 mt-1">{errors?.[`${field.key}_other_text`]?.message as string}</p>}
            </div>
          )}

          {/* main checkbox group error */}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      )

    case 'checkbox':
      return (
        <div className="flex items-start space-x-2 mt-2">
          <Checkbox className="inline-block mt-1" id={field.key} checked={!!value} onCheckedChange={(checked) => setValue(field.key, checked, { shouldValidate: true })} required={isConsentStep} />
          <Label htmlFor={field.key} className="text-sm font-medium text-gray-700">
            {field.label}
          </Label>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      )
    default:
      return null
  }
}
