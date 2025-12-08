import React from 'react'
import { paths } from '@/navigate/paths'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackToHome() {
  return (
    <Link href={paths.home()} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
      <ArrowLeft className="h-4 w-4" />
      Back to Home
    </Link>
  )
}
