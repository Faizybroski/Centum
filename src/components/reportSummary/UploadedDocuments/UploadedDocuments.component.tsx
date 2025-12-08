'use client'

import React from 'react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'
import { HealthReportDetail } from '@/dto'

function UploadedDocuments({ documents }: { documents: HealthReportDetail['uploaded_documents'] }) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4 text-blue-600" />
          Uploaded Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {documents &&
            documents?.length > 0 &&
            documents?.map((document, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900 truncate" title={document?.file_name}>
                  {document?.file_name}
                </span>
                <Link className="text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto" target="_blank" href={document?.file_path}>
                  View
                </Link>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default UploadedDocuments
