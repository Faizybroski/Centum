'use client'

import React from 'react'
import Link from 'next/link'
import { z } from 'zod'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import AuthLogo from '@/components/centum-logos/authLogo.component'
import BackToHome from '@/components/backToHome/BackToHome.component'
import { paths } from '@/navigate/paths'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useForgotPasswordMutation } from '@/redux/services/auth.api'
import { schema, TSchema } from '../_forgotPasswordForm/ForgotPasswordForm.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordForm() {
  const [forgotPasswordMutation] = useForgotPasswordMutation()
  const router = useRouter()
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: TSchema) => {
    try {
      const { email } = data
      await forgotPasswordMutation({ email })
      form.reset()
      router.push(paths.login())
    } catch (error) {
      console.error('Error resetting password:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-start pb-7">
          <BackToHome />
        </div>
        {/* Logo */}
        <AuthLogo />

        {/* Forgot Password Form */}
        <Card className="border-0 shadow-lg">
          <CardContent className="px-6 py-5">
            <h2 className="text-xl font-semibold text-center mb-1">Forgot Password</h2>
            <p className="text-gray-600 text-center mb-4">Enter your email to reset your password</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input type="email" placeholder="Enter your email" className="pl-10 h-12 border-gray-200 focus:border-primary" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Remember your password? </span>
                  <Link href={paths.login()}>
                    <Button variant="link" className="p-0">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
