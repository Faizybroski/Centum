'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Heart, Lock, Mail, Phone, User } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import AuthLogo from '@/components/centum-logos/authLogo.component'
import BackToHome from '@/components/backToHome/BackToHome.component'
import DatePickerInput from '@/components/dateInputPicker/DateInputPicker.component'
import BenefitsCard from '@/components/benefitsCard/BenefitsCard.component'
import { useSignupMutation } from '@/redux/services/auth.api'
import { paths } from '@/navigate/paths'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { schema, TSchema } from './SignupForm.schema'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [signup, { isLoading }] = useSignupMutation()
  const router = useRouter()

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      password: '',
      beta_code: '',
    },
  })

  const onSubmit = async (data: TSchema) => {
    try {
      const response = await signup(data).unwrap()
      if (response) {
        router.push(paths.registrationSuccess(data.email))
      }
    } catch (error: any) {
      console.warn('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-start">
          <BackToHome />
        </div>

        <div className="flex justify-center">
          <AuthLogo />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Join <span className="text-primary">CENTUM</span> Today
          </h1>
          <p className="text-gray-600 text-lg">Start your personalized health journey with comprehensive biomarker analysis and AI-powered insights.</p>
          <div className="border-primary border-4 max-w-xl mx-auto p-3">
            <h1 className="text-xl md:text-2xl font-bold">Centum Membership coming soon in 2026!</h1>
            <h1 className="text-xl md:text-2xl font-bold">
              Click{' '}
              <Link href={paths.pricing()} className="text-primary underline">
                here
              </Link>{' '}
              to join our VIP wait list
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-center mb-2">Sign Up</h2>
              <p className="text-gray-600 text-center mb-6">Join Centum Health and start your wellness journey</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input placeholder="Enter your full name" className="pl-10 h-12" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input placeholder="Enter your email" className="pl-10 h-12" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input placeholder="Enter your phone number" className="pl-10 h-12" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="pl-10 pr-12 h-12" {...field} />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="border-gray-200 w-full h-20 py-6 pl-10">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date of Birth */}
                  <DatePickerInput form={form} />
                  <FormField
                    control={form.control}
                    name="beta_code"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <div className="flex items-center gap-2">
                          <FormLabel className="whitespace-nowrap">BETA CODE</FormLabel>
                          <FormControl>
                            <Input className="h-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage className="ml-21" />
                      </FormItem>
                    )}
                  />
                  {/* Submit button */}
                  <div className="col-span-1 sm:col-span-2">
                    <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90" disabled={isLoading || form.formState.isSubmitting}>
                      {isLoading || form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>

                  {/* Sign-in link */}
                  <div className="col-span-1 sm:col-span-2 text-center text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href={paths.login()}>
                      <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                        Sign in here
                      </Button>
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div>
            <BenefitsCard />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          By creating an account, you agree to our{' '}
          <Link href={paths.privacy()} className="text-primary hover:text-primary/80">
            Terms of Services & Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
