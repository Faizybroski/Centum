'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { paths } from '@/navigate/paths'
import { Button } from '@/components/ui/button'
import { steps } from './form/AssessmentForm.config'
import { GenerateIcon } from '@/components/GenerateIcon/GenerateIcon.component'
import { useLazyGetFormDefinationsQuery, useSaveFormStepMutation } from '@/redux/services/assessment.api'
import SectionLoading from '@/components/ui/section-loading'
import FormStepProgress from './formStepProgress/FormStepProgress.component'
import HeaderLogoBlack from '@/components/centum-logos/HeaderLogoBlack.component'

import { useRef } from 'react'
import AssessmentForm from './form/AssessmentForm.component'
import { toast } from 'sonner'

export default function HealthAssessmentForm({ forProfile = false }: { forProfile?: boolean }) {
  const [step, setStep] = useState(0)
  const [formStates, setFormStates] = useState<Record<number, any>>({})
  const [saveFormStep] = useSaveFormStepMutation()
  const [isSaving, setIsSaving] = useState(false)
  const [consentError, setConsentError] = useState('')
  const formMethodsRef = useRef<any>(null)
  const router = useRouter()

  const [getFormDefinations, { data, isLoading, isFetching, isSuccess }] = useLazyGetFormDefinationsQuery()

  useEffect(() => {
    getFormDefinations(steps[step].id)
  }, [step])

  const handleFormChange = useCallback(
    (formData: any) => {
      setFormStates((prev) => ({ ...prev, [step]: formData }))
    },
    [step],
  )

  useEffect(() => {
    if (step !== steps.length - 1) return

    const formData = formStates[step] || {}
    const requiredConsentKeys = ['privacy_policy_consent', 'informational_insights_agreement', 'terms_of_service_agreement', 'followup_contact_consent']

    const isAllChecked = requiredConsentKeys.every((key) => !!formData[key])

    if (isAllChecked) {
      setConsentError('')
    }
  }, [formStates, step])

  // Note : for scroll on top in each step
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)

    return () => clearTimeout(timeout)
  }, [step])

  const next = async () => {
    if (formMethodsRef.current && formMethodsRef.current.trigger) {
      const valid = await formMethodsRef.current.trigger()
      if (!valid) {
        toast.error('Please fill all the required fields before proceeding', { duration: 5000, position: 'top-right' })
        setIsSaving(false)
        return
      }
    }
    if (isSaving) return
    setIsSaving(true)

    const formData = formMethodsRef.current?.getValues() || {}
    console.log('Submitting formData for step', step, formData)

    // checkingh based on profile
    const lastStepIndex = forProfile ? 2 : steps.length - 1
    if (step === lastStepIndex) {
      if (!forProfile) {
        const requiredConsentKeys = ['privacy_policy_consent', 'informational_insights_agreement', 'terms_of_service_agreement', 'followup_contact_consent']
        const isAllChecked = requiredConsentKeys.every((key) => !!formData[key])
        if (!isAllChecked) {
          setConsentError('Please agree to all the consent statements to proceed.')
          setIsSaving(false)
          return
        }
      }
      setConsentError('')
      try {
        await saveFormStep({
          step_number: step + 1,
          form_data: formData,
        })

        console.log('Form submitted successfully')
        router.push(paths.customerUpload())
      } catch (err) {
        setConsentError('Failed to submit assessment. Please try again.')
      }
      setIsSaving(false)
      return
    }

    try {
      const response = await saveFormStep({
        step_number: step + 1,
        form_data: formData,
      })

      setConsentError('')
      if (response.data) {
        setStep((s) => Math.min(s + 1, steps.length - 1))
      }
    } catch (err) {
      setConsentError('Something went wrong while saving the step. Please try again.')
    }

    setIsSaving(false)
  }

  // previous Step
  const prev = () => {
    if (isSaving) return
    setStep((s) => Math.max(s - 1, 0))
  }

  return (
    <div className="space-y-8 mb-6">
      {/* Header */}
      {!forProfile && (
        <div className="bg-white border-b py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4 h-16">
              <HeaderLogoBlack />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Health Assessment</h1>
              <p className="text-gray-600 text-sm">Help us understand your health better</p>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Progress */}
      <div className="max-w-2xl mx-auto border-0">
        <FormStepProgress steps={steps} currentStep={step} forProfile={forProfile} />
      </div>

      {/* Assessment Form */}
      <div>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-112px)] w-full">
          <div className="w-full max-w-2xl">
            <div className={!forProfile ? 'bg-white shadow-lg rounded-lg px-6 py-4' : ''}>
              {(isLoading || isFetching) && (
                <div className="flex items-center justify-center w-full">
                  <SectionLoading />
                </div>
              )}

              {isSuccess && data && <AssessmentForm formDef={data} onFormChange={handleFormChange} step={step} formMethodsRef={formMethodsRef} />}

              {step === steps.length - 1 && consentError && <p className="text-red-600 text-sm mt-2 mx-6">{consentError}</p>}

              <div className="flex justify-between mt-6">
                {/* {step > 0 ? (
                  <Button variant="outline" onClick={prev} disabled={isSaving}>
                    Previous
                  </Button>
                ) : null} */}
                <div className="flex gap-2 items-center justify-end w-full">
                  <Button onClick={next} disabled={isSaving}>
                    {step === steps.length - 1 ? (
                      <>
                        Complete Assessment
                        <GenerateIcon name="check" size={24} />
                      </>
                    ) : forProfile && step === steps.length - 2 ? (
                      'Finish'
                    ) : (
                      'Next'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
