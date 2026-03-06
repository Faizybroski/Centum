'use client'

import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, X } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useJoinWaitlistMutation } from '@/redux/services/contact-us.api'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const waitlistSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),

  health_goal: z.enum(['athletic', 'chronic', 'proactive', 'weight', 'sleep', 'other'], {
    required_error: 'Please select your primary health goal',
  }),

  features: z
    .array(z.enum(['biomarkers', 'wearables', 'ai_recommendations', 'secure_storage', 'education', 'progress_tracking', 'addon_tests']))
    .min(1, { message: 'Select at least one feature' })
    .max(3, { message: 'You can select up to 3 features only' }),

  pricing_expectation: z.enum(['40_60', '60_80', '80_100', '100_plus', 'not_sure'], {
    required_error: 'Please select a pricing expectation',
  }),

  current_tracking: z.enum(['manual', 'wearable', 'apps', 'doctor_only', 'none'], {
    required_error: 'Please select how you track your health',
  }),

  biggest_challenge: z.string().min(10, { message: 'Please describe your challenge in at least 10 characters' }),

  interview_interest: z.boolean(),
})

type Feature = 'biomarkers' | 'wearables' | 'ai_recommendations' | 'secure_storage' | 'education' | 'progress_tracking' | 'addon_tests'

const FEATURE_OPTIONS = [
  ['biomarkers', 'Personalized biomarker insights'],
  ['wearables', 'Wearable integrations'],
  ['ai_recommendations', 'AI recommendations'],
  ['secure_storage', 'Secure data sharing'],
  ['education', 'Educational content'],
  ['progress_tracking', 'Progress tracking'],
  ['addon_tests', 'Add-on tests'],
] as const

type WaitlistFormData = z.infer<typeof waitlistSchema>

interface WaitlistDialogProps {
  planName: string
  buttonText?: string
  buttonClassName?: string
  subscriptionType?: string
}

import { sendEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function WaitlistDialog({ planName, buttonText = 'Join Our Waitlist', buttonClassName, subscriptionType }: WaitlistDialogProps) {
  const [successData, setSuccessData] = useState<{
    message: string
    count: number
  } | null>(null)
  const [open, setOpen] = useState(false)
  const [joinWaitlist, { isLoading }] = useJoinWaitlistMutation()

  // const form = useForm<WaitlistFormData>({
  //   resolver: zodResolver(waitlistSchema),
  //   defaultValues: {
  //     email: '',
  //   },
  // })
  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    // mode: 'onChange',
    defaultValues: {
      email: '',
      health_goal: undefined,
      features: [],
      pricing_expectation: undefined,
      current_tracking: undefined,
      biggest_challenge: '',
      interview_interest: false,
    },
  })

  // const onSubmit = async (data: WaitlistFormData) => {
  const onSubmit = async (values: any) => {
    try {
      // await joinWaitlist({ email: data.email, subscription_type: subscriptionType || '' })

      // await joinWaitlist({
      //   ...values,
      //   subscription_type: subscriptionType,
      // }).unwrap()

      const res = await joinWaitlist({
        ...values,
        subscription_type: subscriptionType,
      }).unwrap()

      sendEvent(ANALYTICS_EVENTS.WAITLIST_FORM_COMPLETE, { plan: planName, subscription_type: subscriptionType })
      // toast.success('You’re on the waitlist 🎉')
      form.reset()
      setOpen(false)
      setSuccessData(res)
    } catch (error: any) {
      console.error('Error joining waitlist:', error)

      // Handle specific case where email is already in waitlist
      if (error?.data?.message?.includes('already added to waitlist')) {
        toast.success('You are already on the waitlist!')
        form.reset()
        setOpen(false)
      } else {
        toast.error(error?.data?.message || 'Something went wrong. Please try again.')
      }
    }
  }

  // if (open) {
  //   return (
  //     <Dialog open={!!successData} onOpenChange={() => setSuccessData(null)}>
  //       <DialogContent className="sm:max-w-md text-center space-y-6">
  //         {/* Success Icon */}
  //         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
  //           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white text-xl">✓</div>
  //         </div>

  //         {/* Heading */}
  //         <h2 className="text-2xl font-semibold">You're on the waitlist! 🎉</h2>

  //         {/* Message */}
  //         <p className="text-gray-600">
  //           Thanks for joining the <span className='text-primary'>{subscriptionType}</span> waitlist.
  //           <br />
  //           You are <span className="font-semibold text-primary">#{successData?.count}</span> in line.
  //         </p>

  //         <p className="text-gray-500 text-sm">You'll be among the first to know when we make our exciting public launch!</p>

  //         {/* CTA */}
  //         <Button className="w-full mt-4" onClick={() => setSuccessData(null)}>
  //           Got it
  //         </Button>
  //       </DialogContent>
  //     </Dialog>
  //   )
  // }

  return (
    <>
  {/* SUCCESS DIALOG */}
  <Dialog open={!!successData} onOpenChange={() => setSuccessData(null)}>
    <DialogContent className="sm:max-w-md text-center space-y-6">
      {successData && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-xl">
          ✓
        </div>
      </div>

      <h2 className="text-2xl font-semibold">
        You're on the waitlist! 🎉
      </h2>

      <p className="text-gray-600">
        Thanks for joining the <span className="text-primary font-semibold">{subscriptionType}</span> waitlist.
        <br />
        You are <span className="font-semibold text-primary">#{successData?.count}</span> in line.
      </p>

      <p className="text-gray-500 text-sm">
        You'll be among the first to know when we make our exciting public launch!
      </p>

      <Button className="w-full mt-4" onClick={() => setSuccessData(null)}>
        Got it
      </Button>

    </DialogContent>
  </Dialog>


    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonText}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="space-y-4">
          {/* <div className="text-center">
            <h5 className="text-lg font-semibold mb-2">Join {planName} Waitlist</h5>
            <p className="text-sm text-gray-600"></p>
          </div> */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-2">Join {planName} Waitlist</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">Be the first to know when this plan becomes available</DialogDescription>
          </DialogHeader>

          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-3" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Form> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="you@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Health Goal */}
              <FormField
                control={form.control}
                name="health_goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary health goal</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your health goal" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent position="popper">
                        <SelectItem value="athletic">Optimize athletic performance</SelectItem>
                        <SelectItem value="chronic">Manage chronic condition</SelectItem>
                        <SelectItem value="proactive">Proactive monitoring</SelectItem>
                        <SelectItem value="weight">Weight management</SelectItem>
                        <SelectItem value="sleep">Improve energy / sleep</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormControl>
                      <select {...field} className="w-full rounded-md border border-gray-300 
px-3 py-2 text-sm md:text-base">
                        <option value="athletic">Optimize athletic performance</option>
                        <option value="chronic">Manage chronic condition</option>
                        <option value="proactive">Proactive monitoring</option>
                        <option value="weight">Weight management</option>
                        <option value="sleep">Improve energy/sleep</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Features (multi-select) */}
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features you’re excited about (max 3)</FormLabel>
                    {FEATURE_OPTIONS.map(([value, label]) => {
                      const id = `feature-${value}`

                      return (
                        <div key={value} className="flex items-center gap-2 py-1">
                          <Checkbox
                            id={id}
                            checked={field.value?.includes(value)}
                            onCheckedChange={(checked) => {
                              const updated = checked ? [...field.value, value] : field.value.filter((v: string) => v !== value)

                              if (updated.length <= 3) field.onChange(updated)
                            }}
                          />

                          <FormLabel htmlFor={id} className="cursor-pointer font-normal">
                            {label}
                          </FormLabel>
                        </div>
                      )
                    })}
                    {/* {FEATURE_OPTIONS.map(([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value?.includes(value)}
                          onCheckedChange={(checked) => {
                            const updated = checked ? [...field.value, value] : field.value.filter((v: string) => v !== value)
                            // field.onChange(updated)
                            if (updated.length <= 3) field.onChange(updated)
                          }}
                        />
                        <FormLabel>{label}</FormLabel>
                      </div>
                    ))} */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricing_expectation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much would you be willing to pay per month for a Centum Health membership?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select pricing range" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent position="popper">
                        <SelectItem value="40_60">$40 – $60</SelectItem>
                        <SelectItem value="60_80">$60 – $80</SelectItem>
                        <SelectItem value="80_100">$80 – $100</SelectItem>
                        <SelectItem value="100_plus">More than $100</SelectItem>
                        <SelectItem value="not_sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormControl>
                      <select
                        {...field}
                        className="w-full rounded-md border border-gray-300 
px-3 py-2 text-sm md:text-base"
                      >
                        <option value="40_60">$40 - $60</option>
                        <option value="60_80">$60 - $80</option>
                        <option value="80_100">$80 - $100</option>
                        <option value="100_plus">More than $100</option>
                        <option value="not_sure">Not sure yet</option>
                      </select>
                    </FormControl> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_tracking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How do you currently track your health data (if at all)?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tracking method" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent position="popper">
                        <SelectItem value="manual">Manual tracking</SelectItem>
                        <SelectItem value="wearable">Wearable device</SelectItem>
                        <SelectItem value="apps">Health apps</SelectItem>
                        <SelectItem value="doctor_only">Doctor visits / labs</SelectItem>
                        <SelectItem value="none">Not tracking</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormControl>
                      <select
                        {...field}
                        className="w-full rounded-md border border-gray-300 
px-3 py-2 text-sm md:text-base"
                      >
                        <option value="manual">Manually (journal/spreadsheet)</option>
                        <option value="wearable">Wearable device (e.g., Oura, Apple Watch, Fitbit)</option>
                        <option value="apps">Other health apps (e.g., MyFitnessPal)</option>
                        <option value="doctor_only">Doctor's visits/lab tests only</option>
                        <option value="none">Not currently tracking</option>
                      </select>
                    </FormControl> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Biggest challenge */}
              <FormField
                control={form.control}
                name="biggest_challenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biggest health challenge</FormLabel>
                    <FormControl>
                      <Textarea rows={3} className="resize-none" {...field} placeholder="Describe the biggest challenge you face with managing your health..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Interview */}
              <FormField
                control={form.control}
                name="interview_interest"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox id={'1'} checked={field.value} onCheckedChange={field.onChange} />
                    <FormLabel htmlFor={'1'} className="cursor-pointer">
                      Open to a 15–20 min interview
                    </FormLabel>
                  </div>
                )}
              />

              <Button
                type="submit"
                disabled={
                  isLoading
                  // || !form.formState.isValid
                }
                className="w-full"
              >
                {isLoading ? 'Submitting…' : 'Submit'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
