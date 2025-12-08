import React from 'react'
import { Button } from '@/components/ui/button'

type HealthProfileAlertProps = {
  title: string
  description: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export default function HealthProfileAlert({ title, description, actionLabel, onAction, icon }: HealthProfileAlertProps) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <div className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-orange-900 text-sm sm:text-base">{title}</h3>
          <div className="text-xs sm:text-sm text-orange-700 mt-1">{description}</div>
          {actionLabel && onAction && (
            <Button className="bg-orange-500 text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium mt-2 sm:mt-3 hover:bg-orange-600 transition-colors w-full sm:w-auto" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
