'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button' // optional if you're using shadcn/ui

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Oops! The page you are looking for doesn’t exist.</p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
        <Button onClick={() => router.push('/')} variant="default">
          Go to Home
        </Button>
      </div>
    </div>
  )
}
