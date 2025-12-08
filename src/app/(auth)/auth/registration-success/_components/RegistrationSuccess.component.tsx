'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

import AuthLogo from '@/components/centum-logos/authLogo.component'
import BackToHome from '@/components/backToHome/BackToHome.component'
import { Card, CardContent } from '@/components/ui/card'

export default function RegistrationSuccess() {
  const searchParams = useSearchParams()
  const email = searchParams?.get('email') || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex justify-start">
          <BackToHome />
        </div>

        <div className="flex justify-center">
          <AuthLogo />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to <span className="text-primary">CENTUM</span>!
          </h1>

          <p className="text-gray-600 text-lg max-w-lg mx-auto">Thank you for joining our health community. We're excited to help you on your wellness journey.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary/90" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-900">Verify Your Email Address</h2>

                  <p className="text-gray-600">
                    We've sent a verification link to your email address <span className="text-primary/90">{email}</span>. Please check your inbox and click the link to activate your account.
                  </p>
                </div>

                {/* <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p className="text-center">Once verified, you'll be able to:</p>
                    <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Upload your health reports for analysis</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Access AI-powered health insights</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Track your health progress over time</span>
                      </li>
                    </ul>
                  </div>
                </div> */}

                <div className="pt-4 space-y-3">
                  <div className="text-sm text-gray-500 text-center space-2">
                    <p>Didn't receive the email? Please check your spam folder.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
