'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, X } from 'lucide-react'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useJoinWaitlistMutation } from '@/redux/services/contact-us.api'
import { toast } from 'sonner'

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

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

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      await joinWaitlist({ email: data.email, subscription_type: subscriptionType || '' })

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className={buttonClassName}>{buttonText}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 bg-white rounded-md shadow-md text-gray-900">
        <div className="space-y-4">
          <div className="text-center">
            <h5 className="text-lg font-semibold mb-2">Join {planName} Waitlist</h5>
            <p className="text-sm text-gray-600">Be the first to know when this plan becomes available</p>
          </div>

          <Form {...form}>
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
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
