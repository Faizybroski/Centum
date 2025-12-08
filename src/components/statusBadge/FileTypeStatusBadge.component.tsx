import { Badge } from '@/components/ui/badge'
import { FileStatusType } from '@/types/file.type'

const statusMap: Record<FileStatusType, { text: string; className: string }> = {
  ready: {
    text: 'Ready',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  processing: {
    text: 'Processing',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  pending: {
    text: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  error: {
    text: 'Error',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  failed: {
    text: 'Failed',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  invalid_biomarkers: {
    text: 'Invalid Biomarkers',
    className: 'bg-gray-100 text-gray-600 border-gray-200',
  },
}

const fallbackStatus = {
  text: 'Unknown',
  className: 'bg-gray-100 text-gray-800 border-gray-200',
}

export function FileTypeStatusBadge({ status }: { status?: FileStatusType }) {
  const { text, className } = statusMap[status as FileStatusType] ?? fallbackStatus
  return <Badge className={className}>{text}</Badge>
}
