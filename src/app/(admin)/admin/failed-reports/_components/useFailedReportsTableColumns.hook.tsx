import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { FailedReportDTO } from '@/dto'
import { useRetryReportGenerationMutation } from '@/redux/services/admin/reports.api'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'
import { RotateCw } from 'lucide-react'

export default function useReportsColumns() {
  const [retryReportGenerationMutation, { isLoading }] = useRetryReportGenerationMutation()

  const [columns, _] = React.useState<ColumnDef<FailedReportDTO>[]>([
    {
      accessorKey: 'report_title',
      header: 'Report Title',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        return <StatusBadge value={getValue() as any} />
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated At',
    },
    {
      accessorKey: 'user_name',
      header: 'User Name',
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          size="sm"
          disabled={isLoading}
          variant="ghost"
          className="hover:bg-gray-200 hover:text-gray-800"
          onClick={async () => {
            await retryReportGenerationMutation({ report_id: row.original?.id })
          }}
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      ),
    },
  ])

  return { columns }
}
