import React from 'react'
import { FileText, X } from 'lucide-react'
import { FileTypeStatusBadge } from '@/components/statusBadge/FileTypeStatusBadge.component'

interface UploadFileCardProps {
  file_name: string
  size: string
  status: 'ready' | 'failed'
  onRemove?: () => void // optional prop to handle remove
}

export default function UploadFileCard({ file_name, size, status, onRemove }: UploadFileCardProps) {
  const isFailed = status === 'failed'
  const isReady = status === 'ready'

  return (
    <div className={`relative flex items-center justify-between p-4 rounded-lg border ${isFailed ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
      {/* Remove icon for Failed status */}
      {isFailed && (
        <div onClick={onRemove} className="p-1 border border-red-200 absolute top-[-12px] right-[-12px] bg-red-100 hover:bg-red-200 rounded-full text-red-500 hover:text-red-600 cursor-pointer">
          <X className="w-5 h-5" />
        </div>
      )}

      {isReady && (
        <div onClick={onRemove} className="p-1 border border-green-200 absolute top-[-12px] right-[-12px] bg-green-100 hover:bg-green-200 rounded-full text-green-500 hover:text-green-600 cursor-pointer">
          <X className="w-5 h-5" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isFailed ? 'bg-red-100' : 'bg-green-100'}`}>
          <FileText className={`h-5 w-5 ${isFailed ? 'text-red-600' : 'text-green-600'}`} />
        </div>
        <div>
          <p className="font-medium text-gray-900  truncate max-w-[120px] md:max-w-[350px] lg:max-w-[500px]">{file_name}</p>
          <p className="text-sm text-gray-500">{size}</p>
        </div>
      </div>

      <div className="mb-3">
        <FileTypeStatusBadge status={status} />
      </div>
    </div>
  )
}
