'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, X } from 'lucide-react'

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
  email: z.string().email(),

  health_goal: z.enum(['athletic', 'chronic', 'proactive', 'weight', 'sleep', 'other']),

  features: z
    .array(z.enum(['biomarkers', 'wearables', 'ai_recommendations', 'secure_storage', 'education', 'progress_tracking', 'addon_tests']))
    .min(1)
    .max(3),

  pricing_expectation: z.enum(['40_60', '60_80', '80_100', '100_plus', 'not_sure']),

  current_tracking: z.enum(['manual', 'wearable', 'apps', 'doctor_only', 'none']),

  biggest_challenge: z.string().min(10),

  interview_interest: z.boolean(),
})

type Feature =
  | 'biomarkers'
  | 'wearables'
  | 'ai_recommendations'
  | 'secure_storage'
  | 'education'
  | 'progress_tracking'
  | 'addon_tests'


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

export default function WaitlistDialog({ planName, buttonText = 'Join Our Waitlist', buttonClassName, subscriptionType }: WaitlistDialogProps) {
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
    defaultValues: {
      email: '',
      health_goal: 'proactive',
      features: [],
      pricing_expectation: 'not_sure',
      current_tracking: 'none',
      biggest_challenge: '',
      interview_interest: false,
    },
  })

  // const onSubmit = async (data: WaitlistFormData) => {
  const onSubmit = async (values: any) => {
    try {
      // await joinWaitlist({ email: data.email, subscription_type: subscriptionType || '' })

      await joinWaitlist({
        ...values,
        subscription_type: subscriptionType,
      }).unwrap()

      toast.success('You’re on the waitlist 🎉')
      form.reset()
      setOpen(false)
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

  return (
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
                      <Input {...field} />
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
                    <select {...field} className="w-full border rounded p-2">
                      <option value="athletic">Optimize athletic performance</option>
                      <option value="chronic">Manage chronic condition</option>
                      <option value="proactive">Proactive monitoring</option>
                      <option value="weight">Weight management</option>
                      <option value="sleep">Improve energy/sleep</option>
                      <option value="other">Other</option>
                    </select>
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
                    {FEATURE_OPTIONS.map(([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value?.includes(value)}
                          onCheckedChange={(checked) => {
                            const updated = checked ? [...field.value, value] : field.value.filter((v: string) => v !== value)
                            field.onChange(updated)
                          }}
                        />
                        <span>{label}</span>
                      </div>
                    ))}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricing_expectation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much would you be willing to pay per month for a Centum Health membership?</FormLabel>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="40_60">$40 - $60</option>
                      <option value="60_80">$60 - $80</option>
                      <option value="80_100">$80 - $100</option>
                      <option value="100_plus">More than $100</option>
                      <option value="not_sure">Not sure yet</option>
                    </select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_tracking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How do you currently track your health data (if at all)?</FormLabel>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="manually">Manually (journal/spreadsheet)</option>
                      <option value="wearable">Wearable device (e.g., Oura, Apple Watch, Fitbit)</option>
                      <option value="apps">Other health apps (e.g., MyFitnessPal)</option>
                      <option value="doctor_only">Doctor's visits/lab tests only</option>
                      <option value="none">Not currently tracking</option>
                    </select>
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
                      <Textarea rows={3} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Interview */}
              <FormField
                control={form.control}
                name="interview_interest"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <span>Open to a 15–20 min interview</span>
                  </div>
                )}
              />

              <Button type='submit' disabled={isLoading} className="w-full">
                {isLoading ? 'Submitting…' : 'Submit'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
