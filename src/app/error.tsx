'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error?.message || 'Unexpected error occurred.'}</p>
          <Button onClick={() => reset()} variant="destructive">
            Reload Page
          </Button>
        </div>
      </body>
    </html>
  )
}
