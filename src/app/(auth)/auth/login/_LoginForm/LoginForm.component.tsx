'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { schema, TSchema } from './LoginForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

import AuthLogo from '@/components/centum-logos/authLogo.component'
import BackToHome from '@/components/backToHome/BackToHome.component'
import { setUser } from '@/utils'
import { paths } from '@/navigate/paths'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLoginMutation } from '@/redux/services/auth.api'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [login, { isLoading, error }] = useLoginMutation()

  const onSubmit = async (data: TSchema) => {
    try {
      const response = await login(data).unwrap()
      if (response) {
        setUser({ access_token: response.access_token })
        if (response.role === 'customer') {
          router.push(paths.customerDashboard())
        }
        if (response.role === 'admin') {
          router.push(paths.adminDashboard())
        }
      }
    } catch (error: any) {
      console.warn('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <div className="flex justify-start">
          <BackToHome />
        </div>

        {/* Logo */}
        <AuthLogo />

        {/* Login Form */}
        <Card className="border-0 shadow-lg">
          <CardContent className="px-6 py-5">
            <h2 className="text-xl font-semibold text-center ">Sign In</h2>
            <p className="text-gray-600 text-center mb-3">Centum Health account</p>

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
                          <Input placeholder="Enter your email" className="pl-10 h-12 border-gray-200 focus:border-primary" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-12 h-12 border-gray-200 focus:border-primary" {...field} />
                          <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <Link href={paths.forgotPassword()} className="text-sm p-0 text-primary">
                    Forgot your password?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Don&apos;t have an account? </span>
                  <Link href={paths.signup()}>
                    <Button variant="link" className="p-0">
                      Create one here
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* <div className="text-center text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
          <strong>Demo:</strong> Use any email and password to sign in
        </div> */}
      </div>
    </div>
  )
}
