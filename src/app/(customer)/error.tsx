'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/cn/utils'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error captured by boundary:', error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-muted px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h2>
        <p className="text-sm text-muted-foreground mb-6">{error?.message || 'We are working on it.'}</p>
        <Button onClick={() => reset()} className={cn('w-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-2 rounded-lg transition-colors')}>
          Try again
        </Button>
      </div>
    </div>
  )
}
