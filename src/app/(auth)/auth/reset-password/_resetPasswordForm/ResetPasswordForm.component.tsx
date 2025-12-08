'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema, TSchema } from './ResetPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock } from 'lucide-react'

import { paths } from '@/navigate/paths'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import AuthLogo from '@/components/centum-logos/authLogo.component'
import { useResetPasswordMutation } from '@/redux/services/auth.api'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import BackToHome from '@/components/backToHome/BackToHome.component'

export default function ResetPasswordForm() {
  const router = useRouter()
  const param = useSearchParams()
  const token = param?.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation()

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: TSchema) => {
    if (!token) {
      toast.error('Token not found')
      return
    }

    try {
      console.log('------------------------>')
      await resetPasswordMutation({ password: data.password, token: token })
      form.reset()
      router.push(paths.login())
    } catch (error: any) {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-start pb-5">
          <BackToHome />
        </div>
        {/* Logo */}
        <AuthLogo />

        {/* Login Form */}
        <Card className="border-0 shadow-lg">
          <CardContent className="px-6 py-5">
            <h2 className="text-xl font-semibold text-center mb-1">Reset Password</h2>
            <p className="text-gray-600 text-center mb-6">Set your new password below</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input nonce="new-password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-12 h-12 border-gray-200 focus:border-primary" {...field} />
                          <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input nonce="new-password" type={showConfirmPassword ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-12 h-12 border-gray-200 focus:border-primary" {...field} />
                          <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-left">
                  <span className="text-gray-600">If you don't want to reset your password, </span>
                  <Link href={paths.login()} className="text-md p-0 text-primary hover:underline">
                    Go Back
                  </Link>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">
                  {form.formState.isSubmitting || isLoading ? 'Loading...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
