import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

type UploadedDocument = {
  file_name: string
  file_path: string
}

type Report = {
  report_title: string
  status: string
  health_score?: number
  updated_at: string
  uploaded_documents?: UploadedDocument[]
}

export function useReportsColumns() {
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null)

  const handleToggle = (title: string) => {
    setExpandedRow((prev) => (prev === title ? null : title))
  }

  const columns: ColumnDef<Report>[] = [
    { accessorKey: 'report_title', header: 'Report Title', minSize: 200, size: 32 },
    { accessorKey: 'status', header: 'Status', minSize: 100, size: 16 },
    { accessorKey: 'health_score', header: 'Health Score', minSize: 100, size: 16 },
    { accessorKey: 'updated_at', header: 'Created Date', minSize: 100, size: 16 },
    {
      accessorKey: 'action',
      header: 'Uploaded Documents',
      minSize: 150,
      size: 20,
      cell: ({ row }) => {
        const docs = row.original.uploaded_documents || []
        const isOpen = expandedRow === row.original.report_title
        const shouldCollapse = docs.length > 1
        const visibleDocs = shouldCollapse && !isOpen ? docs.slice(0, 1) : docs

        return (
          <div className="flex flex-col gap-2 w-full text-sm">
            {visibleDocs.map((doc, idx) => (
              <Link key={idx} href={doc.file_path} target="_blank" className="flex items-center gap-2 text-blue-600 hover:underline">
                <span className="truncate max-w-[300px]" title={doc.file_name}>
                  {doc.file_name}
                </span>
              </Link>
            ))}

            {shouldCollapse && (
              <Button variant="ghost" size="sm" className="hover:underline text-primary px-2 py-1 rounded-md flex items-center gap-1 self-start text-sm" onClick={() => handleToggle(row.original.report_title)}>
                {isOpen ? (
                  <>
                    Show less <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown size={16} />
                  </>
                )}
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  return { columns }
}
