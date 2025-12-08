// components/StatusBadge.tsx
import React from 'react'
import clsx from 'clsx'

type StatusType = 'ready' | 'failed' | 'active' | 'pending' | 'inactive' | string

interface StatusBadgeProps {
  value: StatusType
}

const statusStyles: Record<string, string> = {
  ready: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-700',
  inactive: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-blue-100 text-blue-800',
  default: 'bg-slate-100 text-slate-800',
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value }) => {
  const style = statusStyles[value.toLowerCase()] || statusStyles.default

  return <span className={clsx('px-2 py-1 rounded-xl font-medium text-sm capitalize', style)}>{value}</span>
}
