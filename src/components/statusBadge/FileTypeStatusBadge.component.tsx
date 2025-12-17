import { Badge } from '@/components/ui/badge'
import { FileStatusType } from '@/types/file.type'

type StatusConfig = {
  text: string
  className: string
  dotClassName: string
}

const statusMap: Record<FileStatusType, StatusConfig> = {
  ready: {
    text: 'Ready',
    className: 'bg-green-100 text-green-800 border-green-200',
    dotClassName: 'bg-green-600',
  },
  processing: {
    text: 'Processing',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dotClassName: 'bg-yellow-600',
  },
  pending: {
    text: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dotClassName: 'bg-yellow-600',
  },
  error: {
    text: 'Error',
    className: 'bg-red-100 text-red-800 border-red-200',
    dotClassName: 'bg-red-600',
  },
  failed: {
    text: 'Failed',
    className: 'bg-red-100 text-red-800 border-red-200',
    dotClassName: 'bg-red-600',
  },
  invalid_biomarkers: {
    text: 'Invalid Biomarkers',
    className: 'bg-gray-100 text-gray-600 border-gray-200',
    dotClassName: 'bg-gray-500',
  },
}

const fallbackStatus = {
  text: 'Unknown',
  className: 'bg-gray-100 text-gray-800 border-gray-200',
  dotClassName: 'bg-gray-500',
}

export function FileTypeStatusBadge({ status }: { status?: FileStatusType }) {
  const { text, className, dotClassName } = statusMap[status as FileStatusType] ?? fallbackStatus
  return (
    <Badge className={`px-3 py-1 rounded-2xl flex items-center gap-2 ${className}`}>
      <span className={`h-2 w-2 rounded-full ${dotClassName}`} aria-hidden />
      <span>{text}</span>
    </Badge>
  )
}
